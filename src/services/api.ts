import type { ApiErrorBody, AuthTokens, AuthUser, DeviceType, SecurityAnswerInput, SecurityQuestion } from '../types/auth';
import pcEnvironment from '../../config/pc.env.json';

const API_BASE = pcEnvironment.api.basePath.replace(/\/$/, '');
const ACCESS_KEY = 'springgis.access_token';

function getStoredAccessToken(): string | null {
  return sessionStorage.getItem(ACCESS_KEY);
}

export function storeTokens(tokens: AuthTokens): void {
  sessionStorage.setItem(ACCESS_KEY, tokens.access_token);
}

export function clearTokens(): void {
  sessionStorage.removeItem(ACCESS_KEY);
}

function clientType(device: DeviceType): 'web' | 'mobile_web' {
  return device === 'mobile' || device === 'tablet' ? 'mobile_web' : 'web';
}

async function readError(response: Response): Promise<string> {
  const fallback = `请求失败 (${response.status})`;
  try {
    const body = (await response.json()) as ApiErrorBody;
    if (typeof body.detail === 'string') return body.detail;
    if (Array.isArray(body.detail)) return body.detail.map((item) => item.msg).join('；');
    return fallback;
  } catch {
    return fallback;
  }
}

async function jsonRequest<T>(path: string, init: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...init.headers }
  });
  if (!response.ok) throw new Error(await readError(response));
  return (await response.json()) as T;
}

async function authorizedRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  let accessToken = getStoredAccessToken();
  if (!accessToken) accessToken = (await refresh())?.access_token ?? null;
  if (!accessToken) throw new Error('登录已失效，请重新登录');

  const send = (token: string) => fetch(`${API_BASE}${path}`, {
    ...init,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...init.headers,
      Authorization: `Bearer ${token}`
    }
  });
  let response = await send(accessToken);
  if (response.status === 401) {
    const tokens = await refresh();
    if (!tokens) throw new Error('登录已失效，请重新登录');
    response = await send(tokens.access_token);
  }
  if (!response.ok) throw new Error(await readError(response));
  return (await response.json()) as T;
}

export async function register(
  username: string,
  password: string,
  device: DeviceType,
  securityAnswers: SecurityAnswerInput[]
): Promise<AuthTokens> {
  const tokens = await jsonRequest<AuthTokens>('/users/register', {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
      client_type: clientType(device),
      terms_accepted: true,
      privacy_accepted: true,
      age_requirement_confirmed: true,
      security_answers: securityAnswers
    })
  });
  storeTokens(tokens);
  return tokens;
}

export async function login(
  username: string,
  password: string,
  device: DeviceType
): Promise<AuthTokens> {
  const tokens = await jsonRequest<AuthTokens>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password, client_type: clientType(device) })
  });
  storeTokens(tokens);
  return tokens;
}

async function refresh(): Promise<AuthTokens | null> {
  try {
    const tokens = await jsonRequest<AuthTokens>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({})
    });
    storeTokens(tokens);
    return tokens;
  } catch {
    clearTokens();
    return null;
  }
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  let accessToken = getStoredAccessToken();
  if (!accessToken) {
    const tokens = await refresh();
    accessToken = tokens?.access_token ?? null;
  }
  if (!accessToken) return null;

  let response = await fetch(`${API_BASE}/users/me`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  if (response.status === 401) {
    const tokens = await refresh();
    if (!tokens) return null;
    response = await fetch(`${API_BASE}/users/me`, {
      headers: { Authorization: `Bearer ${tokens.access_token}` }
    });
  }
  if (!response.ok) throw new Error(await readError(response));
  return (await response.json()) as AuthUser;
}

export async function logout(): Promise<void> {
  const accessToken = getStoredAccessToken();
  try {
    await jsonRequest('/auth/logout', {
      method: 'POST',
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
      body: JSON.stringify({})
    });
  } finally {
    clearTokens();
  }
}

export interface TerminalInfo {
  terminal_uuid: string;
  system_name: string;
  display_name: string | null;
  status: number;
  key_version: number;
  bound_at: string;
}

export interface AuthorizationCode {
  request_id: string;
  code: string;
  purpose: 'terminal_bind' | 'terminal_migrate';
  expires_at: string;
  expires_in_seconds: number;
}

export function listTerminals(): Promise<TerminalInfo[]> {
  return authorizedRequest('/terminals', { method: 'GET' });
}

export function createTerminalAuthorizationCode(
  purpose: 'terminal_bind' | 'terminal_migrate',
  currentPassword: string,
  securityAnswers?: SecurityAnswerInput[],
  terminalUuid?: string
): Promise<AuthorizationCode> {
  return authorizedRequest('/terminals/authorization-codes', {
    method: 'POST',
    body: JSON.stringify({
      purpose,
      terminal_uuid: terminalUuid ?? null,
      current_password: currentPassword,
      security_answers: securityAnswers ?? null
    })
  });
}

export type TerminalRevokePayload =
  | { method: 'password_security'; current_password: string; security_answers: SecurityAnswerInput[] }
  | { method: 'terminal_authorization_code' | 'terminal_verification_code'; code: string };

export function revokeTerminal(terminalUuid: string, payload: TerminalRevokePayload): Promise<{ message: string }> {
  return authorizedRequest(`/terminals/${encodeURIComponent(terminalUuid)}/revoke`, {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export async function consumeQuickLogin(username: string, code: string, clientName = 'PC 浏览器'): Promise<AuthTokens> {
  const tokens = await jsonRequest<AuthTokens>('/auth/quick/consume', {
    method: 'POST',
    body: JSON.stringify({ username, code, client_name: clientName })
  });
  storeTokens(tokens);
  return tokens;
}

export function getSecurityQuestions(): Promise<SecurityQuestion[]> {
  return jsonRequest('/users/security-questions', { method: 'GET' });
}

export function getMySecurityQuestions(): Promise<SecurityQuestion[]> {
  return authorizedRequest('/users/me/security-questions', { method: 'GET' });
}

export function setupSecurityQuestions(currentPassword: string, securityAnswers: SecurityAnswerInput[]): Promise<{ message: string }> {
  return authorizedRequest('/users/me/security-questions', {
    method: 'POST',
    body: JSON.stringify({ current_password: currentPassword, security_answers: securityAnswers })
  });
}

