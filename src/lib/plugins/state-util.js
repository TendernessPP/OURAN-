/**
 * 改变state对象中的对应项
 * @param state
 * @param value
 * @param key
 */
export const changeState          = (state, [value, key]) => {
    state[key] = value;
};
/**
 * 改变state对象中指定属性中的属性值
 * @param stateKey
 * @param state
 * @param value
 * @param key
 */
export const changeStateAttrValue = (state, [stateKey, value, key]) => {
    state[stateKey][key] = value;
};