<template>
    <div class="vue">
        <div class="article">
            <div class="vue__left">
                <!--html-->
                <article class="vue-article">
                    <h1>html</h1>
                    <div class="vue" v-for="(item,index) in qianduanData" :key="index">
                        <div class="vue_left">
                            <img :src="item.imgSrc" alt="">
                        </div>
                        <div class="vue_right">
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
                <!--分页-->
                <el-pagination
                        prev-text="上一页"
                        next-text="下一页"
                        v-if="allCount>20"
                        background
                        :page-size="20"
                        layout="total,prev, pager, next"
                        :total="allCount"
                >
                </el-pagination>
            </div>
            <div class="vue__right">
                <article class="click-ranking">
                    <h3>频道点击排行</h3>
                    <div class="click" v-for="(item,index) in recommendData" :key="index">
                        <div class="click__left">
                            <img :src="item.imgSrc" alt="">
                        </div>
                        <div class="click__right">
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
                <article class="file-archive">
                    <h3>文件归档(近18个月)</h3>
                    <div class="file" v-for="(item,index) in fileArchive" :key="index">
                        <div class="file__date">
                            {{item.date}}({{item.count}})
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                allCount: 23,
                qianduanData: [
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
                fileArchive:[
                    {
                        date:'2018年12月',
                        count: 2
                    },
                    {
                        date:'2018年11月',
                        count: 3
                    },
                    {
                        date:'2018年10月',
                        count: 2
                    },
                    {
                        date:'2018年9月',
                        count: 10
                    },
                    {
                        date:'2018年8月',
                        count: 7
                    },
                    {
                        date:'2018年7月',
                        count: 5
                    },
                    {
                        date:'2018年6月',
                        count: 4
                    },
                    {
                        date:'2018年5月',
                        count: 2
                    },
                    {
                        date:'2018年4月',
                        count: 2
                    },
                    {
                        date:'2018年3月',
                        count: 2
                    },
                    {
                        date:'2018年2月',
                        count: 2
                    },
                    {
                        date:'2018年1月',
                        count: 2
                    },
                    {
                        date:'2017年12月',
                        count: 2
                    },
                    {
                        date:'2017年11月',
                        count: 2
                    },
                    {
                        date:'2017年10月',
                        count: 2
                    },
                    {
                        date:'2017年9月',
                        count: 2
                    },
                    {
                        date:'2017年8月',
                        count: 2
                    },
                    {
                        date:'2017年7月',
                        count: 2
                    },
                    {
                        date:'2017年6月',
                        count: 2
                    },
                    {
                        date:'2017年5月',
                        count: 2
                    },
                    {
                        date:'2017年4月',
                        count: 2
                    },
                ],
            };
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .vue
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
            .vue__left
                flex: 1
                margin-right: 15px
                .vue-article
                    display: block
                    h1
                        padding: 11px 15px 10px;
                        border-bottom: 1px solid #eaeaea;
                        background-color: #fbfbfb;
                        font-weight: 400;
                        font-size: 18px;
                        color: #555
                    .vue
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
                        .vue_left
                            flex: 0 0 220px
                            margin-right: 20px
                            display: flex
                            align-items: center
                            cursor: pointer
                            img
                                width: 220px
                                height: 150px
                        .vue_right
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
            .vue__right
                flex: 0 0 290px
                .click-ranking
                    h3
                        padding: 11px 15px 10px;
                        border-bottom: 1px solid #eaeaea;
                        background-color: #fbfbfb;
                        font-weight: 400;
                        font-size: 18px;
                        color: #555
                    .click
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
                        .click__left
                            margin-right: 10px
                            flex: 0 0 80px
                            > img
                                width: 80px
                        .click__right
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
                .file-archive
                    margin-top: 10px
                    h3
                        padding: 11px 15px 10px;
                        border-bottom: 1px solid #eaeaea;
                        background-color: #fbfbfb;
                        font-weight: 400;
                        font-size: 18px;
                        color: #555
                    .file
                        cursor: pointer
                        background-color: #fff
                        margin-bottom: 1px
                        padding: 10px 15px
                        .file__date
                            color: #555
                        &:hover
                            background-color: #f5fcee
                            .file__date
                                color: #67C23A !important

</style>
