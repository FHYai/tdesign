/**
 * 全局权限指令
 * 用于组件权限的细粒度控制
 * @Example v-auth="RoleEnum.TEST"
 */
import type { App, Directive, DirectiveBinding } from 'vue';

import { getPermissionStore } from '@/store';

function isAuth(el: Element, binding: any) {
  const permissionStore = getPermissionStore();
  const value = binding.value;
  if (!value) return;
  if (!permissionStore.hasPermission(value)) {
    el.parentNode?.removeChild(el);
  }
}

const mounted = (el: Element, binding: DirectiveBinding<any>) => {
  isAuth(el, binding);
};

const authDirective: Directive = {
  mounted,
};

export function setupPermissionDirective(app: App) {
  app.directive('auth', authDirective);
}

export default authDirective;
