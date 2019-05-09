let maskerConfirmMsg = {
    needMask : false,
    title    : {},
    content  : {},
    onsuccess: () => {},
    cache    : {
        title  : {lang: {en: 'Confirm', cn: '确认操作'}},
        content: {
            type: 'text',
            data: {
                lang: {
                    en: 'Are you sure you want to do it?', cn: '确认要执行该操作吗？'
                }
            }
        }
    }
};
export default {
    state    : {
        // configFile     : null,
        // pageSize       : 10,
        currentLangType   : 'cn', // 'en' | 'cn'
        scrollBoxScrollTop: 0,
        loginConfig       : null, // {allRolesAuthConf: null {Object} // 所有角色权限配置信息, user: null {Object} // 用户数据},
        // 全局确认信息弹层
        maskerConfirmMsg  : Object.assign({}, maskerConfirmMsg),
        tempData          : null, // 临时缓存数据
        groupList         : [],
        assets : {},
        radioStatus: 0,
        material: '',//添加哪种素材
        materialList: null,//哪种素材列表
        materialDetail: null,//哪种素材详情
        materialId: null,//素材id
        projectId: null,//项目名称id
        userId: null,//用户id
        contentId: null,//素材列表项id
        active: null,
        apply:''//受众还是报名受众
    },
    getter   : {},
    mutations: {
        // setConfigFile(state, file) {
        //     state.configFile = file;
        // },
        // setPageSize(state, size) {
        //     state.pageSize = size;
        // },

        //全局是qa还是bristrom
        radioStatusChange(state, value){
            console.log(value)
            state.radioStatus = value;
        },
        /**
         * 设置当前语言
         * @param state
         * @param value
         */
        setCurrentLangType(state, value) {
            state.currentLangType = value;
        },
        /**
         * 设置滚动位置
         * @param state
         * @param value
         */
        setScrollBoxScrollTop(state, value) {
            state.scrollBoxScrollTop = value;
        },
        /**
         * 重置滚动位置
         * @param state
         */
        resetScrollBoxScrollTop(state) {
            state.scrollBoxScrollTop = 0;
        },
        /**
         * 设置登录数据（包括 vuex、appConf）
         * @param state
         * @param value
         */
        setLoginConfig(state, value) {
            state.loginConfig = {
                user: value
            };
        },
        /**
         * 清空登录数据（包括 vuex、appConf）
         * @param state
         */
        removeLoginConfig(state) {
            state.loginConfig = null;
        },
        setMaskerConfirmMsg(state, options) {
            if (options.data) {
                options.content = {
                    type: 'text',
                    data: options.data // data 参数对应到 content 上
                };
                delete options.data;
            }
            Object.assign(state.maskerConfirmMsg, maskerConfirmMsg.cache, options);
        },
        resetMaskerConfirmMsg(state, options) {
            state.maskerConfirmMsg = Object.assign({}, maskerConfirmMsg);
        },
        setTempData(state, data) {
            state.tempData = data;
        },
        resetTempData(state) {
            state.tempData = null;
        },
        /**
         * 向 loginConfig 中设置 角色权限配置
         * @param state
         * @param data
         */
        setAllRolesAuthConf(state, data) {
            state.loginConfig.allRolesAuthConf = data;
        },
        /**
         * 设置处理后的用户权限
         * @param state
         * @param data
         */
        setUserAuth(state, data) {
            state.loginConfig.user.auth = data;
        },
        /**
         * 设置单个模块用户权限
         * @param moduleName 模块名
         * @param state
         * @param data
         */
        setUserModuleAuth(state, [moduleName, data]) {
            if (!state.loginConfig.user.auth) {
                state.loginConfig.user.auth = {};
            }
            state.loginConfig.user.auth[moduleName] = data;
        },
        /*assets详情页数据*/
        setAssetsDetail(state, data){
            state.assets = data;
        },
        /*素材类别*/
        setMaterial(state, data){
            state.material = data;
        },
        /*素材列表*/
        setMaterialList(state, data){
            state.materialList = data;
        },
        /*素材详情*/
        setMaterialDetail(state, data){
            state.materialDetail = data;
        },
        /*素材ID*/
        setMaterialId(state, data){
            state.materialId = data;
        },
        /*项目id*/
        setProjectId(state,data){
            state.projectId = data;
        },
        /*用户id*/
        setUserDetail(state,data){
            state.userId = data;
        },
        /*素材列表项id*/
        setContentId(state,data){
            state.contentId = data;
        },
        /*进入素材详情是否受众或者报名受众*/
        setMaterialApply(state,data){
            state.apply = data;
        },
        setActive(state,data){
            state.active = data;
        },
    },
    actions  : {
       /* radioStatusChange ({ state, dispatch }) {
            return new Promise(async resolve => {
                // store 赋值
                state.asideCollapse = await dispatch('d2admin/db/get', {
                    dbName: 'sys',
                    path: 'menu.asideCollapse',
                    defaultValue: setting.menu.asideCollapse,
                    user: true
                }, { root: true })
                // end
                resolve()
            })
        }*/
    },
};
