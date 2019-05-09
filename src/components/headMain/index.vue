<template>
    <!--头部-->
    <div class="header">
        <!--头部导航-->
        <div class="blog-nav">
            <!--导航-->
            <div class="nav">
                <h1 class="logo"></h1>
                <span class="nav-name" :class="{'active':this.$route.path.split('/')[1]==='shouye'}"
                @click="goPath('shouye')">首页</span>
                <el-dropdown :class="{'active':this.$route.path.split('/')[1]==='chengxu'}"
                             @click.native="goPath('chengxu')">
                      <span class="el-dropdown-link">
                        程序
                      </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="goPath('python')">python</el-dropdown-item>
                        <el-dropdown-item @click.native="goPath('html')">html</el-dropdown-item>
                        <el-dropdown-item @click.native="goPath('vue')">vue</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown :class="{'active':this.$route.path.split('/')[1]==='shuju'}"
                             @click.native="goPath('shuju')">
                      <span class="el-dropdown-link">
                        数据
                      </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="goPath('dianshang')">电商</el-dropdown-item>
                        <el-dropdown-item @click.native="goPath('xinwen')">新闻</el-dropdown-item>
                        <el-dropdown-item @click.native="goPath('pinglun')">评论</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span class="nav-name" :class="{'active':this.$route.path.split('/')[1]==='shenghuo'}"
                      @click="goPath('shenghuo')">生活</span>
                <span class="nav-name" :class="{'active':this.$route.path.split('/')[1]==='meizitu'}"
                      @click="goPath('meizitu')">妹子图</span>
                <el-dropdown :class="{'active':this.$route.path.split('/')[1]==='guanyu'}"
                             @click.native="goPath('guanyu')">
                      <span class="el-dropdown-link">
                        关于
                      </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="goPath('guanyu',2)">留言联系</el-dropdown-item>
                        <el-dropdown-item @click.native="goPath('guanyu',1)">关于作者</el-dropdown-item>
                        <el-dropdown-item @click.native="goPath('guanyu')">官方论坛</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <!--搜索-->
            <div class="search">
                <el-input
                        placeholder="输入你要找的内容"
                        v-model="search"
                        clearable
                        style="width: 240px"
                >
                    <template slot="suffix">
                        <cp-icon-svg iconClass="search"></cp-icon-svg>
                    </template>
                </el-input>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                search: ''
            };
        },
        methods: {
            /*路由跳转*/
            goPath(val,active=null){
                this.$store.commit('setActive', active);
                this.$goRoute(Object.assign({
                    name: val,
                }));
            }
        },
        watch: {},
        mounted() {
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .el-popper[x-placement^=bottom] {
        margin-top: 0
    }

    .el-dropdown-menu {
        width: 110px
        text-align: center
    }

    .el-dropdown-menu li:hover {
        background-color: #404040 !important
        color: #67c23a !important
    }

    .header
        flex: 0 0 52px
        width: 100%
        background: #222
        opacity: .95
        position: fixed
        z-index: 999
        top: 0
        .blog-nav
            width: 100%
            max-width: 1200px
            margin: 0 auto
            display: flex
            align-items: center
            justify-content: space-between
            .nav
                display: flex
                align-items: center
                .logo
                    display: inline-block
                    width: 200px
                    height: 52px
                    background: url(../../static/images/logo2.png) no-repeat 0 50%;
                .nav-name
                    cursor: pointer
                    display: inline-block
                    width: 110px
                    text-align: center
                    height: 52px
                    line-height: 52px
                    font-size: 14px
                    color: #ffffff
                    margin-right: 1px
                    margin-left: 1px
                    &:hover
                        background-color: #404040
                    &.active
                        background-color: #404040
                .el-dropdown
                    color: #ffffff
                    cursor: pointer
                    height: 52px
                    line-height: 52px
                    &.active
                        background-color: #404040
                    > span
                        display: inline-block
                        width: 110px
                        text-align: center
                    &:hover
                        background-color: #404040
                    &+.el-dropdown
                        margin-left: 1px

            .search
                margin-right: 0
                .el-input__inner
                    height: 30px
                    line-height: 30px
                    font-size: 12px
                    border-radius: 15px
                .el-input__suffix
                    display: flex
                    align-items: center
                    cursor: pointer
                    .el-input__suffix-inner
                        margin-right: 10px
                        .svg-icon
                            width: 16px
                            height: 16px
                            color: #525252

</style>
