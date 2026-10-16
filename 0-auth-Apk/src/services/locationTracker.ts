import { uploadLocationPoints, type LocationInterval, type LocationPoint } from './api';

export interface LocationTrackerState {
  running: boolean;
  lastPoint: LocationPoint | null;
  lastUploadedAt: string | null;
  error: string;
}

type Listener = (state: LocationTrackerState) => void;

export class LocationTracker {
  private timer: ReturnType<typeof setTimeout> | null = null;
  private running = false;
  private inFlight = false;
  private state: LocationTrackerState = { running: false, lastPoint: null, lastUploadedAt: null, error: '' };

  constructor(
    private accessToken: string,
    private interval: LocationInterval,
    private readonly listener: Listener,
  ) {}

  start(): void {
    if (this.running) return;
    this.running = true;
    this.emit({ running: true, error: '' });
    void this.capture();
  }

  stop(): void {
    this.running = false;
    if (this.timer !== null) clearTimeout(this.timer);
    this.timer = null;
    this.emit({ running: false });
  }

  setInterval(interval: LocationInterval): void {
    this.interval = interval;
    if (this.running) {
      if (this.timer !== null) clearTimeout(this.timer);
      this.schedule();
    }
  }

  setAccessToken(accessToken: string): void {
    this.accessToken = accessToken;
  }

  private schedule(): void {
    if (!this.running) return;
    this.timer = setTimeout(() => void this.capture(), this.interval * 1000);
  }

  private async capture(): Promise<void> {
    if (!this.running || this.inFlight) return;
    this.inFlight = true;
    try {
      const point = await new Promise<LocationPoint>((resolve, reject) => {
        uni.getLocation({
          type: 'wgs84',
          altitude: true,
          isHighAccuracy: true,
          highAccuracyExpireTime: Math.max(3000, this.interval * 1000),
          success(result) {
            const extended = result as typeof result & { direction?: number };
            resolve({
              longitude: result.longitude,
              latitude: result.latitude,
              altitude: Number.isFinite(result.altitude) ? result.altitude : undefined,
              accuracy: Number.isFinite(result.accuracy) ? result.accuracy : undefined,
              speed: Number.isFinite(result.speed) && result.speed >= 0 ? result.speed : undefined,
              heading: Number.isFinite(extended.direction) && (extended.direction ?? -1) >= 0 ? extended.direction : undefined,
              recorded_at: new Date().toISOString(),
            });
          },
          fail(reason) { reject(new Error(reason.errMsg || '无法读取定位')); },
        });
      });
      await uploadLocationPoints(this.accessToken, [point]);
      this.emit({ lastPoint: point, lastUploadedAt: new Date().toISOString(), error: '' });
    } catch (reason) {
      this.emit({ error: reason instanceof Error ? reason.message : '位置上传失败' });
    } finally {
      this.inFlight = false;
      this.schedule();
    }
  }

  private emit(patch: Partial<LocationTrackerState>): void {
    this.state = { ...this.state, ...patch };
    this.listener(this.state);
  }
}
