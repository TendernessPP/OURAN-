import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import modules from './modules/index';
import {
    setTargetStoreStatesToWebStorage,
    whetherNeedLocalVuexStore
} from '../lib/plugins/vuex-plugins';

Vue.use(Vuex);

let debug = process.env.NODE_ENV !== 'production';

let plugins = [
    setTargetStoreStatesToWebStorage([
        'radioStatus',
        'material',
        'materialList',
        'materialDetail',
        'loginConfig',
        'projectId',
        'userId',
        'materialId',
        'contentId',
        'apply',
        'active'
    ])
];

const store = new Vuex.Store(Object.assign(modules, {
    // 严格模式
    // https://vuex.vuejs.org/zh-cn/strict.html
    strict : debug,
    plugins: debug ? [
        ...plugins,
        // https://vuex.vuejs.org/zh-cn/plugins.html
        // 控制台打印出vuex改变
        // 如果正在使用 vue-devtools，你可能不需要此插件。
        createLogger()
    ] : plugins
}));

let needLocalVuexStoreState = true;
whetherNeedLocalVuexStore(store, needLocalVuexStoreState);

export default store;

