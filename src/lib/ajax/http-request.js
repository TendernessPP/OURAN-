import axios from 'axios';
import qs from 'qs';
import {
    API_TYPE,
    BASE_URL,
    ERR_NETWORK,
    LOGIN_URL,
    TX_API_URL
    // ERR_LOGIN
} from '@/conf/api.conf';
import {api} from '@/api/api';
import {
    isObject,
    isString
} from '@/lib/plugins/validation';
import {ERR_NETWORK_MSG} from '@/conf/api.conf';
import {toast} from '@/utils/utils';

/**
 * 基于 axios 的 http 请求，默认方式为 post
 * @param url 请求地址
 * @param params 请求参数（对象）
 * @param options axios 配置
 * @returns {Promise.<TResult>}
 */
export const httpRequest = (url, params = {}, options = {}) => {
    options = Object.assign({
        needTk      : true,
        needFormData: false
    }, options);
    // 过期
    // if (options.needTk) {
    //     if (isExpired()) {
    //         return new Promise();
    //     }
    // }
    let data = formatParams(params, options);
    console.log(data, options.method);
    // 支持 get
    url = options.method === 'get' ? `${url}?${data}` : url;

    let baseURL = setBaseURL(options);

    delete options.needTk;
    delete options.apiType;
    return axios(Object.assign({
        method         : 'post',
        responseType   : 'json',
        withCredentials: true, // 跨域是否需要凭证，决定 set-cookie 后是否有效
        baseURL,
        url,
        data
        // timeout        : 5000
    }, options))
    .then(res => {
        // if (res.data.status === ERR_LOGIN) {
        //     goLogin();
        // }
        return res.data;
    })
    .catch(err => {
        return {
            code: ERR_NETWORK,
            data: err
        };
    });
};

function setBaseURL(options) {
    let baseURL = '';
    if (API_TYPE) {
        baseURL = BASE_URL + (options.apiType
            ? options.apiType
            : API_TYPE) + '/';
    }
    if (API_TYPE&&options.webTX){
        baseURL = TX_API_URL;
    }
    console.log(baseURL);
    return baseURL;
}

function formatParams(params, options) {
    let data = params;
    if (isObject(params)) {
        if (options.needTk) {
            params.tk = api.tk;
        }
        data = qs.stringify(params);
        if (options.needFormData) {
            data = objToFormData(params);
        }
    }
    else if (params instanceof FormData) {
        // if (options.needTk) {
        //     params.append('tk', api.tk);
        // }
        data = params;
    }
    else if (isString(params)) {
        data = params;
    }
    return data;
}

/**
 * 对象到 form 数据
 * @param obj 目标对象
 * @returns {*}
 */
function objToFormData(obj) {
    let formData = obj || {};
    if (window) {
        formData = new FormData;
        Object.keys(obj).forEach(key => {
            if (Array.isArray(obj[key])) {
                obj[key].forEach(item => {
                    appendFromDataValue(formData, key, item);
                });
            }
            else {
                appendFromDataValue(formData, key, obj[key]);
            }
        });
    }

    function appendFromDataValue(formData, key, value) {
        formData.append(key, value == null ? '' : value);
    }

    return formData;
}

export function goLogin() {
    location.href = LOGIN_URL;
}

export function resetLogoutConf() {
    localStorage.removeItem('vuexStore');
    api.tk      = undefined;
    api.oldTime = undefined;

}

/**
 * 是否过期
 * @param duration 过期时间
 * @returns {boolean}
 */
function isExpired(duration = 60 * 60 * 1000) {
    let oldTime = api.oldTime;
    let newTime = new Date();
    if (!oldTime) {
        api.oldTime = newTime;
    }
    else {
        let diff = newTime - oldTime;
        if (diff > duration) {
            if (window) {
                resetLogoutConf();
                goLogin();
                toast('Token 过期，请重新登陆!');
                return true;
            }
        }
        else {
            api.oldTime = newTime;
            return false;
        }
    }
}
