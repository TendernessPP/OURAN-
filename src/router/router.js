import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import Layout from '@/views/layout.vue';
import {initHooks} from './hooks';
let router = new VueRouter({
    routes: [
        {
            path     : '/error',
            component: Layout,
            children : [
                {
                    name     : '404',
                    path     : '404',
                    component: () => import(/*webpackChunkName: "[request]-[index].vue"*/'../views/pages/404.vue')

                }
            ]
        },
        {
            path: '/shouye',
            component: Layout,
            children: [
                {
                    path: '/shouye',
                    name: 'shouye',
                    component: () => import('../views/pages/shouye.vue')
                },
                {
                    path: '/chengxu',
                    name: 'chengxu',
                    component: () => import('../views/pages/chengxu.vue')
                },
                {
                    path: '/python',
                    name: 'python',
                    component: () => import('../views/pages/python.vue')
                },
                {
                    path: '/html',
                    name: 'html',
                    component: () => import('../views/pages/html.vue')
                },
                {
                    path: '/vue',
                    name: 'vue',
                    component: () => import('../views/pages/vue.vue')
                },
                {
                    path: '/shuju',
                    name: 'shuju',
                    component: () => import('../views/pages/shuju.vue')
                },
                {
                    path: '/shenghuo',
                    name: 'shenghuo',
                    component: () => import('../views/pages/shenghuo.vue')
                },
                {
                    path: '/chengxu',
                    name: 'chengxu',
                    component: () => import('../views/pages/chengxu.vue')
                },
                {
                    path: '/meizitu',
                    name: 'meizitu',
                    component: () => import('../views/pages/meizitu.vue')
                },
                {
                    path: '/guanyu',
                    name: 'guanyu',
                    component: () => import('../views/pages/guanyu.vue')
                },
            ]
        },
        {
            path: '/',
            redirect: { name: 'shouye' },
        },

    ]
});
// initHooks(router);
export default router;
