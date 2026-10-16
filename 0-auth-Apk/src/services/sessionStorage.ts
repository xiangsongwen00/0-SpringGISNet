import type { AuthSession } from './api';

const STORAGE_KEY = 'springgis.auth.refresh.v1';

interface StoredRefreshSession {
  version: 1;
  refreshToken: string;
}

export function saveRefreshSession(session: AuthSession): void {
  if (!session.refresh_token) return;
  const stored: StoredRefreshSession = { version: 1, refreshToken: session.refresh_token };
  try {
    uni.setStorageSync(STORAGE_KEY, stored);
  } catch (reason) {
    console.info('[auth-storage] 无法保存免登录会话', reason);
  }
}

export function loadRefreshToken(): string | null {
  try {
    const value = uni.getStorageSync(STORAGE_KEY) as StoredRefreshSession | string | null;
    if (!value || typeof value !== 'object') return null;
    if (value.version !== 1 || typeof value.refreshToken !== 'string' || value.refreshToken.length < 32) return null;
    return value.refreshToken;
  } catch (reason) {
    console.info('[auth-storage] 无法读取免登录会话', reason);
    return null;
  }
}

export function clearRefreshSession(): void {
  try {
    uni.removeStorageSync(STORAGE_KEY);
  } catch (reason) {
    console.info('[auth-storage] 无法清除免登录会话', reason);
  }
}
