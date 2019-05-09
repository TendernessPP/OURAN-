/**
 * 重置对象属性
 * @param obj
 * @param attrName
 * @param attrValue
 * @param callback 回调
 */
export function resetObjAttr(obj, attrName, attrValue, callback) {
    obj[attrName] = attrValue;
    callback && callback(obj);
}

/**
 * 重置多个对象的指定属性
 * @param objs
 * @param attrName
 * @param attrValue
 * @param callback 回调
 */
export function resetObjsAttr(objs, attrName, attrValue, callback) {
    objs.forEach((obj) => {
        resetObjAttr(obj, attrName, attrValue);
    });
    callback && callback(objs);
}

/**
 * 重置 isShow 属性
 * @param obj
 * @param value
 * @param callback 回调
 */
export function resetObjIsShow(obj, value, callback) {
    resetObjAttr(obj, 'isShow', value, callback);
}

/**
 * 重置多个对象的 isShow 属性
 * @param objs
 * @param value
 * @param callback 回调
 */
export function resetObjsIsShow(objs, value, callback) {
    resetObjsAttr(objs, 'isShow', value, callback);
}