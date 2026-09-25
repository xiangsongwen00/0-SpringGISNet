import { readonly, ref } from 'vue';
import * as api from '../services/api';
import type { AuthTokens, AuthUser, DeviceType, SecurityAnswerInput } from '../types/auth';

const user = ref<AuthUser | null>(null);
const ready = ref(false);
const busy = ref(false);

export function useAuth() {
  const restore = async () => {
    if (ready.value) return;
    try {
      user.value = await api.getCurrentUser();
    } catch {
      user.value = null;
    } finally {
      ready.value = true;
    }
  };

  const signIn = async (username: string, password: string, device: DeviceType) => {
    busy.value = true;
    try {
      const tokens = await api.login(username, password, device);
      user.value = tokens.user;
    } finally {
      busy.value = false;
    }
  };

  const signUp = async (username: string, password: string, device: DeviceType, securityAnswers: SecurityAnswerInput[]) => {
    busy.value = true;
    try {
      const tokens = await api.register(username, password, device, securityAnswers);
      user.value = tokens.user;
    } finally {
      busy.value = false;
    }
  };

  const signOut = async () => {
    busy.value = true;
    try {
      await api.logout();
      user.value = null;
    } finally {
      busy.value = false;
    }
  };

  const acceptTokens = (tokens: AuthTokens) => {
    api.storeTokens(tokens);
    user.value = tokens.user;
    ready.value = true;
  };

  return {
    user: readonly(user),
    ready: readonly(ready),
    busy: readonly(busy),
    restore,
    signIn,
    signUp,
    acceptTokens,
    signOut
  };
}

