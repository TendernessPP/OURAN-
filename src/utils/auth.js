/**
 *
 * @param menuKey {String} 模块权限
 * @param authKey {String} 模块具体权限
 * @param realAuthArray {Array} 每个权限对应的权限数组
 * @param userAuthArray {Array} 用户具有权限或者需要验证的权限（包含多个 realAuthArray 的数组）
 * @returns {boolean}
 */
export function isAuthArrayEqual(menuKey, authKey, realAuthArray, userAuthArray) {
    let result = false;
    if (Array.isArray(userAuthArray) && userAuthArray.length) {
        userAuthArray.forEach(apiAuth => {
            // 例如 用户权限数组中具有访问权限的一个权限，则具有所有访问的所有权限。
            if (apiAuth.indexOf(`,${menuKey.trim()},${authKey.trim()}`) !== -1) {
                // console.log(userAuthArray, apiAuth, menuKey, authKey);
                result = true;
                return;
            }

        });
    }
    else {
        return false;
    }
    return result;
}

/**
 * 获取权限数组
 * @param authKey 具体权限名
 * @param menuAuthObj 权限定义对象
 * @param menuKey 权限模块名
 * @returns {*}
 */
export function getAuthArray(authKey, menuAuthObj, menuKey) {
    let {isString} = require('@/utils/utils');
    // console.log(menuAuthObj)
    let authArray  = menuAuthObj[authKey]; // 需要提交权限数组
    if (isString(authArray)) {
        authArray = [authArray];
    }
    if (!Array.isArray(authArray)) {
        authArray = [];
    }
    authArray = authArray.map(auth => `${auth.trim()},${menuKey.trim()},${authKey.trim()}`);
    // console.log(authArray, authKey, menuAuthObj, menuKey);
    return authArray;
}

export class MenuItemAuthObj {
    /**
     * 生成权限对象
     * @param initAllTrueOrFalse 初始所有权限为 true 或 false
     * @param obj 自定义权限对象
     */
    constructor(initAllTrueOrFalse = true, obj) {
        Object.assign(this, {
            list  : initAllTrueOrFalse,
            detail: initAllTrueOrFalse,
            edit  : initAllTrueOrFalse,
            create: initAllTrueOrFalse,
            delete: initAllTrueOrFalse,
            check : initAllTrueOrFalse
        }, obj);

    }
}
