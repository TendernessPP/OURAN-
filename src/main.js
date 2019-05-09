import Vue from 'vue';

import App from '@/views/app.vue';

import router from '@/router/router';

import store from '@/store/store';

import VueJsonp from 'vue-jsonp'

/*视频组件*/
import VideoPlayer from 'vue-video-player';
require('video.js/dist/video-js.css');
require('vue-video-player/src/custom-theme.css');
Vue.use(VideoPlayer);
Vue.use(VueJsonp);




// 核心插件
import cpAdmin from '@/plugin/plugin-admin'
// 多国语
import i18n from './i18n'
// 核心插件
Vue.use(cpAdmin);
new Vue({
    el    : '#app',
    router,
    store,
    i18n,
    render: h => h(App)
});

