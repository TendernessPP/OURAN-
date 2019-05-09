const VUEX_STORE_KEY = 'vuexStore';
import {
    mergeTwoObject,
    deepClone,
    log
} from '../../utils/utils';

/**
 * 创建唯一标识
 * @returns {string}
 */
export const createGUID = () => {
    let d = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d     = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
};

/**
 * 同步更新vuex状态到localStorage的vuex插件
 * @param store
 */
export const syncStoreDataToWebStorage = store => {
    // 当 store 初始化后调用
    store.subscribe((mutation, state) => {
        // 每次 mutation 之后调用
        const vuexStoreGUID = createGUID();
        setVuexStore({GUID: vuexStoreGUID, data: state});
    });
};

/**
 * 设置指定的 store state 值到 localStorage 的 vuex 插件
 * @param keys
 */
export const setTargetStoreStatesToWebStorage = (keys) => {
    return (store) => {
        // 当 store 初始化后调用
        store.subscribe((mutation, state) => {
            // 每次 mutation 之后调用
            const vuexStoreGUID = createGUID();
            let data            = {};
            keys.forEach(key => {
                data[key] = state[key];
            });
            setVuexStore({GUID: vuexStoreGUID, data});
        });
    };
};
/**
 * 从 localStorage 获取 vuexStorage
 * @returns {boolean}
 */
export const getVuexStore                     = () => {
    let vuexStore = window.localStorage.getItem(VUEX_STORE_KEY);
    if (vuexStore) {
        return JSON.parse(window.localStorage.getItem(VUEX_STORE_KEY));
    }
    else {
        return false;
    }
};

/**
 * 向 localStorage 设置 vuexStorage
 * @param vuexStoreValue
 */
export const setVuexStore = (vuexStoreValue) => {
    window.localStorage.setItem(VUEX_STORE_KEY, JSON.stringify(vuexStoreValue));
};

/**
 * 是否需要从 localStorage 中取得 vuex store
 * @param store
 * @param needLocalVuexStoreState
 */
export const whetherNeedLocalVuexStore = (store, needLocalVuexStoreState = false) => {
    if (!needLocalVuexStoreState) return;
    let localVuexStore = getVuexStore();
    if (localVuexStore) {
        // 如果localStorage有vuexStore则替换vuex的store
        let copyNewStore = deepClone(store.state);
        log(copyNewStore, 'copyNewStore');
        store.replaceState(mergeTwoObject(copyNewStore, localVuexStore.data, true));
        log(store.state, 'fromLocalVuexStore');
    }
};