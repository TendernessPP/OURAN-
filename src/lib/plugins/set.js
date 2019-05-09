import {
    isArray,
    isEmpty,
    isObject
} from './validation';

/**
 * 为指定对象的对应 key 设置对应值
 * @param keys
 * @param values
 * @param target 未指定时新建一个对象 {Object}
 * @returns {{}}
 */
export function setKeysValue(keys = [], values = [], target = {}) {
    if (isObject(target)) {
        if (!isEmpty(keys) || !isEmpty(values)) {
            if (!isArray(keys) || !isArray(values)) {
                throw new TypeError('params "keys" and "values" should be an Array!');
            }
        }
        keys.forEach((key, index) => {
            target[key] = values[index];
        });
    }
    else {
        console.warn('target must be a target!');
        target = {};
    }
    return target;
}

