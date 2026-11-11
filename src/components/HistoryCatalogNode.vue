<template>
  <details
    class="catalog-tree-node"
    :class="{ root: depth === 0 }"
    :open="depth === 0 || forceOpen || containsActive"
  >
    <summary>
      <span class="folder-chevron" aria-hidden="true"></span>
      <span class="folder-name">{{ node.name }}</span>
      <span class="folder-count">{{ node.count }}</span>
    </summary>

    <div class="folder-contents">
      <HistoryCatalogNode
        v-for="child in node.children"
        :key="child.key"
        :node="child"
        :active-article-id="activeArticleId"
        :depth="depth + 1"
        :force-open="forceOpen"
        @select="$emit('select', $event)"
      />
      <button
        v-for="article in node.articles"
        :key="article.article_id"
        class="catalog-article"
        :class="{ selected: article.article_id === activeArticleId }"
        type="button"
        @click="$emit('select', article)"
      >
        {{ article.title }}
      </button>
    </div>
  </details>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { HistoryArticleSummary } from '../services/api';
import type { HistoryCatalogNode } from '../types/historyCatalog';

defineOptions({ name: 'HistoryCatalogNode' });

const props = withDefaults(defineProps<{
  node: HistoryCatalogNode;
  activeArticleId?: string;
  depth?: number;
  forceOpen?: boolean;
}>(), {
  activeArticleId: '',
  depth: 0,
  forceOpen: false
});

defineEmits<{ select: [article: HistoryArticleSummary] }>();

const containsActive = computed(() => {
  const hasArticle = (node: HistoryCatalogNode): boolean =>
    node.articles.some((article) => article.article_id === props.activeArticleId)
    || node.children.some(hasArticle);
  return hasArticle(props.node);
});
</script>

<style scoped>
.catalog-tree-node{margin:3px 0}.catalog-tree-node>summary{display:grid;grid-template-columns:16px minmax(0,1fr) auto;align-items:center;gap:7px;border-radius:7px;padding:7px 8px;color:#47504d;cursor:pointer;list-style:none;font:600 12px/1.45 system-ui}.catalog-tree-node>summary::-webkit-details-marker{display:none}.catalog-tree-node>summary:hover{background:#f4efe5;color:#0e6468}.catalog-tree-node.root{margin:0 0 9px;border:1px solid #d7cbb8;border-radius:11px;background:#fffdf8;overflow:hidden}.catalog-tree-node.root>summary{border-radius:0;padding:12px 11px;color:#244744;font-size:14px}.catalog-tree-node.root[open]>summary{border-bottom:1px solid #e2d8c8;background:#f9f3e7}.folder-chevron{width:7px;height:7px;border-right:1.5px solid currentColor;border-bottom:1.5px solid currentColor;transform:rotate(-45deg);transition:transform .15s ease}.catalog-tree-node[open]>summary>.folder-chevron{transform:rotate(45deg) translate(-2px,-2px)}.folder-name{overflow:hidden;text-overflow:ellipsis}.folder-count{border-radius:999px;background:#e6eee9;padding:2px 6px;color:#536762;font:600 10px/1.3 system-ui}.folder-contents{margin-left:13px;border-left:1px solid #ded3c2;padding:3px 5px 5px 7px}.root>.folder-contents{margin-left:18px;padding-top:6px}.catalog-article{display:block;width:100%;border:0;border-radius:7px;background:transparent;padding:7px 8px 7px 13px;text-align:left;color:#3e4542;cursor:pointer;font:13px/1.5 "Noto Serif SC","Songti SC",serif}.catalog-article:hover{background:#f2eee5;color:#0e6468}.catalog-article.selected{background:#dcece8;color:#0d5c60;font-weight:700;box-shadow:inset 3px 0 #178087}
</style>
