import { onBeforeUnmount, onMounted, readonly, ref } from 'vue';
import type { DeviceType } from '../types/auth';

const deviceType = ref<DeviceType>('desktop');

function detectDeviceType(): DeviceType {
  if (typeof window === 'undefined') return 'desktop';

  const width = window.innerWidth;
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const userAgent = navigator.userAgent.toLowerCase();
  const mobileAgent = /android|iphone|ipod|mobile|windows phone/.test(userAgent);
  const tabletAgent = /ipad|tablet/.test(userAgent);

  if (tabletAgent || (coarsePointer && width >= 768 && width < 1024)) return 'tablet';
  if (mobileAgent || (coarsePointer && width < 768)) return 'mobile';
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

export function useDeviceType() {
  const update = () => {
    deviceType.value = detectDeviceType();
  };

  onMounted(() => {
    update();
    window.addEventListener('resize', update, { passive: true });
  });
  onBeforeUnmount(() => window.removeEventListener('resize', update));

  return { deviceType: readonly(deviceType) };
}

