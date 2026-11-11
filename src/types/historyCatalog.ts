import type { HistoryArticleSummary } from '../services/api';

export interface HistoryCatalogNode {
  key: string;
  name: string;
  count: number;
  children: HistoryCatalogNode[];
  articles: HistoryArticleSummary[];
}
