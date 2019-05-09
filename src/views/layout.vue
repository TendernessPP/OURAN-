<template>
    <div class="content-wrapper">
        <header-main></header-main>
        <router-view></router-view>
        <footer class="footer">
            <div class="footer-inner">
                <div class="footer__left">
                    <a href="#">留言联系</a>
                    <a href="#" target="_blank">Copyright © 2014-2018, YzmCMS All Rights Reserved. </a>
                    <span>| 京ICP备16034624号</span>
                </div>
                <div class="footer__right">
                    <a href="#" target="_blank" >站长统计</a>
                </div>
            </div>
        </footer>
        <!--底部-->
        <vue-progress-bar></vue-progress-bar>
    </div>
</template>
<script>
    export default {
        components: {
            'header-main': require('../../src/components/headMain/index.vue').default,
        },
        data() {
            return {};
        },
        methods: {},
        mounted() {

        },
        computed: {}
    };
</script>
<style lang="stylus">
    @import "../static/styles/vendors/reset.styl"
    .content-wrapper
        height: 100%
        display: flex
        flex-direction: column
        .footer
            width: 100%
            background: #222
            opacity: .95
            .footer-inner
                display: flex
                justify-content: space-between
                height: 50px
                line-height: 50px
                margin: 0 auto
                width: 100%
                max-width: 1220px
                a
                    color: #aaa
                    &:hover
                        text-decoration: underline
                span
                    color: #aaa

</style>
