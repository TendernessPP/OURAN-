/**
 * 以对象调用字符串的形式获取 target 中的值
 * @param target
 * @param key （e.g. 'name.value'）
 * @returns {string}
 */
export function getKeyValue(target, key) {
    let res  = '';
    let keys = key.split('.');
    keys.forEach(key => {
        if (typeof target === 'object') {
            target = target[key];
        }
        res = target;
    });
    return res;
}

