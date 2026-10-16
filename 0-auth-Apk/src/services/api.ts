import apkEnvironment from '../../config/apk.env.json';

let configuredApiBase = apkEnvironment.api.androidBaseUrl;

// #ifdef H5
configuredApiBase = apkEnvironment.api.h5BaseUrl;
// #endif

const API_BASE = configuredApiBase.replace(/\/$/, '');

export class ApiError extends Error {
  constructor(message: string, readonly statusCode: number) {
    super(message);
    this.name = 'ApiError';
  }
}

export interface AuthUser { user_uuid: string; username: string; created_at: string }
export interface AuthSession { access_token: string; refresh_token: string | null; expires_in: number; user: AuthUser }
export interface QuickCode { request_id: string; code: string; expires_at: string; refresh_after_seconds: number }
export interface TerminalAuthorizationCode { request_id: string; code: string; purpose: string; expires_at: string; expires_in_seconds: number }
export interface SecurityQuestion { id: string; prompt: string }
export interface SecurityAnswerInput { question_id: string; answer: string }
export interface RevokeCode { request_id: string; code: string; purpose: string; expires_at: string; expires_in_seconds: number }
interface TerminalBindChallenge { challenge_id: string; nonce: string; expires_at: string }
export interface TerminalInfo {
  terminal_uuid: string;
  system_name: string;
  display_name: string | null;
  status: number;
  key_version: number;
  bound_at: string;
}

function request<T>(path: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data?: object, token?: string): Promise<T> {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${API_BASE}${path}`,
      method,
      data,
      timeout: apkEnvironment.api.requestTimeoutMs,
      header: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      success(response) {
        if (response.statusCode >= 200 && response.statusCode < 300) { resolve(response.data as T); return; }
        const body = response.data as { detail?: string | Array<{ msg?: string }> } | undefined;
        const rawDetail = body?.detail;
        const detail = typeof rawDetail === 'string'
          ? rawDetail
          : Array.isArray(rawDetail)
            ? rawDetail.map((item) => item.msg).filter(Boolean).join('；')
            : '';
        reject(new ApiError(detail || `请求失败 (${response.statusCode})`, response.statusCode));
      },
      fail(reason) { reject(new ApiError(reason.errMsg || '无法连接认证服务器', 0)); }
    });
  });
}

export function login(username: string, password: string): Promise<AuthSession> {
  return request('/auth/login', 'POST', { username, password, client_type: 'auth_apk' });
}

export function register(
  username: string,
  password: string,
  securityAnswers: SecurityAnswerInput[],
): Promise<AuthSession> {
  return request('/users/register', 'POST', {
    username,
    password,
    client_type: 'auth_apk',
    terms_accepted: true,
    privacy_accepted: true,
    age_requirement_confirmed: true,
    security_answers: securityAnswers,
  });
}

export function refreshLogin(refreshToken: string): Promise<AuthSession> {
  return request('/auth/refresh', 'POST', { refresh_token: refreshToken });
}

export function logout(refreshToken: string): Promise<{ message: string }> {
  return request('/auth/logout', 'POST', { refresh_token: refreshToken });
}

export function startTerminalBinding(accessToken: string, publicKey: string, authorizationCode: string): Promise<TerminalBindChallenge> {
  return request('/terminals/bind/start', 'POST', { public_key: publicKey, authorization_code: authorizationCode }, accessToken);
}

export function confirmTerminalBinding(
  accessToken: string,
  challengeId: string,
  nonce: string,
  signature: string,
): Promise<TerminalInfo> {
  return request(
    '/terminals/bind/confirm',
    'POST',
    { challenge_id: challengeId, nonce, signature },
    accessToken,
  );
}

export function startTerminalSession(accessToken: string, publicKey: string): Promise<TerminalBindChallenge> {
  return request('/terminals/session/start', 'POST', { public_key: publicKey }, accessToken);
}

export function confirmTerminalSession(
  accessToken: string,
  challengeId: string,
  nonce: string,
  signature: string,
): Promise<TerminalInfo> {
  return request('/terminals/session/confirm', 'POST', { challenge_id: challengeId, nonce, signature }, accessToken);
}

export function createQuickCode(accessToken: string): Promise<QuickCode> {
  return request('/auth/quick/start', 'POST', {}, accessToken);
}

export function getMySecurityQuestions(accessToken: string): Promise<SecurityQuestion[]> {
  return request('/users/me/security-questions', 'GET', undefined, accessToken);
}

export function createMigrationAuthorizationCode(
  accessToken: string,
  currentPassword: string,
  securityAnswers: SecurityAnswerInput[],
): Promise<TerminalAuthorizationCode> {
  return request('/terminals/authorization-codes', 'POST', {
    purpose: 'terminal_migrate',
    current_password: currentPassword,
    security_answers: securityAnswers,
  }, accessToken);
}

export function getCurrentTerminal(accessToken: string): Promise<TerminalInfo> {
  return request('/terminals/current', 'GET', undefined, accessToken);
}

export function createTerminalRevokeCode(
  accessToken: string,
  codeType: 'authorization_code' | 'verification_code',
): Promise<RevokeCode> {
  return request('/terminals/revoke-codes', 'POST', { code_type: codeType }, accessToken);
}

export const LOCATION_INTERVALS = [1, 2, 5, 10, 30, 60] as const;
export type LocationInterval = typeof LOCATION_INTERVALS[number];
export interface LocationPoint {
  longitude: number;
  latitude: number;
  altitude?: number;
  accuracy?: number;
  speed?: number;
  heading?: number;
  recorded_at: string;
}
export interface LocationSetting {
  write_interval_seconds: LocationInterval;
  tracking_enabled: boolean;
  allowed_intervals: LocationInterval[];
}
export interface CurrentLocation extends LocationPoint {
  received_at: string;
  source: string;
}

export interface TrackSegment {
  segment_id: string;
  frequency_seconds: number;
  started_at: string;
  ended_at: string;
  point_count: number;
  points: LocationPoint[];
}

export interface TrackHistory {
  owner_user_uuid: string;
  owner_username: string;
  from_time: string;
  to_time: string;
  segments: TrackSegment[];
}

export function getLocationSetting(accessToken: string): Promise<LocationSetting> {
  return request('/locations/settings', 'GET', undefined, accessToken);
}

export function updateLocationSetting(
  accessToken: string,
  writeIntervalSeconds: LocationInterval,
  trackingEnabled: boolean,
): Promise<LocationSetting> {
  return request('/locations/settings', 'PUT', {
    write_interval_seconds: writeIntervalSeconds,
    tracking_enabled: trackingEnabled,
  }, accessToken);
}

export function uploadLocationPoints(accessToken: string, points: LocationPoint[]): Promise<{ accepted: number; current_recorded_at: string }> {
  return request('/locations/points', 'POST', { points }, accessToken);
}

export function getMyCurrentLocation(accessToken: string): Promise<CurrentLocation> {
  return request('/locations/me/current', 'GET', undefined, accessToken);
}

export function getMyTrackHistory(accessToken: string, from: Date, to: Date): Promise<TrackHistory> {
  const query = `from=${encodeURIComponent(from.toISOString())}&to=${encodeURIComponent(to.toISOString())}`;
  return request(`/locations/me/history?${query}`, 'GET', undefined, accessToken);
}
