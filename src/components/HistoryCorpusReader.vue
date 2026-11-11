<template>
  <main class="corpus-reader">
    <header class="corpus-intro">
      <div><span class="kicker">CLASSICS LIBRARY</span><h2>经史子集原文库</h2><p>循四部目录逐级展开书目与篇章，正文保持完整阅读空间。</p></div>
      <div class="totals"><span><strong>{{ books.length }}</strong> 种书</span><span><strong>{{ totalChapters }}</strong> 章</span></div>
    </header>
    <div class="reader-shell">
      <aside class="library-tree" aria-label="经史子集目录">
        <div class="tree-heading"><div><span class="kicker">CATALOG</span><h3>古籍目录</h3></div><button v-if="activeBook" type="button" @click="resetBookPath">收起</button></div>
        <label class="filter"><span class="sr-only">筛选书名</span><input v-model.trim="bookFilter" placeholder="搜索书名或书目编号…" /></label>
        <nav class="tree-scroll">
          <section v-for="division in divisions" :key="division">
            <button class="tree-row division-row" :class="{ selected: activeDivision === division }" type="button" :aria-expanded="activeDivision === division" @click="selectDivision(division)">
              <span class="chevron">{{ activeDivision === division ? '−' : '+' }}</span><strong>{{ division }}</strong><small>{{ divisionCounts.get(division) ?? 0 }}</small>
            </button>
            <div v-if="activeDivision === division" class="branch category-branch">
              <section v-for="category in visibleCategories" :key="category.code">
                <button class="tree-row category-row" :class="{ selected: activeCategory === category.code }" type="button" :aria-expanded="activeCategory === category.code" @click="selectCategory(category.code)">
                  <span class="chevron">{{ activeCategory === category.code ? '−' : '+' }}</span><span>{{ category.name }}</span><small>{{ category.count }}</small>
                </button>
                <div v-if="activeCategory === category.code" class="branch book-branch">
                  <p v-if="!visibleBooks.length" class="empty">没有匹配书目。</p>
                  <section v-for="book in visibleBooks" :key="book.book_id">
                    <button class="tree-row book-row" :class="{ selected: activeBook?.book_id === book.book_id }" type="button" :aria-expanded="activeBook?.book_id === book.book_id" @click="selectBook(book)">
                      <span class="chevron">{{ activeBook?.book_id === book.book_id ? '−' : '+' }}</span>
                      <span><strong>{{ book.title }}</strong><small>{{ book.book_id }} · {{ book.text_chapter_count }} 章</small></span>
                    </button>
                    <div v-if="activeBook?.book_id === book.book_id" class="branch chapter-branch">
                      <label v-if="chapters.length > 12" class="chapter-filter"><span class="sr-only">筛选章节</span><input v-model.trim="chapterFilter" placeholder="筛选章节…" /></label>
                      <p v-if="chaptersLoading" class="empty">正在读取章节…</p>
                      <button v-for="chapter in visibleChapters" :key="chapter.chapter_id" class="chapter-row" :class="{ selected: activeChapter?.chapter_id === chapter.chapter_id }" type="button" @click="readChapter(chapter)">
                        <span>{{ chapter.display_title }}</span><small>第 {{ chapter.chapter_index + 1 }} 项 · {{ chapter.text_length ?? 0 }} 字</small>
                      </button>
                      <p v-if="!chaptersLoading && !visibleChapters.length" class="empty">没有匹配章节。</p>
                    </div>
                  </section>
                </div>
              </section>
            </div>
          </section>
        </nav>
      </aside>
      <article ref="textPane" class="text-pane">
        <div v-if="chapterLoading" class="empty">正在读取正文…</div>
        <div v-else-if="!activeChapter" class="welcome"><span>经 · 史 · 子 · 集</span><h3>从左侧目录选择书目与章节</h3><p>目录只展开当前阅读路径，正文以数据库纯文本呈现。</p><p>“机器解码未校验”不等于原版逐字校勘。</p></div>
        <template v-else>
          <header class="chapter-heading"><span>{{ activeChapter.book_title }}</span><h2>{{ activeChapter.display_title }}</h2><div><small>{{ activeChapter.chapter_id }}</small><small>{{ verificationLabel(activeChapter.verification_status) }}</small><small>{{ activeChapter.text_length ?? 0 }} 字</small></div></header>
          <pre class="chapter-text">{{ activeChapter.original_text || '原记录无正文。' }}</pre>
          <footer class="evidence"><span>解码器：{{ activeChapter.decoder }}</span><span>SHA256：{{ activeChapter.source_sha256 }}</span></footer>
        </template>
        <p v-if="readerError" class="error">{{ readerError }}</p>
      </article>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { getHistoryChapter, getHistoryChapters, type HistoryBookSummary, type HistoryChapter, type HistoryChapterSummary } from '../services/api';

const props = defineProps<{ books: HistoryBookSummary[] }>();
const divisions = ['经部', '史部', '子部', '集部'] as const;
type Division = (typeof divisions)[number];
const activeDivision = ref<Division | null>('经部');
const activeCategory = ref('');
const activeBook = ref<HistoryBookSummary | null>(null);
const activeChapter = ref<HistoryChapter | null>(null);
const chapters = ref<HistoryChapterSummary[]>([]);
const bookFilter = ref('');
const chapterFilter = ref('');
const chaptersLoading = ref(false);
const chapterLoading = ref(false);
const readerError = ref('');
const textPane = ref<HTMLElement | null>(null);

const totalChapters = computed(() => props.books.reduce((sum, book) => sum + Number(book.text_chapter_count || 0), 0));
const divisionCounts = computed(() => {
  const counts = new Map<string, number>();
  for (const book of props.books) counts.set(book.division, (counts.get(book.division) ?? 0) + 1);
  return counts;
});
const visibleCategories = computed(() => {
  const result = new Map<string, { code: string; name: string; count: number }>();
  for (const book of props.books.filter((item) => item.division === activeDivision.value)) {
    const current = result.get(book.category_code);
    if (current) current.count += 1;
    else result.set(book.category_code, { code: book.category_code, name: book.category_name, count: 1 });
  }
  return [...result.values()].sort((a, b) => a.code.localeCompare(b.code, 'zh-CN', { numeric: true }));
});
const visibleBooks = computed(() => {
  const keyword = bookFilter.value.toLocaleLowerCase();
  return props.books.filter((book) => book.division === activeDivision.value && book.category_code === activeCategory.value && (!keyword || `${book.title} ${book.book_id}`.toLocaleLowerCase().includes(keyword)));
});
const visibleChapters = computed(() => {
  const keyword = chapterFilter.value.toLocaleLowerCase();
  return keyword ? chapters.value.filter((chapter) => `${chapter.display_title} ${chapter.chapter_id}`.toLocaleLowerCase().includes(keyword)) : chapters.value;
});

watch(visibleCategories, (categories) => {
  if (!categories.some((item) => item.code === activeCategory.value)) activeCategory.value = categories[0]?.code ?? '';
}, { immediate: true });

function resetBookPath() { activeBook.value = null; activeChapter.value = null; chapters.value = []; chapterFilter.value = ''; readerError.value = ''; }
function selectDivision(division: Division) { activeDivision.value = activeDivision.value === division ? null : division; activeCategory.value = ''; resetBookPath(); }
function selectCategory(code: string) { activeCategory.value = activeCategory.value === code ? '' : code; resetBookPath(); }
async function selectBook(book: HistoryBookSummary) {
  if (activeBook.value?.book_id === book.book_id) { resetBookPath(); return; }
  resetBookPath(); activeBook.value = book; chaptersLoading.value = true;
  try {
    for (let offset = 0; offset < 100_000; offset += 500) {
      const page = await getHistoryChapters(book.book_id, offset); chapters.value.push(...page); if (page.length < 500) break;
    }
  } catch (cause) { readerError.value = cause instanceof Error ? cause.message : '章节目录读取失败'; }
  finally { chaptersLoading.value = false; }
}
async function readChapter(chapter: HistoryChapterSummary) {
  chapterLoading.value = true; readerError.value = '';
  try { activeChapter.value = await getHistoryChapter(chapter.chapter_id); textPane.value?.scrollTo({ top: 0, behavior: 'smooth' }); }
  catch (cause) { readerError.value = cause instanceof Error ? cause.message : '正文读取失败'; }
  finally { chapterLoading.value = false; }
}
function verificationLabel(value: string): string { return ({ decoded_unverified: '机器解码未校验', verified_sample: '已抽样核验', metadata_only: '仅有目录信息' } as Record<string, string>)[value] ?? value; }
</script>

<style scoped>
.corpus-reader{box-sizing:border-box;height:calc(100vh - 180px);min-height:640px;padding:22px clamp(18px,3vw,46px) 34px;background:#f6f1e7;color:#293532}.corpus-intro{display:flex;align-items:end;justify-content:space-between;gap:24px;max-width:1720px;margin:0 auto 17px}.corpus-intro h2{margin:3px 0;font-size:clamp(27px,3vw,39px);color:#244a47}.corpus-intro p{margin:0;color:#6c736d}.kicker{color:#a87526;font:700 11px/1.4 system-ui;letter-spacing:.16em}.totals{display:flex;gap:8px}.totals span{border:1px solid #d7c9b1;border-radius:999px;background:#fffdf8;padding:7px 11px;color:#777066;font:12px system-ui}.totals strong{color:#276d6d}.reader-shell{display:grid;grid-template-columns:minmax(320px,390px) minmax(0,1fr);height:calc(100% - 94px);max-width:1720px;margin:auto;border:1px solid #d6cbb9;border-radius:14px;background:#fffdf8;overflow:hidden;box-shadow:0 12px 35px rgba(71,58,38,.08)}.library-tree{display:grid;grid-template-rows:auto auto 1fr;min-width:0;border-right:1px solid #d9cfbd;background:#f2ece0}.tree-heading{display:flex;align-items:center;justify-content:space-between;padding:16px 18px 10px}.tree-heading h3{margin:2px 0;color:#315653;font-size:21px}.tree-heading button{border:1px solid #c9b996;border-radius:999px;background:#fffaf0;padding:5px 9px;color:#56706b;cursor:pointer}.filter{padding:0 14px 12px}.filter input,.chapter-filter input{box-sizing:border-box;width:100%;border:1px solid #cbbda5;border-radius:8px;background:#fffdf8;padding:10px 11px;font:13px system-ui}.tree-scroll{min-height:0;overflow-y:auto;padding:0 10px 28px}.tree-row{display:grid;width:100%;grid-template-columns:20px minmax(0,1fr) auto;align-items:center;gap:7px;border:0;border-radius:7px;background:transparent;color:#3e4c48;text-align:left;cursor:pointer}.division-row{margin-top:5px;padding:11px 10px;font-size:15px}.category-row{padding:9px;font-size:13px}.book-row{align-items:start;padding:8px}.tree-row:hover{background:#ebe3d5}.tree-row.selected{background:#dcebe6;color:#175e60}.tree-row small{color:#817a70;font:11px/1.35 system-ui}.chevron{display:grid;width:17px;height:17px;place-items:center;color:#277173;font:700 14px/1 system-ui}.branch{margin-left:17px;border-left:1px solid #d5c9b6;padding-left:6px}.book-row>span:nth-child(2){display:grid;gap:3px;min-width:0}.book-row strong{font-weight:600;overflow-wrap:anywhere}.chapter-branch{margin:2px 0 7px 25px;padding:4px 0 5px 7px}.chapter-filter{display:block;padding:3px 5px 7px}.chapter-filter input{padding:8px}.chapter-row{display:grid;width:100%;gap:3px;border:0;border-left:3px solid transparent;border-radius:5px;background:transparent;padding:7px 8px;color:#4c514e;text-align:left;cursor:pointer}.chapter-row:hover{background:#ebe5da}.chapter-row.selected{border-left-color:#1d7779;background:#d9ebe7;color:#155c60}.chapter-row span{overflow-wrap:anywhere;font:13px/1.45 "Noto Serif SC","Songti SC",serif}.chapter-row small{color:#8a8176;font:10px/1.35 system-ui}.text-pane{min-width:0;height:100%;overflow-y:auto;background:#fffefa;padding:0 clamp(26px,5vw,82px) 58px}.welcome{display:grid;min-height:100%;place-content:center;text-align:center;color:#74776f}.welcome span{color:#af7c2b;font-size:25px;letter-spacing:.32em}.welcome h3{margin:16px 0 8px;color:#315653;font-size:28px}.welcome p{margin:3px}.chapter-heading{position:sticky;top:0;z-index:2;margin:0 0 30px;padding:27px 0 17px;border-bottom:1px solid #ded4c3;background:rgba(255,254,250,.96);backdrop-filter:blur(8px)}.chapter-heading>span{color:#a47022;font-weight:700}.chapter-heading h2{margin:5px 0 11px;color:#244744;font-size:clamp(26px,3vw,42px)}.chapter-heading div{display:flex;flex-wrap:wrap;gap:7px}.chapter-heading small{border-radius:999px;background:#edf1ec;padding:4px 8px;color:#67716c}.chapter-text{margin:0;white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word;color:#292d2b;font:17px/2 "Noto Serif SC","Songti SC",serif}.evidence{display:grid;gap:6px;margin-top:44px;border-top:1px solid #ded4c3;padding-top:18px;color:#777;font:12px/1.6 system-ui;overflow-wrap:anywhere}.empty{padding:14px;color:#868077;text-align:center;font-size:12px}.error{position:sticky;bottom:14px;border-radius:8px;background:#ffe5dd;padding:10px;color:#8e2f22}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}@media(max-width:820px){.corpus-reader{height:auto;min-height:calc(100vh - 180px);padding:18px 12px 30px}.corpus-intro{align-items:start;flex-direction:column}.reader-shell{display:block;height:auto}.library-tree{height:min(60vh,560px);border-right:0;border-bottom:1px solid #d9cfbd}.text-pane{box-sizing:border-box;min-height:70vh;height:auto;padding:0 18px 44px}.chapter-heading{position:static}.chapter-text{font-size:16px}}
.tree-scroll{overflow-y:scroll;overscroll-behavior:contain;scrollbar-gutter:stable;padding-right:8px;scrollbar-width:thin;scrollbar-color:#9f927c #e9e1d4}
.tree-scroll::-webkit-scrollbar{width:10px}
.tree-scroll::-webkit-scrollbar-track{border-left:1px solid #ddd2c0;background:#e9e1d4}
.tree-scroll::-webkit-scrollbar-thumb{border:2px solid #e9e1d4;border-radius:999px;background:#9f927c}
.tree-scroll::-webkit-scrollbar-thumb:hover{background:#756a58}
@media(min-width:821px){
  .reader-shell,.library-tree{min-height:0}
  .library-tree{height:100%;overflow:hidden}
  .tree-scroll{height:100%;min-height:0;overflow-y:scroll}
}
</style>
