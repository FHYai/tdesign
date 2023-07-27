import { defineStore } from 'pinia';

import type { LockInfo } from '@/types/interface';

const LockState: LockInfo = {
  pwd: '',
  isLock: false,
};

export const useLockStore = defineStore('lock', {
  state: () => ({
    lockInfo: { ...LockState },
  }),
  getters: {
    getLockInfo(state) {
      return state.lockInfo;
    },
  },
  actions: {
    setLockInfo(info: LockInfo) {
      this.lockInfo = { ...this.lockInfo, ...info };
    },
    resetLockInfo() {
      this.lockInfo = null;
    },
    unLock(password?: string) {
      if (this.lockInfo?.pwd === password) {
        this.resetLockInfo();
        return '';
      }
      return '锁屏密码错误';
    },
  },
  persist: true,
});
