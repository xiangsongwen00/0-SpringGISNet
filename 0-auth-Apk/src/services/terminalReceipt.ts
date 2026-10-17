import type { TerminalInfo } from './api';

const STORAGE_KEY = 'springgis.terminal.receipts.v1';

export interface TerminalReceipt {
  version: 1;
  userUuid: string;
  terminalUuid: string;
  systemName: string;
  publicKeyFingerprint: string;
  boundAt: string;
  verifiedAt: string;
}

function loadAll(): Record<string, TerminalReceipt> {
  try {
    const value = uni.getStorageSync(STORAGE_KEY) as Record<string, TerminalReceipt> | null;
    return value && typeof value === 'object' ? value : {};
  } catch {
    return {};
  }
}

export function fingerprintPublicKey(publicKey: string): string {
  // This is a local identity hint, not a security signature. The actual
  // binding is still verified by the Android Keystore challenge on server.
  let hash = 2166136261;
  for (let index = 0; index < publicKey.length; index += 1) {
    hash ^= publicKey.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

export function getTerminalReceipt(userUuid: string): TerminalReceipt | null {
  const receipt = loadAll()[userUuid];
  return receipt?.version === 1 ? receipt : null;
}

export function saveTerminalReceipt(userUuid: string, publicKey: string, terminal: TerminalInfo): TerminalReceipt {
  const receipts = loadAll();
  const receipt: TerminalReceipt = {
    version: 1,
    userUuid,
    terminalUuid: terminal.terminal_uuid,
    systemName: terminal.system_name,
    publicKeyFingerprint: fingerprintPublicKey(publicKey),
    boundAt: terminal.bound_at,
    verifiedAt: new Date().toISOString(),
  };
  receipts[userUuid] = receipt;
  uni.setStorageSync(STORAGE_KEY, receipts);
  return receipt;
}

export function hasMatchingTerminalReceipt(userUuid: string, publicKey: string): boolean {
  const receipt = getTerminalReceipt(userUuid);
  return Boolean(receipt && receipt.publicKeyFingerprint === fingerprintPublicKey(publicKey));
}

export function removeTerminalReceipt(userUuid: string): void {
  const receipts = loadAll();
  delete receipts[userUuid];
  uni.setStorageSync(STORAGE_KEY, receipts);
}
