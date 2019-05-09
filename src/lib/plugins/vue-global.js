import Vue from 'vue';
import {
    isMobile,
    log,
    isAttrDefined
} from '../../utils/utils';

import {
    DEBUG
} from '../../conf/app.conf';
import {
    isArray,
    isNumber,
    isString
} from './validation';
import {LANGUAGE} from '../../conf/lang.conf';

export function init() {

// 挂载到 Vue.prototype 上
    if (!isAttrDefined(Vue.prototype, '$utils')) {
        Vue.prototype.$utils = require('../../utils/utils');
    }

    if (!isAttrDefined(Vue.prototype, '$conf')) {
        Vue.prototype.$conf     = {};
        Vue.prototype.$conf.api = require('../../conf/api.conf');
        Vue.prototype.$conf.app = require('../../conf/app.conf');
    }


    /** 变量 **/
    if (DEBUG) {
        Vue.prototype.$window = window;
    }
    // 存储页面语言
    Vue.prototype.$currentLanguage = 'cn';

    // 是否为mobile
    Vue.prototype.$isMobile = isMobile;
    /** 方法 **/
    /**
     * 跳转路由
     * @param pageRoute {string|object} 跳转的前端路由地址字符串或对象
     * @param needNative {boolean} 是否需要原生支持
     * @param openInNewTab {boolean} 是否需要新窗口打开
     */
    Vue.prototype.$goRoute = function(pageRoute, needNative = false, openInNewTab = false) {
        if (openInNewTab) {
            // console.log(pageRoute);
            let href = this.$router.resolve(pageRoute).href;
            window.open(href, '_blank');
        }
        else {
            if (pageRoute) {
                log('Using vue router to go page!');
                this.$router.push(pageRoute);
            }
        }
    };

    /**
     * 获取随机时间戳
     * @returns {number}
     */
    Vue.prototype.$getRandomTime = function() {
        return (Math.random() + '').slice(2) + new Date().getTime();
    };

    Vue.prototype.$gl = getLanguage;

    /**
     * 存储当前语言到 localStorage
     * @param value
     */
    Vue.prototype.$setCurrentLangType = function(value) {
        window.localStorage.setItem('currentLangType', JSON.stringify(value));
    };
    /**
     * 获取当前语言 localStorage
     */
    Vue.prototype.$getCurrentLangType = function() {
        return JSON.parse(window.localStorage.getItem('currentLangType'));

    };

}

/**
 * get language
 * 获取 item 的当前语言下的 text
 * @param item
 * @returns {*}
 */
export function getLanguage(item) {
    let res = item;
    if (item) {
        let langType = this && this.$store
            ? this.$store.state.currentLangType
            : LANGUAGE.type;
        if (langType && item.lang) {
            res = item.lang[langType];
            res = isNumber(res) ? res.toString() : res;
            if (isString(res)) {
                item.text = res;
            }
        }
        if (isString(item)) {
            let str = item;
            item    = {};
            res     = item.text = str;
        }
        if (item.hasOwnProperty('text')) {
            res = item.text;
        }
    }
    return res;
}
