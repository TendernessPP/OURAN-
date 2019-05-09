import Vue from 'vue';
import {
    LOGIN_URL,
    PICTURE_ADDRESS_URL
} from '@/conf/api.conf';
import placeholderImage from '@/static/images/placeholder.png';

export * from '@/lib/plugins/validation';
export * from '@/lib/plugins/toast';
export * from '@/lib/plugins/log';
export * from '@/lib/plugins/dom';
export * from '@/lib/plugins/storage';
export * from '@/lib/plugins/merge';
export * from '@/lib/plugins/vuex-plugins';
export * from '@/lib/plugins/resetObj';
export * from '@/lib/plugins/set';
export * from './auth';

/**
 * 交换对象属性值
 * @param obj
 * @param attrNames 交换对象属性名称数组
 */
export function exchangeObjAttrsValue(obj, attrNames) {
    let temp          = obj[attrNames[0]];
    obj[attrNames[0]] = obj[attrNames[1]];
    obj[attrNames[1]] = temp;
}

export let getFileName = (file_path) => {
    let val = String(file_path);
    let arr = val.split('/');
    console.log(arr);
    return arr[arr.length-1];
}

export let getPictureUrl = (path) => {
    if (path) {
        return PICTURE_ADDRESS_URL + path;
    }
};

export let getSmallPictureUrl = (src, needPlaceholderImage = true) => {
    if (src) {
        return PICTURE_ADDRESS_URL + 's' + src;
    }
    else {
        return needPlaceholderImage ? placeholderImage : '';
    }
};

export let getLargePictureUrl = (src, needPlaceholderImage = true) => {
    if (src) {
        return PICTURE_ADDRESS_URL + 'l' + src;
    }
    else {
        return needPlaceholderImage ? placeholderImage : '';
    }
};

export let getOriginalPictureUrl = (src, needPlaceholderImage = true) => {
    if (src) {
        return PICTURE_ADDRESS_URL + 'original' + src;
    }
    else {
        return needPlaceholderImage ? placeholderImage : '';
    }
};

/**
 * 复制目标对象指定 key 的 key-value 对象
 * @param target 目标函数
 * @param key 指定 key
 * @returns {*} 新对象
 */
export function copyObjTargetKeyValue(target, key) {
    let obj  = {};
    obj[key] = target[key];
    return obj;
}


