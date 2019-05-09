<template>
    <!--首页-->
    <div class="shouye">
        <!--首页图片轮播图-->
        <el-carousel trigger="click" :interval="5000">
            <el-carousel-item v-for="item in images" :key="item.index">
                <img :src="item.src" alt="">
            </el-carousel-item>
        </el-carousel>
        <!--内容区-->
        <div class="article">
            <!--内容区左部-->
            <div class="article__left">
                <!--特别推荐-->
                <article class="special-recommend">
                    <h1>特别推荐</h1>
                    <ul>
                        <li v-for="(item,index) in listData" :key="index">
                            <div class="flex">
                                <div class="li__left">
                                    <img :src="item.imgSrc" alt="">
                                </div>
                                <div class="li__right">
                                    <h2>{{item.h2Title}}</h2>
                                    <div class="introduction">
                                        {{item.introduction}}
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </article>
                <!--最新发布-->
                <article class="latest-release">
                    <h1>最新发布</h1>
                    <div class="release" v-for="(item,index) in releaseData" :key="index">
                        <div class="release_left">
                            <img :src="item.imgSrc" alt="">
                        </div>
                        <div class="release_right">
                            <h2>{{item.h2Title}}</h2>
                            <div class="introduction">
                                {{item.introduction}}
                            </div>
                            <div class="detail">
                                <span class="person">
                                     <cp-icon-svg iconClass="people"></cp-icon-svg>{{item.detail.people}}
                                </span>
                                <span class="time">
                                    <cp-icon-svg iconClass="time"></cp-icon-svg>{{item.detail.time}}
                                </span>
                                <span class="read">
                                    <cp-icon-svg iconClass="read"></cp-icon-svg>{{item.detail.read}}次浏览
                                </span>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
            <!--内容区右部-->
            <div class="article__right">
                <!--热门标签-->
                <div class="hot-label">
                    <h3>热门标签</h3>
                    <ul>
                        <li><a href="#">博客</a></li>
                        <li><a href="#">生活</a></li>
                        <li><a href="#">OURAN</a></li>
                        <li><a href="#">Python</a></li>
                        <li><a href="#">搞笑</a></li>
                        <li><a href="#">html</a></li>
                        <li><a href="#">大数据</a></li>
                        <li><a href="#">服务器</a></li>
                        <li><a href="#">欣赏</a></li>
                        <li><a href="#">js</a></li>
                        <li><a href="#">摄影</a></li>
                        <li><a href="#">娱乐</a></li>
                        <li><a href="#">mysql</a></li>
                    </ul>
                </div>
                <!--推荐文章-->
                <article class="recommend-article">
                    <h3>推荐文章</h3>
                    <div class="recommend" v-for="(item,index) in recommendData" :key="index">
                        <div class="recommend__left">
                            <img :src="item.imgSrc" alt="">
                        </div>
                        <div class="recommend__right">
                            <h4>{{item.h4Title}}</h4>
                            <div class="detail">
                                <span class="time">
                                    {{item.detail.time}}
                                </span>
                                <span class="read">
                                    {{item.detail.read}}次阅读
                                </span>
                            </div>
                        </div>
                    </div>
                </article>
                <!--最新评论-->
                <article class="latest-review" >
                    <h3>最新评论</h3>
                    <div class="review" v-for="(item,index) in reviesData" :key="index">
                        <h4>{{item.h4Title}}</h4>
                        <div class="answer">
                            网友评论：{{item.answer}}
                        </div>
                    </div>
                </article>
                <!--分享网站-->
                <div class="share-web">
                    <h3>分享网站</h3>
                    <div class="share">
                        <a href="#" >微信</a>
                        <a href="#" >Q Q</a>
                        <a href="#" >空间</a>
                        <a href="#" >微博</a>
                    </div>
                </div>
            </div>
        </div>
        <!--链接区域-->
        <div class="friendship-link">
            <h1>友情链接</h1>
            <div class="link">
                <a href="#" target="_blank" title="">YzmCMS官网</a>
                <a href="#" target="_blank" title="">YzmCMS论坛</a>
                <a href="#" target="_blank" title="">多骨鱼</a>
                <a href="#" target="_blank" title="">多骨鱼</a>
                <a href="#" target="_blank" title="">多骨鱼</a>
                <a href="#" target="_blank" title="">多骨鱼</a>
                <a href="#" target="_blank" title="">多骨鱼</a>
                <a href="#" target="_blank" title="">多骨鱼</a>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                images: [
                    {
                        index: 1,
                        src: require('../../static/images/banner_1.jpg'),
                    },
                    {
                        index: 2,
                        src: require('../../static/images/banner_2.jpg'),
                    },
                    {
                        index: 3,
                        src: require('../../static/images/banner_1.jpg'),
                    },
                ],
                listData: [
                    {
                        imgSrc: require('../../static/images/list01.png'),
                        h2Title: 'OurAN v5.2正式版发布',
                        introduction: 'OurAN是一款轻量级开源内容管理系统,它是由袁志蒙自主研发的框架YZMPHP开发。' +
                            'YzmCMS v5.2 新增或修正功能:1.数据库操作新增PDO驱动，并采用预处理，系统更安全！' +
                            '2.新增内容分页功能;3.会员中心新增微博登录'
                    },
                    {
                        imgSrc: require('../../static/images/list02.png'),
                        h2Title: 'OurAN常见问题汇总',
                        introduction: '1、OurAN如何安装？浏览器访问http://www.yourname.com/install.php(yourname表示你的域名),' +
                            '按照安装提示说明进行程序安装即可。' +
                            '2、OurAN是收费还是免费的'
                    },
                    {
                        imgSrc: require('../../static/images/list03.jpg'),
                        h2Title: 'OurAN二次开发手册',
                        introduction: 'YzmCMS是采用MVC设计模式开发,基于模块和操作的方式进行访问，' +
                            '采用单一入口模式进行项目部署和访问，无论访问任何一个模块或者功能，只有'
                    },
                    {
                        imgSrc: require('../../static/images/list04.jpg'),
                        h2Title: '为什么要开发自己的CMS？',
                        introduction: '作为一名WEB开发人员，有很多人问过我一个相同的问题：市面上的CMS那么多，' +
                            '为什么还要浪费时间去开发自己的CMS？我的回答很简单：自从接触互...'
                    },
                    {
                        imgSrc: require('../../static/images/list01.png'),
                        h2Title: 'YzmCMS v5.2正式版发布',
                        introduction: 'YzmCMS是一款轻量级开源内容管理系统,它是由袁志蒙自主研发的框架YZMPHP开发。' +
                            'YzmCMS v5.2 新增或修正功能:1.数据库操作新增PDO驱动，并采用预处理，系统更安全！' +
                            '2.新增内容分页功能;3.会员中心新增微博登录'
                    },
                    {
                        imgSrc: require('../../static/images/list01.png'),
                        h2Title: 'YzmCMS v5.2正式版发布',
                        introduction: 'YzmCMS是一款轻量级开源内容管理系统,它是由袁志蒙自主研发的框架YZMPHP开发。' +
                            'YzmCMS v5.2 新增或修正功能:1.数据库操作新增PDO驱动，并采用预处理，系统更安全！' +
                            '2.新增内容分页功能;3.会员中心新增微博登录'
                    },
                ],
                releaseData: [
                    {
                        imgSrc: require('../../static/images/forward01.jpg'),
                        h2Title: 'Linux下ab压力测试',
                        introduction: '本篇文章主要讲解如何在Linux下使用ab压力测试工具进行网站访问压力测试,' +
                            '并使用ab对YzmCMS网站进行并发压力测评，验证YzmCMS系统性能，' +
                            'ab是apachebench命令的缩写，ab是apache自带的压力测试工具',
                        detail: {
                            people: 'DENNIS',
                            time: '2018-2-23',
                            read: 218
                        }
                    },
                    {
                        imgSrc: require('../../static/images/forward02.jpg'),
                        h2Title: 'Linux下ab压力测试',
                        introduction: '本篇文章主要讲解如何在Linux下使用ab压力测试工具进行网站访问压力测试,' +
                            '并使用ab对YzmCMS网站进行并发压力测评，验证YzmCMS系统性能，' +
                            'ab是apachebench命令的缩写，ab是apache自带的压力测试工具',
                        detail: {
                            people: 'DENNIS',
                            time: '2018-2-23',
                            read: 218
                        }
                    },
                    {
                        imgSrc: require('../../static/images/forward03.jpg'),
                        h2Title: 'Linux下ab压力测试',
                        introduction: '本篇文章主要讲解如何在Linux下使用ab压力测试工具进行网站访问压力测试,' +
                            '并使用ab对YzmCMS网站进行并发压力测评，验证YzmCMS系统性能，' +
                            'ab是apachebench命令的缩写，ab是apache自带的压力测试工具',
                        detail: {
                            people: 'DENNIS',
                            time: '2018-2-23',
                            read: 218
                        }
                    },
                    {
                        imgSrc: require('../../static/images/forward04.png'),
                        h2Title: 'Linux下ab压力测试',
                        introduction: '本篇文章主要讲解如何在Linux下使用ab压力测试工具进行网站访问压力测试,' +
                            '并使用ab对YzmCMS网站进行并发压力测评，验证YzmCMS系统性能，' +
                            'ab是apachebench命令的缩写，ab是apache自带的压力测试工具',
                        detail: {
                            people: 'DENNIS',
                            time: '2018-2-23',
                            read: 218
                        }
                    },
                    {
                        imgSrc: require('../../static/images/forward05.jpg'),
                        h2Title: 'Linux下ab压力测试',
                        introduction: '本篇文章主要讲解如何在Linux下使用ab压力测试工具进行网站访问压力测试,' +
                            '并使用ab对YzmCMS网站进行并发压力测评，验证YzmCMS系统性能，' +
                            'ab是apachebench命令的缩写，ab是apache自带的压力测试工具',
                        detail: {
                            people: 'DENNIS',
                            time: '2018-2-23',
                            read: 218
                        }
                    },
                    {
                        imgSrc: require('../../static/images/forward01.jpg'),
                        h2Title: 'Linux下ab压力测试',
                        introduction: '本篇文章主要讲解如何在Linux下使用ab压力测试工具进行网站访问压力测试,' +
                            '并使用ab对YzmCMS网站进行并发压力测评，验证YzmCMS系统性能，' +
                            'ab是apachebench命令的缩写，ab是apache自带的压力测试工具',
                        detail: {
                            people: 'DENNIS',
                            time: '2018-2-23',
                            read: 218
                        }
                    },
                    {
                        imgSrc: require('../../static/images/forward01.jpg'),
                        h2Title: 'Linux下ab压力测试',
                        introduction: '本篇文章主要讲解如何在Linux下使用ab压力测试工具进行网站访问压力测试,' +
                            '并使用ab对YzmCMS网站进行并发压力测评，验证YzmCMS系统性能，' +
                            'ab是apachebench命令的缩写，ab是apache自带的压力测试工具',
                        detail: {
                            people: 'DENNIS',
                            time: '2018-2-23',
                            read: 218
                        }
                    },
                    {
                        imgSrc: require('../../static/images/forward01.jpg'),
                        h2Title: 'Linux下ab压力测试',
                        introduction: '本篇文章主要讲解如何在Linux下使用ab压力测试工具进行网站访问压力测试,' +
                            '并使用ab对YzmCMS网站进行并发压力测评，验证YzmCMS系统性能，' +
                            'ab是apachebench命令的缩写，ab是apache自带的压力测试工具',
                        detail: {
                            people: 'DENNIS',
                            time: '2018-2-23',
                            read: 218
                        }
                    },
                    {
                        imgSrc: require('../../static/images/forward01.jpg'),
                        h2Title: 'Linux下ab压力测试',
                        introduction: '本篇文章主要讲解如何在Linux下使用ab压力测试工具进行网站访问压力测试,' +
                            '并使用ab对YzmCMS网站进行并发压力测评，验证YzmCMS系统性能，' +
                            'ab是apachebench命令的缩写，ab是apache自带的压力测试工具',
                        detail: {
                            people: 'DENNIS',
                            time: '2018-2-23',
                            read: 218
                        }
                    },
                ],
                recommendData: [
                    {
                        imgSrc: require('../../static/images/forward01.jpg'),
                        h4Title: 'Linux下ab压力测试',
                        detail: {
                            time: '2018-2-23',
                            read: 218
                        }
                    },
                    {
                        imgSrc: require('../../static/images/forward02.jpg'),
                        h4Title: 'Linux下ab压力测试',
                        detail: {
                            time: '2018-2-23',
                            read: 218
                        }
                    },
                    {
                        imgSrc: require('../../static/images/forward03.jpg'),
                        h4Title: 'Linux下ab压力测试',
                        detail: {
                            time: '2018-2-23',
                            read: 218
                        }
                    },
                    {
                        imgSrc: require('../../static/images/forward03.jpg'),
                        h4Title: 'Linux下ab压力测试',
                        detail: {
                            time: '2018-2-23',
                            read: 218
                        }
                    },
                    {
                        imgSrc: require('../../static/images/forward02.jpg'),
                        h4Title: 'Linux下ab压力测试',
                        detail: {
                            time: '2018-2-23',
                            read: 218
                        }
                    },
                    {
                        imgSrc: require('../../static/images/forward04.png'),
                        h4Title: 'Linux下ab压力测试',
                        detail: {
                            time: '2018-2-23',
                            read: 218
                        }
                    },
                    {
                        imgSrc: require('../../static/images/forward04.png'),
                        h4Title: 'Linux下ab压力测试',
                        detail: {
                            time: '2018-2-23',
                            read: 218
                        }
                    },
                ],
                reviesData: [
                    {
                        h4Title: '13种css超炫的鼠标滑过效果',
                        answer:'特效好看诶，不过现在还用不上，先马着了，谢谢~'
                    },
                    {
                        h4Title: 'YzmCMS常见问题汇总',
                        answer:'网友评论：怎么调用多级栏目呀？三级以上的'
                    },
                    {
                        h4Title: 'YzmCMS v5.2正式版发布',
                        answer:'网友评论：安装后提示找不到admin里面的index是什么鬼？'
                    },
                ]
            };
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .shouye
        width: 100%
        flex: 1
        padding-top: 70px
        padding-left: 10px
        padding-right: 10px
        max-width: 1220px
        margin: 0 auto
        -overflow-y: auto
        &::-webkit-scrollbar
            width: 4px
            height: 16px
            background-color: #f8f8f8
        &::-webkit-scrollbar-thumb
            border-radius: 3px
            background-color: #ccc
        &::-webkit-scrollbar-track
            border-radius: 0
            background-color: #f8f8f8
        .el-carousel
            .el-carousel__container
                .el-carousel__item
                    > img
                        width: 100%
        .article
            display: flex
            .article__left
                flex: 1
                margin-top: 10px
                margin-right: 15px
                .special-recommend
                    h1
                        padding: 6px 20px
                        border-bottom: 1px solid #eaeaea
                        border-radius: 5px 5px 0 0
                        background-color: #F7F7F7
                        font-weight: 400
                        font-size: 15px
                        color: #555
                    ul
                        overflow: hidden
                        li
                            width: 50%
                            float: left
                            padding: 12px 20px 5px
                            background-color: #ffffff
                            margin-bottom: 1px
                            cursor: pointer
                            border-right: 1px solid #e4e4e4
                            border-bottom: 1px solid #e4e4e4
                            &:hover
                                background-color: #f5fcee
                                h2
                                    color: #67C23A !important
                            .flex
                                display: flex
                                .li__left
                                    margin-right: 10px
                                    display: flex
                                    align-items: center
                                    img
                                        width: 110px
                                        height: 80px
                                .li__right
                                    display: flex
                                    flex-direction: column
                                    justify-content: center
                                    h2
                                        font-weight: 700;
                                        font-size: 14px;
                                        color: #555
                                    .introduction
                                        color: #999
                                        font-size: 12px
                                        overflow: hidden
                                        text-overflow: ellipsis
                                        display: -webkit-box
                                        -webkit-box-orient: vertical
                                        -webkit-line-clamp: 2
                .latest-release
                    display: block
                    h1
                        padding: 6px 20px
                        border-bottom: 1px solid #eaeaea
                        border-radius: 5px 5px 0 0
                        background-color: #F7F7F7
                        font-weight: 400
                        font-size: 15px
                        color: #555
                    .release
                        padding: 12px 20px 5px
                        display: flex
                        background-color: #ffffff
                        margin-bottom: 1px
                        position: relative
                        &:hover
                            background-color: #f5fcee
                            &:before
                                content: ''
                                display: block
                                position: absolute
                                left: -4px
                                top: 0px
                                background-color: #67C23A
                                width: 4px
                                height: 100%
                                -color: #fe2501
                                font-size: 12px
                                font-weight: 900
                        .release_left
                            flex: 0 0 220px
                            margin-right: 20px
                            display: flex
                            align-items: center
                            cursor: pointer
                            img
                                width: 220px
                                height: 150px
                        .release_right
                            flex: 1
                            display: flex
                            flex-direction: column
                            justify-content: center
                            h2
                                cursor: pointer
                                font-weight: 700;
                                font-size: 14px;
                                color: #555
                                &:hover
                                    color: #67C23A
                            .introduction
                                margin: 8px 0
                                color: #999
                                font-size: 14px
                                overflow: hidden
                                text-overflow: ellipsis
                                display: -webkit-box
                                -webkit-box-orient: vertical
                                -webkit-line-clamp: 3
                            .detail
                                > span
                                    display: inline-block
                                    margin-right: 20px
                                    color: #999
                                .svg-icon
                                    margin-right: 5px
            .article__right
                flex: 0 0 290px
                .hot-label
                    margin-top: 10px
                    h3
                        padding: 11px 15px 10px;
                        border-bottom: 1px solid #eaeaea;
                        background-color: #fbfbfb;
                        font-weight: 400;
                        font-size: 18px;
                        color: #555
                    ul
                        overflow: hidden
                        background-color: #ffffff
                        padding: 20px
                        li
                            border: 1px solid #ccc
                            float: left
                            border-radius: 4px
                            margin-right: 8px
                            margin-bottom: 15px
                            &:hover
                                border: 1px solid #67C23A
                                > a
                                    color: #67C23A
                            > a
                                display: inline-block
                                padding: 4px 14px
                                color: #666
                                font-size: 12px
                .recommend-article
                    margin-top: 10px
                    h3
                        padding: 11px 15px 10px;
                        border-bottom: 1px solid #eaeaea;
                        background-color: #fbfbfb;
                        font-weight: 400;
                        font-size: 18px;
                        color: #555
                    .recommend
                        cursor: pointer
                        display: flex
                        background-color: #fff
                        margin-bottom: 1px
                        padding: 10px 15px
                        position: relative
                        &:hover
                            background-color: #f5fcee
                            &:before
                                content: ''
                                display: block
                                position: absolute
                                left: -4px
                                top: 0px
                                background-color: #67C23A
                                width: 4px
                                height: 100%
                                -color: #fe2501
                                font-size: 12px
                                font-weight: 900
                            h4
                                color: #67C23A !important
                        .recommend__left
                            margin-right: 10px
                            flex: 0 0 80px
                            > img
                                width: 80px
                        .recommend__right
                            flex: 1
                            display: flex
                            flex-direction: column
                            justify-content: center
                            h4
                                font-size: 14px
                                color: #555
                            .detail
                                > span
                                    display: inline-block
                                    margin-right: 20px
                                    color: #999
                .latest-review
                    margin-top: 10px
                    h3
                        padding: 11px 15px 10px;
                        border-bottom: 1px solid #eaeaea;
                        background-color: #fbfbfb;
                        font-weight: 400;
                        font-size: 18px;
                        color: #555
                    .review
                        background-color: #fff
                        margin-bottom: 1px
                        padding: 10px 15px
                        &:hover
                            background-color: #f5fcee
                        h4
                            cursor: pointer
                            color: #555
                            font-size: 14px
                            &:hover
                                color: #67C23A
                        .answer
                            color: #555
                            font-size: 14px
                            margin: 5px 0
                .share-web
                    margin-top: 10px
                    h3
                        padding: 11px 15px 10px;
                        border-bottom: 1px solid #eaeaea;
                        background-color: #fbfbfb;
                        font-weight: 400;
                        font-size: 18px;
                        color: #555
                    .share
                        background-color: #fff
                        margin-bottom: 1px
                        padding: 10px 15px
                        >a
                            display: inline-block
                            width: 50px
                            margin: 0 10px 0 0;
                            padding: 60px 0 0
                            color: #aaa
                            font-size: 15px
                            text-align: center
                            background: url(../../static/images/share_icon.png)
                            background-repeat: no-repeat
                            cursor: pointer
                            background-size: 206px
                            &:nth-child(1)
                                background-position: -104px 1px
                            &:nth-child(3)
                                background-position: -52px 0
                            &:nth-child(4)
                                background-position: -155px 0
                            &:hover
                                color:#666

        .friendship-link
            margin: 10px 0
            h1
                padding: 6px 20px
                border-bottom: 1px solid #eaeaea
                border-radius: 5px 5px 0 0
                background-color: #F7F7F7
                font-weight: 400
                font-size: 15px
                color: #555
            .link
                background-color: #ffffff
                padding: 10px 20px
                > a
                    display: inline-block
                    margin-right: 8px
                    color: #333
                    font-size: 12px
                    &:hover
                        color: #67C23A
</style>
