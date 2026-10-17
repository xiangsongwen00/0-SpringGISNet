import { uploadLocationPoints, type LocationInterval, type LocationPoint } from './api';

export interface LocationTrackerState {
  running: boolean;
  lastPoint: LocationPoint | null;
  lastCapturedAt: string | null;
  lastUploadedAt: string | null;
  pendingCount: number;
  fixAgeMs: number | null;
  coordinatesType: string;
  error: string;
}

type Listener = (state: LocationTrackerState) => void;

interface NativePosition {
  coords?: {
    longitude?: number;
    latitude?: number;
    altitude?: number;
    accuracy?: number;
    speed?: number;
    heading?: number;
  };
  timestamp?: number;
  coordsType?: string;
}

interface PersistedLocationQueue {
  version: 1;
  ownerUserUuid: string;
  pending: LocationPoint[];
  recent: LocationPoint[];
  lastUploadedAt: string | null;
}

// Sampling and uploading are deliberately decoupled. Even at the 1-second
// sampling option, the API receives at most one normal batch every five
// minutes instead of one transaction per location fix.
const MAX_PENDING_POINTS = 5000;
const MAX_RECENT_POINTS = 3;
const UPLOAD_BATCH_SIZE = 1000;
const UPLOAD_INTERVAL_MS = 5 * 60 * 1000;

function finite(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function radians(value: number): number { return value * Math.PI / 180; }

function distanceMeters(left: LocationPoint, right: LocationPoint): number {
  const radius = 6371008.8;
  const latitudeDelta = radians(right.latitude - left.latitude);
  const longitudeDelta = radians(right.longitude - left.longitude);
  const a = Math.sin(latitudeDelta / 2) ** 2
    + Math.cos(radians(left.latitude)) * Math.cos(radians(right.latitude)) * Math.sin(longitudeDelta / 2) ** 2;
  return radius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(Math.max(0, 1 - a)));
}

function bearingDegrees(left: LocationPoint, right: LocationPoint): number {
  const leftLatitude = radians(left.latitude);
  const rightLatitude = radians(right.latitude);
  const longitudeDelta = radians(right.longitude - left.longitude);
  const y = Math.sin(longitudeDelta) * Math.cos(rightLatitude);
  const x = Math.cos(leftLatitude) * Math.sin(rightLatitude)
    - Math.sin(leftLatitude) * Math.cos(rightLatitude) * Math.cos(longitudeDelta);
  return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
}

export class LocationTracker {
  private timer: ReturnType<typeof setTimeout> | null = null;
  private uploadTimer: ReturnType<typeof setInterval> | null = null;
  private watchId: number | null = null;
  private running = false;
  private uploadInFlight = false;
  private pending: LocationPoint[] = [];
  private recent: LocationPoint[] = [];
  private lastAcceptedAt = 0;
  private state: LocationTrackerState = {
    running: false,
    lastPoint: null,
    lastCapturedAt: null,
    lastUploadedAt: null,
    pendingCount: 0,
    fixAgeMs: null,
    coordinatesType: 'wgs84',
    error: '',
  };

  constructor(
    private accessToken: string,
    private interval: LocationInterval,
    private readonly ownerUserUuid: string,
    private readonly listener: Listener,
  ) {
    this.restore();
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.emit({ running: true, error: '' });
    this.startPositionStream();
    this.startUploadSchedule();
    // Recover one batch left by an earlier offline/app session immediately.
    // Freshly sampled points are uploaded by the five-minute schedule.
    void this.flushQueue();
  }

  stop(): void {
    this.running = false;
    this.stopPositionStream();
    this.stopUploadSchedule();
    this.persist();
    this.emit({ running: false });
    // Best effort final delivery when the user explicitly stops tracking or
    // the foreground-only tracker is paused. Failure remains in local storage.
    void this.flushQueue();
  }

  setInterval(interval: LocationInterval): void {
    if (this.interval === interval) return;
    this.interval = interval;
    if (this.running) {
      this.stopPositionStream();
      this.startPositionStream();
    }
  }

  setAccessToken(accessToken: string): void {
    this.accessToken = accessToken;
  }

  private get storageKey(): string {
    return `springgis.location.queue.v2.${this.ownerUserUuid.replace(/[^A-Za-z0-9_-]/g, '_')}`;
  }

  private startPositionStream(): void {
    // #ifdef APP-PLUS
    this.watchId = plus.geolocation.watchPosition(
      (position) => this.acceptNativePosition(position as NativePosition),
      (reason) => this.emit({ error: `持续定位失败：${reason.message || reason.code || '未知错误'}` }),
      {
        provider: 'system',
        coordsType: 'wgs84',
        enableHighAccuracy: true,
        maximumAge: this.interval * 1000,
        timeout: 15000,
        geocode: false,
      },
    );
    // #endif

    // #ifndef APP-PLUS
    void this.captureFallback();
    // #endif
  }

  private stopPositionStream(): void {
    if (this.timer !== null) clearTimeout(this.timer);
    this.timer = null;
    // #ifdef APP-PLUS
    if (this.watchId !== null) plus.geolocation.clearWatch(this.watchId);
    // #endif
    this.watchId = null;
  }

  private acceptNativePosition(position: NativePosition): void {
    const coords = position.coords;
    if (!coords || !finite(coords.longitude) || !finite(coords.latitude)) {
      this.emit({ error: '定位回调缺少有效经纬度' });
      return;
    }
    const callbackAt = Date.now();
    const fixAt = finite(position.timestamp) && position.timestamp > 0 ? position.timestamp : callbackAt;
    const fixAge = Math.max(0, callbackAt - fixAt);
    const maximumFixAge = Math.max(30000, this.interval * 3000);
    if (fixAge > maximumFixAge) {
      this.emit({ error: `已忽略 ${Math.round(fixAge / 1000)} 秒前的定位缓存` });
      return;
    }
    this.acceptPoint({
      longitude: coords.longitude,
      latitude: coords.latitude,
      altitude: finite(coords.altitude) ? coords.altitude : undefined,
      accuracy: finite(coords.accuracy) ? coords.accuracy : undefined,
      speed: finite(coords.speed) && coords.speed >= 0 ? coords.speed : undefined,
      heading: finite(coords.heading) && coords.heading >= 0 ? coords.heading : undefined,
      recorded_at: new Date(fixAt).toISOString(),
    }, callbackAt, { fixAgeMs: fixAge, coordinatesType: position.coordsType || 'wgs84' });
  }

  private acceptPoint(
    point: LocationPoint,
    receivedAt = Date.now(),
    diagnostics: { fixAgeMs: number; coordinatesType: string } = { fixAgeMs: 0, coordinatesType: 'wgs84' },
  ): void {
    if (!this.running) return;
    if (this.lastAcceptedAt && receivedAt - this.lastAcceptedAt < Math.max(500, this.interval * 800)) return;
    this.lastAcceptedAt = receivedAt;

    const candidates = [...this.recent.slice(-(MAX_RECENT_POINTS - 1)), point];
    const first = candidates[0];
    const last = candidates[candidates.length - 1];
    if (first && last && first !== last) {
      const accuracy = Math.max(0, Math.min(80, ((first.accuracy || 0) + (last.accuracy || 0)) / 2));
      const movementThreshold = Math.max(3, Math.min(20, accuracy * 0.25));
      if (distanceMeters(first, last) >= movementThreshold) point.heading = bearingDegrees(first, last);
      else if (finite(this.recent[this.recent.length - 1]?.heading)) point.heading = this.recent[this.recent.length - 1]!.heading;
    }
    if (!finite(point.heading)) point.heading = 0;

    this.recent = [...this.recent, point].slice(-MAX_RECENT_POINTS);
    this.pending = [...this.pending, point].slice(-MAX_PENDING_POINTS);
    this.persist();
    // Local display is updated before any network request. Upload latency or
    // failure must never freeze the device's own position marker.
    this.emit({
      lastPoint: point,
      lastCapturedAt: new Date(receivedAt).toISOString(),
      pendingCount: this.pending.length,
      fixAgeMs: diagnostics.fixAgeMs,
      coordinatesType: diagnostics.coordinatesType,
      error: '',
    });
  }

  private startUploadSchedule(): void {
    this.stopUploadSchedule();
    this.uploadTimer = setInterval(() => void this.flushQueue(), UPLOAD_INTERVAL_MS);
  }

  private stopUploadSchedule(): void {
    if (this.uploadTimer !== null) clearInterval(this.uploadTimer);
    this.uploadTimer = null;
  }

  private async captureFallback(): Promise<void> {
    if (!this.running) return;
    try {
      const point = await new Promise<LocationPoint>((resolve, reject) => {
        uni.getLocation({
          type: 'wgs84',
          altitude: true,
          isHighAccuracy: true,
          highAccuracyExpireTime: 10000,
          success(result) {
            const extended = result as typeof result & { direction?: number };
            resolve({
              longitude: result.longitude,
              latitude: result.latitude,
              altitude: finite(result.altitude) ? result.altitude : undefined,
              accuracy: finite(result.accuracy) ? result.accuracy : undefined,
              speed: finite(result.speed) && result.speed >= 0 ? result.speed : undefined,
              heading: finite(extended.direction) && extended.direction >= 0 ? extended.direction : undefined,
              recorded_at: new Date().toISOString(),
            });
          },
          fail(reason) { reject(new Error(reason.errMsg || '无法读取定位')); },
        });
      });
      this.acceptPoint(point);
    } catch (reason) {
      this.emit({ error: reason instanceof Error ? reason.message : '无法读取定位' });
    } finally {
      if (this.running) this.timer = setTimeout(() => void this.captureFallback(), this.interval * 1000);
    }
  }

  private async flushQueue(): Promise<void> {
    if (this.uploadInFlight || !this.pending.length) return;
    this.uploadInFlight = true;
    const batch = this.pending.slice(0, UPLOAD_BATCH_SIZE);
    try {
      await uploadLocationPoints(this.accessToken, batch);
      this.pending.splice(0, batch.length);
      const uploadedAt = new Date().toISOString();
      this.emit({ lastUploadedAt: uploadedAt, pendingCount: this.pending.length, error: '' });
      this.persist();
    } catch (reason) {
      this.emit({
        pendingCount: this.pending.length,
        error: `${reason instanceof Error ? reason.message : '位置上传失败'}；已保存在本机等待补传`,
      });
    } finally {
      this.uploadInFlight = false;
    }
  }

  private restore(): void {
    try {
      const stored = uni.getStorageSync(this.storageKey) as PersistedLocationQueue | null;
      if (!stored || stored.version !== 1 || stored.ownerUserUuid !== this.ownerUserUuid) return;
      this.pending = Array.isArray(stored.pending) ? stored.pending.slice(-MAX_PENDING_POINTS) : [];
      this.recent = Array.isArray(stored.recent) ? stored.recent.slice(-MAX_RECENT_POINTS) : [];
      const lastPoint = this.recent[this.recent.length - 1] || null;
      this.state = {
        ...this.state,
        lastPoint,
        lastCapturedAt: lastPoint?.recorded_at || null,
        lastUploadedAt: stored.lastUploadedAt || null,
        pendingCount: this.pending.length,
        fixAgeMs: null,
        coordinatesType: 'wgs84',
      };
    } catch (reason) {
      console.info('[location-cache] 无法读取本地定位队列', reason);
    }
  }

  private persist(): void {
    try {
      const value: PersistedLocationQueue = {
        version: 1,
        ownerUserUuid: this.ownerUserUuid,
        pending: this.pending,
        recent: this.recent,
        lastUploadedAt: this.state.lastUploadedAt,
      };
      uni.setStorageSync(this.storageKey, value);
    } catch (reason) {
      console.info('[location-cache] 无法保存本地定位队列', reason);
    }
  }

  private emit(patch: Partial<LocationTrackerState>): void {
    this.state = { ...this.state, ...patch };
    this.listener({ ...this.state });
  }
}
