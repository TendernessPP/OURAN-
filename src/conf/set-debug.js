import Vue from 'vue';

export const IS_DEBUG_NYU_1     = false; // 是否将在 nyu-1 上测试
export const IS_DEBUG_NEED_AUTH = false; // 是否需要验证登陆权限

// 同步到 vue 原型上
Vue.prototype.$IS_DEBUG_NYU_1     = IS_DEBUG_NYU_1;
Vue.prototype.$IS_DEBUG_NEED_AUTH = IS_DEBUG_NEED_AUTH;