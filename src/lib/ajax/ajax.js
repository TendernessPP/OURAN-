import {httpRequest} from './http-request';
import progressBar from '@/lib/plugins/progress-bar';
import {
    RETURN_OK,
    ERROR_CODES_MAP,
    RETURN_ERR_OTHER_MSG,
    LOGOUT_URL,
    ERR_LOGIN
} from '@/conf/api.conf';

import {
    toast
} from '@/utils/utils';
import {getLanguage} from '@/lib/plugins/vue-global';

import Vue from 'vue'
import { Message } from 'element-ui';
Vue.prototype.$message = Message;

const needLanguages = true; // 是否需要多语言

/**
 * api 调取接口
 * @param url 请求地址
 * @param params 请求参数（对象）
 * @param options ajax 函数的一些配置
 * @param axiosOptions axios 配置
 * @returns {Promise}
 */
export const ajax = async (url, params = {}, options = {}, axiosOptions = {}) => {
    options = Object.assign({
        needTk              : true, // 是否需要 tk
        openProgressBar     : true, // 是否需要打开进度条
        needToast           : false, // 是否需要自动 toast 信息
        specialErrorCodesMap: []
    }, options, axiosOptions);
    if (options.openProgressBar) progressBar.startProgress();
    let res  = await httpRequest(url, params, {
        ...axiosOptions, needTk: options.needTk,webTX:options.webTX
    });
    res.code = String(res.code);
    if (res.code === RETURN_OK) {
        if (options.openProgressBar) progressBar.finishProgress();
        return res;
    }
    // else if (res.code === ERR_LOGIN) {
    //     // 登陆失败跳转到登录页
    //     toastErrorMsg(ERR_LOGIN);
    //     setTimeout(() => window.location.href = LOGOUT_URL, 2000);
    // }
    else {
        if (options.openProgressBar) progressBar.failProgress();
        if (options.specialErrorCodesMap.length > 0) {
            if (options.needToast) {
                toastSpecialErrorMsg(res.code, options.specialErrorCodesMap);
            }
            console.log(res);
            return res;
        }
        else {
            if (options.needToast) {
                toastErrorMsg(res.code);
            }
            console.log(res.code);
            return res;
        }
    }
};

/**
 * 获取返回code的对应massage
 * @param code
 * @param codesMap
 * @param defaultMsg
 * @returns {string}
 */
const getCodeMsg = (code, codesMap, defaultMsg = '') => {
    let codeItem = codesMap.find(item => item.code === String(code));
    let msg      = defaultMsg;
    if (codeItem !== undefined) {
        if (needLanguages) {
            msg = getLanguage(codeItem.msg);
        }
    }
    return msg;
};

/**
 * 弹出错误信息（一般情况）
 * @param code
 * @param errorCodesMap
 * @param defaultErrorMsg
 */
const toastErrorMsg = (code, errorCodesMap = ERROR_CODES_MAP, defaultErrorMsg = RETURN_ERR_OTHER_MSG) => {
    let codeMsg = getCodeMsg(code, errorCodesMap, defaultErrorMsg);
    console.log(codeMsg);
    this.$message.error(codeMsg);
    // toast(codeMsg);
};

/**
 * 弹出错误信息（特殊情况）
 * @param code
 * @param specialErrorCodesMap
 */
const toastSpecialErrorMsg = (code, specialErrorCodesMap) => {
    let codeMsg = getCodeMsg(code, specialErrorCodesMap);
    console.log(codeMsg);
    if (codeMsg !== '') {
        toast(codeMsg);
    }
    else {
        toastErrorMsg(code);
    }
};

