/**
 * 深度拷贝
 * @param data
 * @returns {*}
 */
export const deepClone = (data) => {
    let type = _typeof(data), result;

    if (type === 'array') {
        result = [];
        for (let i = 0; i < data.length; i++) {
            result.push(deepClone(data[i]));
        }
        return result;
    }
    else if (type === 'object') {
        result = {};
        for (let key in data) {
            result[key] = deepClone(data[key]);
        }
        return result;
    }
    else {
        return data;
    }
};

/**
 * 递归合并两个对象
 * @param base
 * @param extend
 * @param isDepBaseAttr {boolean} 是否依据 base 所具有的属性进行合并，默认为 false
 * @returns {*}
 */
export const mergeTwoObject = (base, extend, isDepBaseAttr = false) => {
    if (_typeof(base) !== 'object')
        return extend;

    let depObj = extend;
    if (isDepBaseAttr) {
        // 是否依据 base 所具有的属性进行合并
        depObj = base;
    }

    for (let key in depObj) {
        // 如果 extend 对象属性为 undefined 或 null 时，不合并，取 base 对象中的属性
        if (extend[key] == null) continue;
        if (_typeof(base[key]) === 'object' && _typeof(extend[key]) === 'object') {
            base[key] = mergeTwoObject(base[key], extend[key]);
        }
        else {
            base[key] = extend[key];
        }
    }
    return base;
};

/**
 * 递归合并多个对象
 * @param args
 * @returns {*}
 */
export const merge = (...args) => {
    return _merge(true, ...args);
};

/**
 * 合并多个对象
 * @param recursive {boolean} 是否递归合并（深合并），默认为 true
 * @param args
 * @returns {*}
 */
const _merge = (recursive, ...args) => {
    let result = args[0],
        size   = args.length;

    if (_typeof(result) !== 'object') {
        result = {};
    }

    for (let i = 0; i < size; ++i) {
        let item = args[i],
            type = _typeof(item);

        if (type !== 'object') {
            continue;
        }

        for (let key in item) {
            if (recursive) {
                result[key] = mergeTwoObject(result[key], item[key]);
            }
            else {
                result[key] = item[key];
            }
        }
    }
    return result;
};

/**
 * 获取类型
 * @param data
 * @returns {string}
 * @private
 * @see http://jsperf.com/typeofva
 */
const _typeof = (data) => {
    return ({}).toString.call(data).slice(8, -1).toLowerCase();
};
