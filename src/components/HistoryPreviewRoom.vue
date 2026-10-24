<template>
  <div class="history-room">
    <header class="history-header">
      <button class="back-button" type="button" @click="$emit('close')">← 返回春秋 GIS</button>
      <div>
        <span class="history-kicker">HISTORY &amp; GEOGRAPHY</span>
        <h1>史地预览室</h1>
        <p>公开阅读整理稿与检索古籍原文，不要求登录。</p>
      </div>
      <button v-if="canEdit" class="manage-button" type="button" @click="manageOpen = !manageOpen">
        {{ manageOpen ? '关闭维护' : '内容维护' }}
      </button>
    </header>

    <nav class="history-tabs" aria-label="史地预览室功能">
      <button :class="{ active: tab === 'articles' }" type="button" @click="tab = 'articles'">整理稿阅读</button>
      <button :class="{ active: tab === 'search' }" type="button" @click="tab = 'search'">古籍原文检索</button>
    </nav>

    <section v-if="manageOpen && canEdit" class="manage-panel">
      <div>
        <h2>上传 Markdown</h2>
        <label>服务端路径 <input v-model="uploadPath" placeholder="docs/cases/专题/文章.md" /></label>
        <label>标题 <input v-model="uploadTitle" placeholder="文章标题" /></label>
        <label>专题 ID <input v-model="uploadCaseId" placeholder="可留空" /></label>
        <label>选择文件 <input type="file" accept=".md,text/markdown,text/plain" @change="onMarkdownFile" /></label>
        <button type="button" :disabled="manageBusy || !uploadContent" @click="submitArticle">上传并发布</button>
      </div>
      <div>
        <h2>更新目录</h2>
        <p>上传与原工程一致的 <code>cases.json</code>。服务器会校验其包含 cases 数组。</p>
        <label>选择目录 <input type="file" accept=".json,application/json" @change="onCatalogFile" /></label>
        <button type="button" :disabled="manageBusy || !catalogUpload" @click="submitCatalog">更新目录</button>
      </div>
      <p v-if="manageMessage" class="manage-message">{{ manageMessage }}</p>
    </section>

    <p v-if="error" class="history-error">{{ error }}</p>

    <div v-if="tab === 'articles'" class="history-layout">
      <aside class="history-sidebar">
        <label class="filter-box">
          <span>筛选整理稿</span>
          <input v-model="filter" placeholder="输入标题或目录" />
        </label>
        <section v-for="group in groupedArticles" :key="group.id" class="article-group">
          <h2>{{ group.title }}</h2>
          <button
            v-for="article in group.articles"
            :key="article.article_id"
            :class="{ selected: article.article_id === activeArticle?.article_id }"
            type="button"
            @click="openArticle(article)"
          >
            <span>{{ article.title }}</span>
            <small>{{ article.category_path.join(' / ') }}</small>
          </button>
        </section>
        <p v-if="!loading && !filteredArticles.length" class="empty-state">暂无已发布整理稿。</p>
      </aside>

      <main class="article-reader">
        <div v-if="loading" class="empty-state">正在加载史地资料…</div>
        <div v-else-if="!activeArticle" class="empty-state">从左侧选择一篇整理稿开始阅读。</div>
        <template v-else>
          <div class="article-meta">
            <span>{{ activeArticle.category_path.join(' / ') || '史地整理' }}</span>
            <span>{{ Math.ceil(activeArticle.byte_size / 1024) }} KiB</span>
          </div>
          <article ref="articleBody" class="markdown-body" v-html="renderedMarkdown" @click="onArticleClick"></article>
        </template>
      </main>
    </div>

    <main v-else class="text-search">
      <div class="search-intro">
        <span class="history-kicker">ORIGINAL TEXT</span>
        <h2>古籍原文检索</h2>
        <p>检索已迁入服务器的原文段落。查询公开，结果保留来源书名、章节和段序。</p>
      </div>
      <form class="search-form" @submit.prevent="runSearch">
        <input v-model.trim="searchQuery" minlength="2" maxlength="80" placeholder="输入至少两个字，例如：长安" />
        <label><input v-model="normalizedSearch" type="checkbox" /> 兼容异体/全半角归一化文本</label>
        <button type="submit" :disabled="searching || searchQuery.length < 2">{{ searching ? '检索中…' : '检索' }}</button>
      </form>
      <ol v-if="searchResult" class="search-results">
        <li v-for="item in searchResult.items" :key="`${item.chapter_id}-${item.ordinal}`">
          <div><strong>{{ item.book_title }}</strong><span>{{ item.chapter_title }} · 第 {{ item.ordinal + 1 }} 段</span></div>
          <p>{{ item.original_text }}</p>
        </li>
      </ol>
      <p v-if="searchResult && !searchResult.items.length" class="empty-state">没有找到匹配段落。</p>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import markedFootnote from 'marked-footnote';
import type { AuthUser } from '../types/auth';
import {
  getHistoryArticle,
  getHistoryCatalog,
  searchHistoryText,
  updateHistoryCatalog,
  upsertHistoryArticle,
  type HistoryArticle,
  type HistoryArticleSummary,
  type HistorySearchResponse
} from '../services/api';

const props = defineProps<{ user: AuthUser | null }>();
defineEmits<{ close: [] }>();

marked.use(markedFootnote());
let mermaidInitialized = false;

const tab = ref<'articles' | 'search'>('articles');
const articles = ref<HistoryArticleSummary[]>([]);
const cases = ref<Array<Record<string, unknown>>>([]);
const activeArticle = ref<HistoryArticle | null>(null);
const loading = ref(true);
const error = ref('');
const filter = ref('');
const articleBody = ref<HTMLElement | null>(null);
const searchQuery = ref('');
const normalizedSearch = ref(false);
const searching = ref(false);
const searchResult = ref<HistorySearchResponse | null>(null);
const manageOpen = ref(false);
const manageBusy = ref(false);
const manageMessage = ref('');
const uploadPath = ref('');
const uploadTitle = ref('');
const uploadCaseId = ref('');
const uploadContent = ref('');
const catalogUpload = ref<Record<string, unknown> | null>(null);

const canEdit = computed(() => ['springgis', '凡语春秋'].includes(props.user?.username.trim().normalize('NFKC').toLocaleLowerCase() ?? ''));
const filteredArticles = computed(() => {
  const keyword = filter.value.trim().toLocaleLowerCase();
  if (!keyword) return articles.value;
  return articles.value.filter((item) => `${item.title} ${item.path} ${item.category_path.join(' ')}`.toLocaleLowerCase().includes(keyword));
});
const groupedArticles = computed(() => {
  const caseTitles = new Map(cases.value.map((item) => [String(item.id ?? ''), String(item.title ?? '未分类专题')]));
  const groups = new Map<string, HistoryArticleSummary[]>();
  for (const article of filteredArticles.value) {
    const id = article.case_id || 'other';
    groups.set(id, [...(groups.get(id) ?? []), article]);
  }
  return [...groups].map(([id, groupArticles]) => ({ id, title: caseTitles.get(id) ?? '其他整理稿', articles: groupArticles }));
});
const renderedMarkdown = computed(() => {
  if (!activeArticle.value) return '';
  const html = marked.parse(activeArticle.value.content, { async: false }) as string;
  return DOMPurify.sanitize(html, { ADD_ATTR: ['target'] });
});

async function loadCatalog() {
  loading.value = true;
  error.value = '';
  try {
    const response = await getHistoryCatalog();
    articles.value = response.articles;
    cases.value = Array.isArray(response.catalog.cases) ? response.catalog.cases : [];
    if (!activeArticle.value && articles.value[0]) await openArticle(articles.value[0]);
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : '史地资料加载失败';
  } finally {
    loading.value = false;
  }
}

async function openArticle(summary: HistoryArticleSummary) {
  error.value = '';
  try {
    activeArticle.value = await getHistoryArticle(summary.article_id);
    await nextTick();
    const diagrams = articleBody.value?.querySelectorAll<HTMLElement>('pre code.language-mermaid') ?? [];
    diagrams.forEach((node) => {
      const pre = node.parentElement;
      if (!pre) return;
      const wrapper = document.createElement('div');
      wrapper.className = 'mermaid';
      wrapper.textContent = node.textContent;
      pre.replaceWith(wrapper);
    });
    if (diagrams.length) {
      const { default: mermaid } = await import('mermaid');
      if (!mermaidInitialized) {
        mermaid.initialize({ startOnLoad: false, theme: 'neutral', securityLevel: 'strict' });
        mermaidInitialized = true;
      }
      await mermaid.run({ nodes: articleBody.value?.querySelectorAll<HTMLElement>('.mermaid') });
    }
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : '文章加载失败';
  }
}

function onArticleClick(event: MouseEvent) {
  const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a');
  if (!anchor) return;
  const href = anchor.getAttribute('href') ?? '';
  if (href.startsWith('hanji://')) {
    event.preventDefault();
    const query = new URL(href).searchParams.get('q');
    if (query) {
      searchQuery.value = query;
      tab.value = 'search';
      void runSearch();
    }
    return;
  }
  if (/\.md(?:#.*)?$/i.test(href) && activeArticle.value) {
    event.preventDefault();
    const base = activeArticle.value.path.split('/').slice(0, -1);
    const rawParts = decodeURIComponent(href.split('#')[0] ?? '').replace(/\\/g, '/').split('/');
    for (const part of rawParts) {
      if (!part || part === '.') continue;
      if (part === '..') base.pop();
      else base.push(part);
    }
    const targetPath = base.join('/');
    const target = articles.value.find((item) => item.path === targetPath);
    if (target) void openArticle(target);
    else error.value = `目录中找不到链接文章：${targetPath}`;
  }
}

async function runSearch() {
  if (searchQuery.value.length < 2) return;
  searching.value = true;
  error.value = '';
  try {
    searchResult.value = await searchHistoryText(searchQuery.value, normalizedSearch.value);
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : '原文检索失败';
  } finally {
    searching.value = false;
  }
}

async function readFile(event: Event): Promise<File | null> {
  return (event.target as HTMLInputElement).files?.[0] ?? null;
}
async function onMarkdownFile(event: Event) {
  const file = await readFile(event);
  if (!file) return;
  uploadContent.value = await file.text();
  if (!uploadTitle.value) uploadTitle.value = file.name.replace(/\.md$/i, '');
  if (!uploadPath.value) uploadPath.value = `docs/uploads/${file.name}`;
}
async function onCatalogFile(event: Event) {
  const file = await readFile(event);
  if (!file) return;
  try {
    catalogUpload.value = JSON.parse(await file.text()) as Record<string, unknown>;
    manageMessage.value = '目录文件读取成功，尚未提交。';
  } catch {
    catalogUpload.value = null;
    manageMessage.value = '目录文件不是有效 JSON。';
  }
}
async function submitArticle() {
  manageBusy.value = true;
  try {
    await upsertHistoryArticle({
      path: uploadPath.value,
      title: uploadTitle.value,
      content: uploadContent.value,
      case_id: uploadCaseId.value || null,
      category_path: uploadPath.value.split('/').slice(1, -1),
      published: true,
      sort_order: articles.value.length
    });
    manageMessage.value = '文章已上传并发布。';
    await loadCatalog();
  } catch (cause) {
    manageMessage.value = cause instanceof Error ? cause.message : '文章上传失败';
  } finally {
    manageBusy.value = false;
  }
}
async function submitCatalog() {
  if (!catalogUpload.value) return;
  manageBusy.value = true;
  try {
    const result = await updateHistoryCatalog(catalogUpload.value);
    manageMessage.value = `${result.message}，共 ${result.case_count} 个专题。`;
    await loadCatalog();
  } catch (cause) {
    manageMessage.value = cause instanceof Error ? cause.message : '目录更新失败';
  } finally {
    manageBusy.value = false;
  }
}

onMounted(loadCatalog);
</script>

<style scoped>
.history-room{min-height:100vh;background:#f5f1e8;color:#252c2b;font-family:"Noto Serif SC","Songti SC",serif}.history-header{display:grid;grid-template-columns:180px 1fr 180px;align-items:center;gap:24px;padding:28px clamp(20px,5vw,72px);background:#102f32;color:#f9f4e8}.history-header h1{margin:3px 0;font-size:clamp(30px,4vw,52px)}.history-header p{margin:0;color:#cadbd5}.history-kicker{font:600 12px/1.4 system-ui;letter-spacing:.18em;color:#d4a857}.back-button,.manage-button,.history-tabs button,.manage-panel button,.search-form button{border:1px solid #c99b48;background:transparent;color:inherit;border-radius:8px;padding:10px 14px;cursor:pointer}.manage-button{justify-self:end}.history-tabs{display:flex;justify-content:center;gap:10px;padding:14px;background:#fff;border-bottom:1px solid #ded6c7}.history-tabs button{color:#405653;border-color:#c9c1b2}.history-tabs button.active,.manage-panel button,.search-form button{background:#15666c;color:white;border-color:#15666c}.history-layout{display:grid;grid-template-columns:minmax(250px,330px) 1fr;min-height:calc(100vh - 180px)}.history-sidebar{padding:24px;border-right:1px solid #d9d0c0;background:#ebe5d8;overflow:auto}.filter-box{display:grid;gap:7px;font:600 13px system-ui}.filter-box input,.manage-panel input,.search-form>input{box-sizing:border-box;width:100%;border:1px solid #c7bdab;border-radius:7px;background:#fff;padding:11px;font:inherit}.article-group h2{margin:24px 0 8px;font-size:16px}.article-group button{display:grid;width:100%;gap:3px;border:0;border-left:3px solid transparent;background:transparent;padding:10px;text-align:left;cursor:pointer}.article-group button:hover,.article-group button.selected{border-left-color:#b77e20;background:#fff8e9}.article-group small{color:#78756e}.article-reader{min-width:0;padding:clamp(26px,5vw,72px);background:#fffdf8}.article-meta{display:flex;justify-content:space-between;border-bottom:1px solid #ded6c7;padding-bottom:12px;color:#777}.markdown-body{max-width:900px;margin:0 auto;font-size:17px;line-height:1.9}.markdown-body :deep(img){max-width:100%;height:auto}.markdown-body :deep(pre){overflow:auto;background:#172625;color:#f4f0e7;padding:16px;border-radius:8px}.markdown-body :deep(table){display:block;overflow:auto;border-collapse:collapse}.markdown-body :deep(td),.markdown-body :deep(th){border:1px solid #d8d0c1;padding:7px}.text-search{max-width:1100px;margin:auto;padding:clamp(30px,6vw,80px) 24px}.search-intro h2{font-size:36px;margin:8px 0}.search-form{display:grid;grid-template-columns:1fr auto auto;align-items:center;gap:14px;margin:28px 0}.search-form label{font:14px system-ui}.search-results{display:grid;gap:14px;padding:0;list-style:none}.search-results li{background:white;border:1px solid #ddd3c1;border-radius:10px;padding:18px}.search-results li div{display:flex;gap:15px;color:#556}.search-results p{line-height:1.8}.manage-panel{display:grid;grid-template-columns:1fr 1fr;gap:24px;padding:24px clamp(20px,5vw,72px);background:#fff7e3;border-bottom:1px solid #dfc993}.manage-panel>div{display:grid;gap:10px}.manage-panel h2{margin:0}.manage-panel label{display:grid;gap:5px;font:14px system-ui}.manage-message{grid-column:1/-1}.history-error{margin:18px auto;max-width:900px;padding:12px 16px;background:#ffe4df;color:#8b2b20;border-radius:8px}.empty-state{padding:32px;color:#777;text-align:center}@media(max-width:760px){.history-header{grid-template-columns:1fr}.manage-button{justify-self:start}.history-layout{grid-template-columns:1fr}.history-sidebar{max-height:40vh;border-right:0;border-bottom:1px solid #d9d0c0}.search-form,.manage-panel{grid-template-columns:1fr}.article-reader{padding:24px 18px}}
</style>
