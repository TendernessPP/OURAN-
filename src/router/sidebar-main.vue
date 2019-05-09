<style lang="stylus" scoped>
    @import "../static/styles/varibales.styl"
    @import "../static/styles/mixins"
    $padding = 0.2rem
    .side-bar-main
        width 168px
        .side-bar-main-top
            height $line-height-header
            background-color #22a644
            display flex
            align-items center
            justify-content center
        .side-bar-main-content
            border-top 1px solid #331c40
            padding 0.25rem 0 0.2rem
            color #cccccc
            background-color #34495e
            .split-line
                width 129px
                height 1px
                margin-left $padding
                background-color #8ea1b4
                opacity 0.3
</style>
<template>
    <div class="side-bar-main layout-2-top-fixed">
        <div class="side-bar-main-top">
            <img src="../static/images/icon-logo.png"/>
        </div>
        <div class="side-bar-main-content scroll-y">
            <template v-for="navItem in nav.items">
                <div :key="$getRandomTime()" v-if="navItem.isShow === undefined ? true : navItem.isShow">
                    <tab layoutDirection="column"
                            :items="navItem.items || []"
                            :title="navItem.title"
                            @clickTabItem="(e, item) => clickTab(item, 'clickItem')"
                            @clickTabTitle="(e, title, data) => clickTab(title,'clickTitle', data)"
                    ></tab>
                    <div class="split-line" v-if="navItem.needTabSplitLine"></div>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
    import {
        NavItem,
        NavMain
    } from '@/lib/class/Components';

    export default {
        components: {
            'tab': require('@/views/base/tab.vue').default
        },
        data() {
            return {
                nav: new NavMain({
                    vm   : this,
                    items: [
                        {
                            isShow          : false,
                            needTabSplitLine: true,
                            title           : new NavItem({
                                lang: {en: '', cn: '会议管理'}, type: 'icon', iconClass: 'meeting'
                            }),
                            items           : [
                                new NavItem({
                                    lang    : {en: '', cn: 'OA平台会议'},
                                    location: {path: '/oaPlatformMeeting/list'}
                                }),
                                new NavItem({
                                    lang    : {en: '', cn: '人脸平台会议'},
                                    location: {path: '/facePlatformMeeting/list'}
                                })
                            ]
                        },
                        {
                            isShow          : false,
                            needTabSplitLine: true,
                            title           : new NavItem({
                                lang: {en: '', cn: '人员管理'}, type: 'icon', iconClass: 'person'
                            }),
                            items           : [
                                new NavItem({
                                    lang    : {en: '', cn: '在校师生'},
                                    location: {path: '/schoolPerson/list'}
                                }),
                                new NavItem({
                                    isRootPathSelect: true, // 是否为路由为 '/' 时的选中
                                    lang            : {en: '', cn: '外聘人员'},
                                    location        : {path: '/employPerson/list'}
                                }),
                                new NavItem({
                                    lang    : {en: '', cn: '人员分组'},
                                    location: {path: '/personGroup/list'}
                                })
                            ]
                        },
                        {
                            isShow          : false,
                            needTabSplitLine: false,
                            title           : new NavItem({
                                lang: {en: '', cn: '系统设置'}, type: 'icon', iconClass: 'setting'
                            }),
                            items           : [
                                new NavItem({
                                    lang    : {en: '', cn: '管理员维护'},
                                    location: {path: '/admin/list'}
                                }),
                                new NavItem({
                                    lang    : {en: '', cn: '角色管理'},
                                    location: {path: '/role/list'}
                                }),
                                new NavItem({
                                    lang    : {en: '', cn: '密码维护'},
                                    location: {path: '/password/terminalPassword'}
                                })
                            ]
                        }
                    ]
                })

            };
        },
        watch     : {
            '$route.path'(path) {
                this.setSideBarSelected();
            }
        },
        computed  : {
            userConf() {
                return this.$store.state.loginConfig.user;
            }
        },
        methods   : {
            clickTab(target, type, data) {
                this.$goRoute(target.location);
                this.soloSelected(target, type, data);
            },
            resetSelect() {
                this.nav.resetSelect();
            },
            soloSelected(target, type, data) {
                this.nav.soloSelected(target, type, data);
            },
            setSideBarSelected() {
                this.nav.setSideBarSelected(this);
            },
            /**
             * 更具权限设置导航显示
             */
            setNavItemsIsShowByAuth() {
                const {isEmpty, MenuItemAuthObj, setModuleAuth} = require('@/utils/utils');

                let userConf                     = this.userConf;
                let auth                         = userConf.auth;
                /**
                 * 设置单个模块单项的显示
                 * @param moduleItem 模块下单项对象
                 */
                let setModuleItemIsShow          = (moduleItem) => {
                    let moduleName     = this.$gl(moduleItem);
                    let hasModuleAuth  = false;
                    let moduleItemAuth = auth[this.$gl(moduleItem)];
                    if (!isEmpty(moduleItemAuth) && moduleItemAuth.list) {
                        hasModuleAuth = true;
                    }
                    moduleItem.isShow = hasModuleAuth;
                };
                /**
                 * 设置单个模块或单个模块各项的显示
                 * @param module {Object} 模块对象
                 */
                let setModuleOrModuleItemsIsShow = (module) => {
                    let moduleName    = this.$gl(module.title);
                    let hasModuleAuth = false;
                    if (userConf.is_root) {
                        hasModuleAuth = true; // 显示所有次级菜单
                        module.isShow = hasModuleAuth;
                    }
                    else {
                        hasModuleAuth = !!auth[moduleName];
                        module.isShow = hasModuleAuth;
                        module.items.forEach(setModuleItemIsShow);
                    }
                };
                this.nav.items.forEach(setModuleOrModuleItemsIsShow);
            }
        },
        created() {
            this.setNavItemsIsShowByAuth();
            this.setSideBarSelected();
        }
    };
</script>
