/**
 * 初始一个路由模块（默认包含增删改查）
 * @param moduleName 模块英文名称
 * @param moduleNameCN 模块中文名 （和 auth 模块名有关）
 * @param moduleMainName 模块主要名称（和添加、标题显示等有关）
 * @param options {{
 *            pageTypes: Array 默认的 children, 为页面名字数组,
 *            editPageSimilarTypes: Array 与 edit 共用一个组件的页面
 *        }} 其他配置
 * @param customInitRoutes {Function} 自定义路由生成函数（返回一个路由数组）
 * @returns {Array}
 */
export function initModule(moduleName, moduleNameCN, moduleMainName, options, customInitRoutes) {
    options       = Object.assign({
        pageTypes           : [
            'list', 'detail', 'edit', 'create'
        ],
        editPageSimilarTypes: ['edit', 'create', 'detail']
    }, options);
    let pageTypes = options.pageTypes;
    let children  = [];
    if (customInitRoutes) {
        children = children.concat(customInitRoutes(moduleName, moduleNameCN, moduleMainName, options));
    }
    pageTypes.forEach(pageType => {
        let isPageAlready = false; // 页面路由是否已经初始
        children.forEach(route => {
            if (route.meta.pageType === pageType) {
                isPageAlready = true;
            }
        });
        if (!isPageAlready) {
            let editPageSimilarTypes = options.editPageSimilarTypes;
            // console.log(editPageSimilarTypes)
            let pageVueName          = pageType;
            editPageSimilarTypes.forEach(editPageSimilarType => {
                if (pageType === editPageSimilarType) {
                    pageVueName = 'edit';
                }
            });
            children.push(initModulePage(moduleName, moduleNameCN, moduleMainName, pageType, pageVueName));
        }
    });
    let result = {
        path     : `/${moduleName}`,
        redirect : `/${moduleName}/list`,
        component: () => import(/*webpackChunkName: "[request]-[index].vue" */`@/views/layout.vue`),
        children
    };
    // console.log(result)
    return result;
}

/**
 * 初始单个页面路由
 * @param moduleName 模块英文名
 * @param moduleNameCN 模块中文名 （和 auth 模块名有关）
 * @param moduleMainName 模块主要名称（和添加、标题显示等有关）
 * @param pageType 页面类型
 * @param pageVueName 引用的 vue 名称
 * @returns {{path: string, name: string, meta: {moduleName: *, moduleNameCN: *, pageType: *}, component: (function(): *)}}
 */
export function initModulePage(moduleName, moduleNameCN, moduleMainName, pageType, pageVueName) {
    let path = pageType;
    if (['edit', 'detail'].includes(pageType)) {
        path = pageType + '/:id';
    }
    let route = {
        path,
        name     : `${moduleName}${upperCapital(pageType)}`,
        meta     : {
            moduleName,
            moduleNameCN,
            moduleMainName,
            pageType,
            getAuth: (vm) => {
                let auth         = vm.$store.state.loginConfig.user.auth;
                let moduleNameCN = route.meta.moduleNameCN;
                return auth[moduleNameCN];
            }
        },
        component: () => import(/*webpackChunkName: "[request]-[index].vue" */`@/views/pages/${moduleName}/${pageVueName}.vue`)
    };
    return route;
}

function upperCapital(string) {
    return string.toUpperCase()[0] + string.slice(1);
}