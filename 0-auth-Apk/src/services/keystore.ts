// #ifdef APP-PLUS
import { ensureKeyPair, signPayload as signNativePayload } from '@/uni_modules/springgis-keystore';
// #endif

export interface NativeKeyDiagnostics {
  appBuild: boolean;
  platform: string;
  system: string;
  available: boolean;
}

export type NativeKeyLog = (message: string) => void;

/**
 * 普通 uni-app 的 TypeScript 代码只能用 APP-PLUS 判断 App 构建。
 * Android/iOS 的差异在运行时判断；APP-ANDROID 仅能用于 UTS 文件。
 */
export function getNativeKeyDiagnostics(): NativeKeyDiagnostics {
  let appBuild = false;

  // #ifdef APP-PLUS
  appBuild = true;
  // #endif

  let platform = 'unknown';
  let system = 'unknown';
  try {
    const info = uni.getSystemInfoSync();
    platform = String(info.platform || 'unknown').toLowerCase();
    system = String(info.system || 'unknown');
  } catch {
    // H5 或非标准运行环境可能无法提供完整的系统信息。
  }

  return {
    appBuild,
    platform,
    system,
    available: appBuild && platform === 'android',
  };
}

export function isNativeKeyAvailable(): boolean {
  return getNativeKeyDiagnostics().available;
}

export async function ensureTerminalKey(alias: string, log?: NativeKeyLog): Promise<string> {
  const diagnostics = getNativeKeyDiagnostics();
  log?.(`运行环境：appBuild=${diagnostics.appBuild}，platform=${diagnostics.platform}，system=${diagnostics.system}`);

  if (!diagnostics.available) {
    throw new Error(
      diagnostics.appBuild
        ? `当前 App 运行于 ${diagnostics.platform}，无法使用 Android Keystore`
        : '当前不是 Android App 原生构建，无法使用 Android Keystore',
    );
  }

  // #ifdef APP-PLUS
  log?.('正在加载 Android Keystore UTS 模块');
  log?.('UTS 模块加载成功，正在生成或读取 P-256 密钥');
  const publicKey = ensureKeyPair(alias);
  if (!publicKey) {
    throw new Error('Android Keystore 未返回公钥');
  }
  log?.(`Keystore 公钥准备完成（长度 ${publicKey.length}，未输出公钥内容）`);
  return publicKey;
  // #endif

  // #ifndef APP-PLUS
  throw new Error('Android Keystore 仅在打包后的 Android App 中可用');
  // #endif
}

export function signTerminalPayload(alias: string, payload: string, log?: NativeKeyLog): string {
  const diagnostics = getNativeKeyDiagnostics();
  if (!diagnostics.available) {
    throw new Error('当前环境无法使用 Android Keystore 完成签名');
  }

  // #ifdef APP-PLUS
  log?.('正在使用 Keystore 私钥签署服务器挑战');
  const signature = signNativePayload(alias, payload);
  if (!signature) {
    throw new Error('Android Keystore 未返回签名');
  }
  log?.(`挑战签名完成（长度 ${signature.length}，未输出签名内容）`);
  return signature;
  // #endif

  // #ifndef APP-PLUS
  throw new Error('Android Keystore 仅在打包后的 Android App 中可用');
  // #endif
}
