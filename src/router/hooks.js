import {api} from '@/api/api';
import store from '@/store/store';

export function initHooks(router) {
    router.beforeEach((to, from, next) => {
        function userExpiredHandler() {
            // 定义路由白名单
            let whitePathList = ['/login','/test'];
            let userConf;
            try {
                userConf = store.state.loginConfig.user;
            } catch (err) {
                console.log(err);
            }
            // 直接可访问的页面，白名单页面
            if (whitePathList.includes(to.path)) {
                next();
            }
            // 需要权限才可以访问
            else {
                if (!userConf) {
                    next({name: 'login', params: {from: to}});
                }
                else {
                    next();
                }
            }
        }

        userExpiredHandler();
    });
}
