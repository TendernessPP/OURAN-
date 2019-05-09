<template>
    <div class="guanyu">
        <div class="article">
            <div class="guanyu__left">
                <div class="tab" :class="{'active':active===0}" @click="tabChange(0)">关于</div>
                <div class="tab" :class="{'active':active===1}" @click="tabChange(1)">关于作者</div>
                <div class="tab" :class="{'active':active===2}" @click="tabChange(2)">留言联系</div>
            </div>
            <div class="guanyu__right">
                <div class="about" v-if="active ===0">
                        <h1 class="about__title">关于</h1>
                        <div class="about__content">
                            <p>本博客建站程序 : <a href="#" target="_blank" title="" style="color: #67C23A">OURAN v1.0</a></p>
                            <p><br></p>
                            <p align="center"><img src="http://blog.yzmcms.com/uploads/20160705/14677281973247.jpg" alt=""></p>
                            <p><br></p>
                            <p>OURAN是一款轻量级开源的内容管理系统，采用OOP方式自主开发的框架（YZMPHP）。系统易扩展，是一款高效开源的内容管理系统。系统基于PHP+Mysql架构，可运行在Linux、Windows、MacOSX、Solaris等各种平台上，程序自3.0版本起全面采用MVC设计模式，前台采用DIV+CSS设计，遵循WEB标准,兼容各种浏览器(包括IE6)，源码简洁清晰，完全采用PHP5面向对象设计，功能简单易懂具有良好的用户体验，稳定性好、扩展性及安全性强。</p>
                            <p><br></p>
                            <p>OURAN下载 : <a href="#" target="_blank" title="" style="color:blue">OURAN轻量级开源CMS</a></p>
                        </div>
                </div>
                <div class="about-Author" v-if="active ===1">
                    <h1 class="about-Author__title">关于作者</h1>
                    <div class="about-Author__content">
                        <p>About The Author</p>
                        <p><br></p>
                        <p align="center"><img src="http://blog.yzmcms.com/uploads/20170116/14844963374269.jpg" alt=""></p>
                        <p><br></p>
                        <p>我没有什么爱好，我只喜欢在我这个狭小的窝里上网、敲代码、学习、或者看看电影，然后写写博客，我没有什么伟大的梦想，只想有一个属于自己的房子，一份稳定的工作，平平淡淡的过一生就好！</p>
                        <p><br></p>
                        <p>联系方式（QQ/微信）：178715486/13386020828</p>
                    </div>
                </div>
                <div class="message-contact" v-if="active ===2">
                    <h1 class="message-contact__title">留言联系</h1>
                    <div class="message-contact__content">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                active: 0
            };
        },
        methods:{
            tabChange(val){
                this.active = val;
            }
        },
        created(){
            this.$nextTick(
                () => {
                    this.active = this.$store.state.active===null?0:this.$store.state.active;
                }
            )
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .guanyu
        width: 100%
        flex: 1
        padding-top: 70px
        padding-left: 10px
        padding-right: 10px
        max-width: 1220px
        margin: 0 auto
        -overflow-y: auto
        .article
            display: flex
            .guanyu__left
                flex: 1
                margin-right: 15px
                .tab
                    height: 50px
                    border-bottom: 1px solid #e5e5e5
                    font-size: 14px
                    line-height: 50px
                    padding: 0 20px
                    color: #555
                    cursor: pointer
                    &:hover
                        background: #00c3b6
                        color: #fff
                    &.active
                        background: #00c3b6
                        color: #fff
            .guanyu__right
                flex: 0 0 900px
                .about
                    background-color: #ffffff
                    .about__title
                        padding: 0 20px
                        height: 75px
                        border-bottom: 1px solid #e5e5e5
                        color: #333
                        font-size: 20px
                        line-height: 75px
                        font-weight: 400
                    .about__content
                        padding: 30px
                        font-size: 14px
                        line-height: 1.8
                        p
                            color: #555
                            margin: 0 0 10x

                .about-Author
                    background-color: #ffffff
                    .about-Author__title
                        padding: 0 20px
                        height: 75px
                        border-bottom: 1px solid #e5e5e5
                        color: #333
                        font-size: 20px
                        line-height: 75px
                        font-weight: 400
                    .about-Author__content
                        padding: 30px
                        font-size: 14px
                        line-height: 1.8
                        p
                            color: #555
                            margin: 0 0 10x

                .message-contact
                    background-color: #ffffff
                    .message-contact__title
                        padding: 0 20px
                        height: 75px
                        border-bottom: 1px solid #e5e5e5
                        color: #333
                        font-size: 20px
                        line-height: 75px
                        font-weight: 400
                    .message-contact__content
                        padding: 30px
                        font-size: 14px
                        line-height: 1.8
                        p
                            color: #555
                            margin: 0 0 10x

</style>
