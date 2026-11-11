<template>
  <div class="history-room">
    <header class="history-header">
      <button class="back-button" type="button" @click="$emit('close')">← 返回春秋舆图手记</button>
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
      <button :class="{ active: tab === 'library' }" type="button" @click="tab = 'library'">经史子集</button>
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
      <button class="mobile-catalog-button" type="button" @click="sidebarOpen = true">
        <span>☰</span> 打开目录
      </button>
      <button v-if="sidebarOpen" class="catalog-backdrop" type="button" aria-label="关闭目录" @click="sidebarOpen = false"></button>
      <aside class="history-sidebar" :class="{ open: sidebarOpen }">
        <div class="catalog-heading">
          <div>
            <span class="history-kicker">CATALOG</span>
            <h2>阅读目录</h2>
          </div>
          <span class="article-total">{{ filteredArticles.length }} 篇</span>
          <button class="mobile-catalog-close" type="button" aria-label="关闭目录" @click="sidebarOpen = false">×</button>
        </div>
        <label class="filter-box">
          <span class="sr-only">筛选整理稿</span>
          <input v-model="filter" placeholder="搜索标题、专题或目录…" />
        </label>
        <HistoryCatalogNode
          v-for="node in navigationTree"
          :key="node.key"
          :node="node"
          :active-article-id="activeArticle?.article_id"
          :force-open="Boolean(filter.trim())"
          @select="openArticle"
        />
        <p v-if="!loading && !filteredArticles.length" class="empty-state">暂无已发布整理稿。</p>
      </aside>

      <main ref="readerTop" class="article-reader">
        <div v-if="loading" class="empty-state">正在加载史地资料…</div>
        <div v-else-if="!activeArticle" class="empty-state">从左侧选择一篇整理稿开始阅读。</div>
        <template v-else>
          <div class="article-meta">
            <div>
              <span class="article-section">{{ activeCaseTitle }}</span>
              <span class="article-path">{{ cleanArticlePath(activeArticle) }}</span>
            </div>
            <span class="article-size">{{ Math.ceil(activeArticle.byte_size / 1024) }} KiB</span>
          </div>
          <article ref="articleBody" class="markdown-body" v-html="renderedMarkdown" @click="onArticleClick"></article>
        </template>
      </main>
    </div>

    <main v-else-if="tab === 'search'" class="text-search">
      <div class="search-intro">
        <span class="history-kicker">ORIGINAL TEXT</span>
        <h2>古籍原文检索</h2>
        <p>检索已迁入服务器的原文段落。查询公开，结果保留来源书名、章节和段序。</p>
      </div>
      <form class="search-form" @submit.prevent="runSearch">
        <input
          v-model.trim="searchQuery"
          :minlength="minimumSearchLength"
          maxlength="80"
          :placeholder="searchBookId ? '已限定书目，可输入1个字' : '全库检索至少输入2个字'"
        />
        <div class="book-filter">
          <span>检索范围</span>
          <div ref="bookPickerRef" class="book-picker">
            <button
              type="button"
              class="book-picker-trigger"
              aria-haspopup="listbox"
              :aria-expanded="bookPickerOpen"
              :title="selectedBookLabel"
              @click="toggleBookPicker"
            >
              <span>{{ selectedBookLabel }}</span>
              <i aria-hidden="true">▾</i>
            </button>
            <div v-if="bookPickerOpen" class="book-picker-panel" role="listbox">
              <input
                ref="bookFilterInput"
                v-model.trim="bookKeyword"
                class="book-picker-search"
                type="search"
                placeholder="输入关键词筛选书目…"
                @keydown.esc.stop.prevent="closeBookPicker"
                @keydown.enter.prevent="selectFirstFilteredBook"
              />
              <ul class="book-picker-list">
                <li v-if="!bookKeyword">
                  <button type="button" :class="{ selected: !searchBookId }" @click="selectBook('')">
                    全部书目（至少2字）
                  </button>
                </li>
                <li v-for="book in filteredBooks" :key="book.book_id">
                  <button
                    type="button"
                    :class="{ selected: book.book_id === searchBookId }"
                    @click="selectBook(book.book_id)"
                  >
                    <span>{{ book.title }}</span>
                    <small>{{ book.text_chapter_count }} 章</small>
                  </button>
                </li>
                <li v-if="bookKeyword && !filteredBooks.length" class="book-picker-empty">没有匹配的书目</li>
              </ul>
            </div>
          </div>
        </div>
        <label><input v-model="normalizedSearch" type="checkbox" /> 兼容异体/全半角归一化文本</label>
        <button type="submit" :disabled="searching || !canRunSearch">{{ searching ? '检索中…' : '检索' }}</button>
      </form>
      <p class="search-guidance">全库检索至少需2个字；需要查“唐”“税”等单字时，请先选择一种书目。</p>
      <ol v-if="searchResult" class="search-results">
        <li v-for="item in searchResult.items" :key="`${item.chapter_id}-${item.ordinal}`">
          <div><strong>{{ item.book_title }}</strong><span>{{ item.chapter_title }} · 第 {{ item.ordinal + 1 }} 段</span></div>
          <p v-html="highlightSearchText(item.original_text)"></p>
        </li>
      </ol>
      <p v-if="searchResult && !searchResult.items.length" class="empty-state">没有找到匹配段落。</p>
    </main>
    <HistoryCorpusReader v-else :books="historyBooks" />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import markedFootnote from 'marked-footnote';
import HistoryCatalogNode from './HistoryCatalogNode.vue';
import HistoryCorpusReader from './HistoryCorpusReader.vue';
import type { AuthUser } from '../types/auth';
import type { HistoryCatalogNode as CatalogNode } from '../types/historyCatalog';
import {
  getHistoryArticle,
  getHistoryBooks,
  getHistoryCatalog,
  searchHistoryText,
  updateHistoryCatalog,
  upsertHistoryArticle,
  type HistoryArticle,
  type HistoryArticleSummary,
  type HistoryBookSummary,
  type HistorySearchResponse
} from '../services/api';

const props = defineProps<{ user: AuthUser | null; authEntryVisible: boolean }>();
defineEmits<{ close: [] }>();

marked.use(markedFootnote());
let mermaidInitialized = false;

const tab = ref<'articles' | 'library' | 'search'>('articles');
const articles = ref<HistoryArticleSummary[]>([]);
const cases = ref<Array<Record<string, unknown>>>([]);
const activeArticle = ref<HistoryArticle | null>(null);
const loading = ref(true);
const error = ref('');
const filter = ref('');
const articleBody = ref<HTMLElement | null>(null);
const searchQuery = ref('');
const searchBookId = ref('');
const historyBooks = ref<HistoryBookSummary[]>([]);
const normalizedSearch = ref(false);
const searching = ref(false);
const searchResult = ref<HistorySearchResponse | null>(null);
const bookKeyword = ref('');
const bookPickerOpen = ref(false);
const bookPickerRef = ref<HTMLElement | null>(null);
const bookFilterInput = ref<HTMLInputElement | null>(null);
const manageOpen = ref(false);
const manageBusy = ref(false);
const manageMessage = ref('');
const uploadPath = ref('');
const uploadTitle = ref('');
const uploadCaseId = ref('');
const uploadContent = ref('');
const catalogUpload = ref<Record<string, unknown> | null>(null);
const sidebarOpen = ref(false);
const readerTop = ref<HTMLElement | null>(null);

const canEdit = computed(() => props.authEntryVisible && ['springgis', '凡语春秋'].includes(props.user?.username.trim().normalize('NFKC').toLocaleLowerCase() ?? ''));
const minimumSearchLength = computed(() => searchBookId.value ? 1 : 2);
const canRunSearch = computed(() => searchQuery.value.trim().length >= minimumSearchLength.value);
const selectedBookLabel = computed(() => {
  if (!searchBookId.value) return '全部书目（至少2字）';
  const book = historyBooks.value.find((item) => item.book_id === searchBookId.value);
  return book ? `${book.title}（${book.text_chapter_count} 章）` : '全部书目（至少2字）';
});
const filteredBooks = computed(() => {
  const keyword = bookKeyword.value.trim().toLocaleLowerCase();
  if (!keyword) return historyBooks.value;
  return historyBooks.value.filter((book) =>
    `${book.title} ${book.book_id}`.toLocaleLowerCase().includes(keyword)
  );
});

function openBookPicker(): void {
  bookPickerOpen.value = true;
  void nextTick(() => bookFilterInput.value?.focus());
}

function closeBookPicker(): void {
  bookPickerOpen.value = false;
  bookKeyword.value = '';
}

function toggleBookPicker(): void {
  if (bookPickerOpen.value) closeBookPicker();
  else openBookPicker();
}

function selectBook(bookId: string): void {
  searchBookId.value = bookId;
  searchResult.value = null;
  closeBookPicker();
}

function selectFirstFilteredBook(): void {
  if (!bookKeyword.value) {
    selectBook('');
    return;
  }
  const first = filteredBooks.value[0];
  if (first) selectBook(first.book_id);
}

function handleBookPickerOutside(event: PointerEvent): void {
  if (!bookPickerOpen.value) return;
  const target = event.target as Node | null;
  if (target && bookPickerRef.value?.contains(target)) return;
  closeBookPicker();
}
const filteredArticles = computed(() => {
  const keyword = filter.value.trim().toLocaleLowerCase();
  if (!keyword) return articles.value;
  return articles.value.filter((item) => `${item.title} ${item.path} ${item.category_path.join(' ')}`.toLocaleLowerCase().includes(keyword));
});
const navigationTree = computed<CatalogNode[]>(() => {
  const caseMetadata = new Map(cases.value.map((item) => [String(item.id ?? ''), item]));
  type MutableNode = Omit<CatalogNode, 'children'> & { children: Map<string, MutableNode> };
  const roots = new Map<string, MutableNode>();

  const folderLabel = (part: string) => String(caseMetadata.get(part)?.title ?? part);
  for (const article of filteredArticles.value) {
    const parts = article.category_path.filter((part) => part && part !== 'cases');
    if (!parts.length) parts.push('未分类');
    let siblings = roots;
    let path = '';
    const ancestors: MutableNode[] = [];
    for (const part of parts) {
      path = path ? `${path}/${part}` : part;
      let node = siblings.get(part);
      if (!node) {
        node = { key: path, name: folderLabel(part), count: 0, children: new Map(), articles: [] };
        siblings.set(part, node);
      }
      node.count += 1;
      ancestors.push(node);
      siblings = node.children;
    }
    ancestors[ancestors.length - 1]?.articles.push(article);
  }

  const rootOrder = new Map([['背景综述', 0], ['时代专题', 1], ['王朝资料', 2]]);
  const materialize = (node: MutableNode): CatalogNode => ({
    ...node,
    children: [...node.children.values()]
      .sort((a, b) => a.name.localeCompare(b.name, 'zh-CN', { numeric: true }))
      .map(materialize)
  });
  return [...roots.values()]
    .sort((a, b) => (rootOrder.get(a.name) ?? 99) - (rootOrder.get(b.name) ?? 99)
      || a.name.localeCompare(b.name, 'zh-CN'))
    .map(materialize);
});
const activeCaseTitle = computed(() => {
  const caseId = activeArticle.value?.case_id;
  return String(cases.value.find((item) => String(item.id ?? '') === caseId)?.title ?? '史地整理');
});
const renderedMarkdown = computed(() => {
  if (!activeArticle.value) return '';
  const html = marked.parse(activeArticle.value.content, { async: false }) as string;
  const localized = html
    .replace(
      /<h2 id="footnote-label" class="sr-only">Footnotes<\/h2>/gi,
      '<h2 id="footnote-label">参考文献</h2>'
    )
    .replace(/aria-label="Back to reference[^"]*"/gi, 'aria-label="返回正文引用位置"')
    .replace(/href="(hanji:\/\/[^\"]+)"/gi, 'href="#history-source" data-hanji-source="$1"');
  return DOMPurify.sanitize(localized, { ADD_ATTR: ['target', 'data-hanji-source'] });
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

async function loadHistoryBooks() {
  try {
    historyBooks.value = await getHistoryBooks();
  } catch (cause) {
    console.warn('[history-books]', cause);
  }
}

async function openArticle(summary: HistoryArticleSummary) {
  error.value = '';
  try {
    activeArticle.value = await getHistoryArticle(summary.article_id);
    sidebarOpen.value = false;
    await nextTick();
    readerTop.value?.scrollTo({ top: 0, behavior: 'smooth' });
    articleBody.value?.querySelectorAll<HTMLTableElement>('table').forEach((table) => {
      if (table.parentElement?.classList.contains('markdown-table-scroll')) return;
      const wrapper = document.createElement('div');
      wrapper.className = 'markdown-table-scroll';
      table.replaceWith(wrapper);
      wrapper.append(table);
    });
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

function cleanArticlePath(article: HistoryArticle): string {
  return article.category_path.filter((part) => part !== 'cases').join(' / ') || '专题文章';
}

function onArticleClick(event: MouseEvent) {
  const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a');
  if (!anchor) return;
  const href = anchor.getAttribute('href') ?? '';
  const sourceLink = anchor.dataset.hanjiSource || (href.startsWith('hanji://') ? href : '');
  if (sourceLink) {
    event.preventDefault();
    let query = '';
    try {
      query = new URL(sourceLink).searchParams.get('q')?.trim() ?? '';
    } catch {
      query = sourceLink.match(/[?&]q=([^&#]+)/)?.[1] ? decodeURIComponent(sourceLink.match(/[?&]q=([^&#]+)/)?.[1] ?? '') : '';
    }
    if (query) {
      searchQuery.value = query;
      tab.value = 'search';
      if (query.length >= minimumSearchLength.value) void runSearch();
      else error.value = '该原文链接使用单字检索，请先在检索页选择书目。';
    } else {
      error.value = '该参考文献没有附带可检索的原文关键词。';
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
  if (!canRunSearch.value) {
    error.value = searchBookId.value ? '请输入检索词。' : '全库检索至少输入2个字，单字检索请先选择书目。';
    return;
  }
  searching.value = true;
  error.value = '';
  try {
    searchResult.value = await searchHistoryText(searchQuery.value, normalizedSearch.value, searchBookId.value);
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : '原文检索失败';
  } finally {
    searching.value = false;
  }
}

function highlightSearchText(text: string): string {
  const escapedText = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
  const term = searchQuery.value.trim();
  if (!term) return escapedText;
  const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return escapedText.replace(new RegExp(escapedTerm, 'giu'), (match: string) => `<mark class="search-hit">${match}</mark>`);
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

onMounted(() => {
  void loadCatalog();
  void loadHistoryBooks();
  document.addEventListener('pointerdown', handleBookPickerOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', handleBookPickerOutside);
});
</script>

<style scoped>
.history-room{min-height:100vh;background:#f5f1e8;color:#252c2b;font-family:"Noto Serif SC","Songti SC",serif}.history-header{display:grid;grid-template-columns:180px 1fr 180px;align-items:center;gap:24px;padding:28px clamp(20px,5vw,72px);background:#102f32;color:#f9f4e8}.history-header h1{margin:3px 0;font-size:clamp(30px,4vw,52px)}.history-header p{margin:0;color:#cadbd5}.history-kicker{font:600 12px/1.4 system-ui;letter-spacing:.18em;color:#d4a857}.back-button,.manage-button,.history-tabs button,.manage-panel button,.search-form button{border:1px solid #c99b48;background:transparent;color:inherit;border-radius:8px;padding:10px 14px;cursor:pointer}.manage-button{justify-self:end}.history-tabs{display:flex;justify-content:center;gap:10px;padding:14px;background:#fff;border-bottom:1px solid #ded6c7}.history-tabs button{color:#405653;border-color:#c9c1b2}.history-tabs button.active,.manage-panel button,.search-form button{background:#15666c;color:white;border-color:#15666c}.history-layout{display:grid;grid-template-columns:minmax(250px,330px) 1fr;min-height:calc(100vh - 180px)}.history-sidebar{padding:24px;border-right:1px solid #d9d0c0;background:#ebe5d8;overflow:auto}.filter-box{display:grid;gap:7px;font:600 13px system-ui}.filter-box input,.manage-panel input,.search-form>input,.book-filter select{box-sizing:border-box;width:100%;border:1px solid #c7bdab;border-radius:7px;background:#fff;padding:11px;font:inherit}.article-group h2{margin:24px 0 8px;font-size:16px}.article-group button{display:grid;width:100%;gap:3px;border:0;border-left:3px solid transparent;background:transparent;padding:10px;text-align:left;cursor:pointer}.article-group button:hover,.article-group button.selected{border-left-color:#b77e20;background:#fff8e9}.article-group small{color:#78756e}.article-reader{min-width:0;padding:clamp(26px,5vw,72px);background:#fffdf8}.article-meta{display:flex;justify-content:space-between;border-bottom:1px solid #ded6c7;padding-bottom:12px;color:#777}.markdown-body{max-width:900px;margin:0 auto;font-size:17px;line-height:1.9}.markdown-body :deep(img){max-width:100%;height:auto}.markdown-body :deep(pre){overflow:auto;background:#172625;color:#f4f0e7;padding:16px;border-radius:8px}.markdown-body :deep(table){display:block;overflow:auto;border-collapse:collapse}.markdown-body :deep(td),.markdown-body :deep(th){border:1px solid #d8d0c1;padding:7px}.text-search{max-width:1100px;margin:auto;padding:clamp(30px,6vw,80px) 24px}.search-intro h2{font-size:36px;margin:8px 0}.search-form{display:grid;grid-template-columns:minmax(220px,1fr) minmax(230px,320px) auto auto;align-items:end;gap:14px;margin:28px 0 8px}.search-form label{font:14px system-ui}.book-filter{display:grid;gap:5px;color:#52615e}.book-filter select{min-width:0;color:#293936}.search-guidance{margin:0 0 28px;color:#766e62;font:13px/1.6 system-ui}.search-results{display:grid;gap:14px;padding:0;list-style:none}.search-results li{background:white;border:1px solid #ddd3c1;border-radius:10px;padding:18px}.search-results li div{display:flex;gap:15px;color:#556}.search-results p{line-height:1.8}.manage-panel{display:grid;grid-template-columns:1fr 1fr;gap:24px;padding:24px clamp(20px,5vw,72px);background:#fff7e3;border-bottom:1px solid #dfc993}.manage-panel>div{display:grid;gap:10px}.manage-panel h2{margin:0}.manage-panel label{display:grid;gap:5px;font:14px system-ui}.manage-message{grid-column:1/-1}.history-error{margin:18px auto;max-width:900px;padding:12px 16px;background:#ffe4df;color:#8b2b20;border-radius:8px}.empty-state{padding:32px;color:#777;text-align:center}@media(max-width:760px){.history-header{grid-template-columns:1fr}.manage-button{justify-self:start}.history-layout{grid-template-columns:1fr}.history-sidebar{max-height:40vh;border-right:0;border-bottom:1px solid #d9d0c0}.search-form,.manage-panel{grid-template-columns:1fr}.article-reader{padding:24px 18px}}
.history-layout{position:relative;grid-template-columns:360px minmax(0,1fr);height:calc(100vh - 180px);min-height:620px;overflow:hidden}.history-sidebar{box-sizing:border-box;height:100%;padding:22px 18px 36px;background:#f0eadf;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:#baa98b transparent}.catalog-heading{position:sticky;top:-22px;z-index:3;display:grid;grid-template-columns:1fr auto;align-items:center;gap:12px;margin:-22px -18px 14px;padding:22px 18px 14px;background:linear-gradient(180deg,#f0eadf 82%,rgba(240,234,223,0));}.catalog-heading h2{margin:3px 0 0;font-size:22px}.article-total{border:1px solid #c8b99e;border-radius:999px;padding:5px 9px;color:#665f55;font:600 12px system-ui;background:rgba(255,255,255,.55)}.filter-box{position:sticky;top:72px;z-index:3;margin-bottom:16px;padding-bottom:8px;background:#f0eadf}.filter-box input{border-color:#cbbda5;background:#fffdf8;box-shadow:0 5px 15px rgba(53,43,29,.06)}.case-node{margin:0 0 10px;border:1px solid #d7cbb8;border-radius:12px;background:rgba(255,253,248,.7);overflow:hidden}.case-trigger{display:grid;grid-template-columns:28px 1fr;width:100%;align-items:center;gap:8px;border:0;background:transparent;padding:13px 12px;text-align:left;color:#2b3a38;cursor:pointer}.case-trigger:hover{background:#fff9ec}.case-chevron{display:grid;place-items:center;width:24px;height:24px;border-radius:50%;background:#dce9e4;color:#155e61;font:700 17px/1 system-ui}.case-copy{display:grid;gap:3px;min-width:0}.case-copy strong{font-size:14px;line-height:1.45}.case-copy small{color:#81796d;font:12px/1.35 system-ui}.case-contents{border-top:1px solid #e2d8c8;padding:6px 8px 10px;background:#fffdf8}.category-node h3{margin:13px 9px 5px;color:#9b7027;font:700 11px/1.4 system-ui;letter-spacing:.08em}.category-node button{display:block;width:100%;border:0;border-radius:7px;background:transparent;padding:8px 9px 8px 13px;text-align:left;color:#3e4542;cursor:pointer;font:13px/1.5 "Noto Serif SC","Songti SC",serif}.category-node button:hover{background:#f2eee5;color:#0e6468}.category-node button.selected{background:#dcece8;color:#0d5c60;font-weight:700;box-shadow:inset 3px 0 #178087}.article-reader{box-sizing:border-box;height:100%;overflow-y:auto;overscroll-behavior:contain;padding:32px clamp(28px,5vw,82px) 80px}.article-meta{position:sticky;top:-32px;z-index:2;align-items:center;margin:-32px 0 30px;padding:18px 0 13px;background:rgba(255,253,248,.95);backdrop-filter:blur(10px)}.article-meta>div{display:grid;gap:3px}.article-section{color:#15666c;font-weight:700}.article-path{color:#81796d;font-size:13px}.article-size{flex:0 0 auto;border:1px solid #ddd3c1;border-radius:999px;padding:5px 9px;font:12px system-ui}.markdown-body{max-width:860px}.markdown-body :deep(h1){font-size:clamp(30px,4vw,46px);line-height:1.25;margin:0 0 28px;color:#193b3a}.markdown-body :deep(h2){margin-top:2em;padding-bottom:.35em;border-bottom:1px solid #ded6c7;color:#234f4d}.markdown-body :deep(h3){margin-top:1.6em;color:#7c581f}.markdown-body :deep(p){text-align:justify}.mobile-catalog-button,.mobile-catalog-close,.catalog-backdrop{display:none}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.markdown-body :deep(a[data-hanji-source]){display:inline-flex;align-items:center;margin:0 .12em;border:1px solid #087985;border-radius:5px;background:#e5f6f4;padding:1px 7px;color:#005d69;font-weight:800;text-decoration:none;box-shadow:0 0 0 2px rgba(12,134,145,.09)}.markdown-body :deep(a[data-hanji-source]::before){content:'↗';margin-right:4px;color:#b15f00;font-size:.9em}.markdown-body :deep(a[data-hanji-source]:hover),.markdown-body :deep(a[data-hanji-source]:focus-visible){background:#087985;color:#fff;outline:3px solid rgba(8,121,133,.22);outline-offset:2px}.markdown-body :deep(a[data-footnote-ref]){border-radius:4px;background:#ffe5a3;padding:1px 5px;color:#724000;font-weight:800;text-decoration:none}.markdown-body :deep(section.footnotes){margin-top:54px;border-top:3px solid #b9872f;border-radius:8px;background:#faf3e4;padding:6px 22px 18px}.markdown-body :deep(section.footnotes h2){margin-top:14px;border:0;color:#694913;font-size:24px}.markdown-body :deep(section.footnotes li::marker){color:#a36d13;font-weight:800}.markdown-body :deep(a[data-footnote-backref]){color:#087985;font-weight:800}.search-results :deep(mark.search-hit){border-radius:4px;background:#ffd24d;box-shadow:0 0 0 2px rgba(218,145,0,.2);padding:1px 3px;color:#3d2700;font-weight:900}
.history-header{border-bottom:1px solid #d7c7aa;background:linear-gradient(120deg,#f4eee2 0%,#e4eee8 58%,#f5ead5 100%);color:#234744;box-shadow:0 8px 24px rgba(72,61,39,.08)}.history-header p{color:#61736e}.history-header .history-kicker{color:#9b6a1d}.history-header .back-button,.history-header .manage-button{border-color:#b48a44;background:rgba(255,255,255,.55);color:#28504d}.history-header .back-button:hover,.history-header .manage-button:hover{background:#fffaf0}.markdown-body :deep(.markdown-table-scroll){box-sizing:border-box;width:100%;max-width:100%;margin:24px 0;overflow-x:auto;border:1px solid #d8cdbb;border-radius:8px;background:#fffefa}.markdown-body :deep(.markdown-table-scroll table){display:table;width:100%;min-width:720px;max-width:none;margin:0;border:0;border-collapse:collapse;table-layout:auto}.markdown-body :deep(.markdown-table-scroll th),.markdown-body :deep(.markdown-table-scroll td){box-sizing:border-box;min-width:110px;max-width:360px;padding:10px 12px;vertical-align:top;white-space:normal;overflow-wrap:anywhere;word-break:break-word;line-height:1.65}.markdown-body :deep(.markdown-table-scroll th:last-child),.markdown-body :deep(.markdown-table-scroll td:last-child){min-width:260px;max-width:480px}.markdown-body :deep(.markdown-table-scroll th){background:#eee8dc;color:#31514e;font-weight:800}
@media(max-width:900px){.history-header{grid-template-columns:1fr auto;padding:18px 20px}.history-header>div{grid-column:1/-1;grid-row:1}.history-header .back-button{grid-row:2}.manage-button{grid-row:2}.history-header h1{font-size:30px}.history-tabs{padding:9px}.history-layout{display:block;height:calc(100vh - 200px);min-height:520px}.mobile-catalog-button{display:flex;position:absolute;z-index:6;top:12px;left:14px;align-items:center;gap:7px;border:1px solid #bba987;border-radius:999px;background:#fffdf8;padding:8px 12px;color:#27514f;font-weight:700;box-shadow:0 8px 24px rgba(32,47,43,.13)}.history-sidebar{position:absolute;z-index:9;top:0;bottom:0;left:0;width:min(88vw,380px);height:100%;transform:translateX(-105%);transition:transform .22s ease;box-shadow:18px 0 50px rgba(18,31,29,.25)}.history-sidebar.open{transform:translateX(0)}.catalog-backdrop{display:block;position:absolute;z-index:8;inset:0;border:0;background:rgba(10,25,24,.42)}.mobile-catalog-close{display:grid;position:absolute;right:10px;top:18px;width:32px;height:32px;place-items:center;border:0;border-radius:50%;background:#dfd5c5;color:#344;font-size:24px}.catalog-heading{padding-right:50px}.article-reader{height:100%;padding:64px 18px 70px}.article-meta{top:-64px;margin:-64px 0 24px;padding:16px 0 12px}.article-path{max-width:70vw;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.markdown-body{font-size:16px;line-height:1.85}}
.book-picker{position:relative}.book-picker-trigger{display:flex;width:100%;box-sizing:border-box;align-items:center;justify-content:space-between;gap:8px;border:1px solid #c7bdab;border-radius:7px;background:#fff;padding:11px;font:inherit;color:#293936;text-align:left;cursor:pointer}.book-picker-trigger span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.book-picker-trigger i{flex:0 0 auto;color:#81796d;font-style:normal}.book-picker-panel{position:absolute;z-index:30;top:calc(100% + 6px);left:0;right:0;overflow:hidden;border:1px solid #c7bdab;border-radius:9px;background:#fff;box-shadow:0 18px 40px rgba(35,44,43,.18)}.book-picker-search{box-sizing:border-box;width:100%;border:0;border-bottom:1px solid #e4dbca;background:#fffdf8;padding:11px 12px;font:inherit;outline:0}.book-picker-list{max-height:320px;margin:0;padding:6px;overflow-y:auto;list-style:none}.book-picker-list button{display:flex;width:100%;justify-content:space-between;gap:10px;border:0;border-radius:6px;background:transparent;padding:9px 10px;font:inherit;color:#2b3a38;text-align:left;cursor:pointer}.book-picker-list button:hover,.book-picker-list button.selected{background:#e8f1ee;color:#0d5c60}.book-picker-list small{flex:0 0 auto;color:#81796d;font:12px system-ui;white-space:nowrap}.book-picker-empty{padding:12px;color:#81796d}
</style>
