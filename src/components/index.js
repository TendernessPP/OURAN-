import Vue from 'vue'
// 注意 有些组件使用异步加载会有影响
Vue.component('cp-icon', () => import('./cp-icon'))
Vue.component('cp-icon-svg', () => import('./cp-icon-svg/index.vue'))
Vue.component('head-main', () => import('./headMain/index.vue'))



