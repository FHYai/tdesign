/**
 * 配置和注册全局指令
 */
import type { App } from 'vue';
import { setupPermissionDirective } from './granularPermission';
export function setupGlobDirectives(app: App) {
  setupPermissionDirective(app);
}
