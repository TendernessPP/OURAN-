import {api} from '../../api/api';
import {filters} from '../../filters/filters';
import {
    isString,
    isArray,
    isObject,
    isFunction,
    isEmpty
} from '../plugins/validation';
import {DEFAULT_LANGUAGE_TYPES} from '../../conf/lang.conf';
import {getValueByKeyStr} from '../plugins/get-value';
import {createSpansHtml} from '../plugins/dom';

export class Base {
    constructor(defaultOpts, opts) {
        Object.assign(this, defaultOpts || {}, opts);
    }

    static __defineProperty__(target, key, defaultValue, afterSet) {
        let currentVale = defaultValue;
        Object.defineProperty(target, key, {
            get () {
                console.log(currentVale, key);
                return currentVale;
            },
            set (newValue) {
                if (newValue === currentVale) return;
                currentVale = newValue;
                afterSet && afterSet(newValue);
            }
        });
    }

    __defineThisProperty__(key, defaultValue, afterSet) {
        Base.__defineProperty__(this, key, defaultValue, afterSet);
    }
}

export class Component extends Base {
    constructor(defaultOpts, opts) {
        super(Object.assign({
            vm       : null,
            apiModule: '', // api 模块名，对应自定义 api.js 中 api 对象下的属性名
            apiData  : {}, // 备份的 api 数据
            apiValue : undefined, // 可能有的表单值 api 数据
            apiTypes : ['create', 'delete', 'update', 'get'],
            text     : '',
            lang     : {
                en: '',
                cn: '' // zh
            },
            className: '',
            style    : '',
            select   : false,
            type     : '',
            valueKey : '', // 对应 api 接口参数 key 值
            value    : '',
            isActive : true // 是否被激活
        }, defaultOpts), opts);
        if (this.apiModule) {
            this.__bindApiTypeFn__();
        }
        let needDisplayStrKeys = ['text', 'title'];
        this.__bindLanguageKey__(needDisplayStrKeys);
    }

    async __getApiDataList__( params = {}) {
        params       = Object.assign({page: 1}, params);

       /* let apiData  = await api[apiModule].getItems(params);*/ // 获取 api 数据
        let apiData = await api.getWebOrderList.getItems(params);
        let data     = apiData.data;
        this.apiData = Object.assign({}, data); // 备份到 this.apiData 上
        return data;
    }
    async __getTableApiDataList__( params = {}) {
        params       = Object.assign({page: 1}, params);

        /* let apiData  = await api[apiModule].getItems(params);*/ // 获取 api 数据
        let apiData = await api.getOrderDetail.get(params);
        let data     = apiData.data;
        this.apiData = Object.assign({}, data); // 备份到 this.apiData 上
        return data;
    }

    __bindApiTypeFn__(beforeGet, afterGet) {
        this.apiTypes.forEach(type => {
            this[`${type}Item`] = this.__createApiFn__(type, beforeGet, afterGet);
        });
    }

    __createApiFn__(type, beforeGet, afterGet) {
        return async (params, paramKeys, paramValues, apiPath) => {
            beforeGet && beforeGet(params, apiPath);
            let data = await api[this.apiModule][type](params, paramKeys, paramValues, apiPath);
            afterGet && afterGet(data);
            return data;
        };
    }

    /**
     * 将 target 对象上 keys 中对应的值转化为新的值，可以通过指定 filter 进行转换
     * @param target
     * @param keys target 的属性和 filter 方法或者处理函数 | (key, [key], [key, (filter | filterFn), opts], {name, filter, opts})
     *        opts 为绑定到每个 tbody 单项上的属性，对象是为 opts 属性， 数组时为 keys[2]
     * @param afterEvery 每个循环结束时可以进行的钩子函数
     * @private
     */
    __formatTargetKeys__(target, keys, afterEvery) {
        keys.forEach((key, index) => {
            let res        = '';
            let keyName    = key;
            let filterName = '';
            if (isString(key)) {
                res = getValueByKeyStr(target, key);
            }
            if (isObject(key)) {
                keyName          = key.name;
                filterName       = key.filter;
                let formatFilter = () => {
                    let filter = filters[filterName];
                    if (isFunction(filterName)) {
                        filter = filterName;
                    }
                    return filter;
                };
                if (keyName) {
                    if (filterName) {
                        let filter = formatFilter();
                        res        = filter(getValueByKeyStr(target, keyName), target, keyName,index);
                    }
                    else {
                        res = getValueByKeyStr(target, keyName);
                    }
                }
                else if (filterName) {
                    let filter = formatFilter();
                    res        = filter('', target, keyName, index);
                }
            }
            if (isArray(key)) {
                keyName          = key[0];
                filterName       = key[1];
                let formatFilter = () => {
                    let filter = filters[filterName];
                    if (isFunction(key[1])) {
                        filter = key[1];
                    }
                    return filter;
                };
                if (key[0]) {
                    if (key[1]) {
                        let filter = formatFilter();
                        res        = filter(getValueByKeyStr(target, keyName), target, keyName, index);
                    }
                    else {
                        res = getValueByKeyStr(target, keyName);
                    }
                }
                else if (filterName) {
                    let filter = formatFilter();
                    res        = filter('', target, keyName, index);
                }
            }
            afterEvery && afterEvery(res, keyName, index);
        });
    }

    __setLanguage__(value, key, language, langTypes = DEFAULT_LANGUAGE_TYPES) {
        let splitKeyArr = key.split('_');
        let langType    = splitKeyArr[splitKeyArr.length - 1];
        langTypes.forEach(type => {
            if (type === langType) {
                language[langType] = value;
            }
        });
        if (!langTypes.find(type => type === langType)) {
            language.en = value;
        }
    }

    /**
     * 将 valueItems 每一项的 value，映射为一个新的 obj，可以通过指定 filter 进行处理
     * @param valueItems
     * @param keys target 的属性和 filter 方法和指定的 value(有 filter 时会被 filter 处理) | [key, [key], [key, filter], [key, filter, value]]
     * @private
     */
    __formatValueItemsToObj__(valueItems, keys) {
        let res = {};
        keys.forEach((key, index) => {
            let keyName = key;
            let item    = valueItems[index];
            let value   = item.value;

            let filterName = '';
            if (isString(key)) {
                res[keyName] = value;
            }
            if (isObject(key)) {
                keyName      = key.name;
                filterName   = key.filter;
                res[keyName] = filters[filterName](value);
            }
            if (isArray(key)) {
                if (key[0]) {
                    if (isArray(key[0])) {
                        let keyNames = key[0];
                        if (item.type === 'inputs') {
                            keyNames.forEach((subKeyName, index) => {
                                let keyName = subKeyName;
                                let target  = item.items[index];
                                let value   = item.items[index].value;
                                if (key[2]) {
                                    if (isString(key[2])) {
                                        value = key[2]; // 如果 keys 数组中有指定的 value，优先 keys 数组中的 value
                                    }
                                    if (isArray(key[2])) {
                                        value = key[2][index];
                                    }
                                }
                                if (key[1]) {
                                    filterName   = key[1];
                                    res[keyName] = filters[filterName](value, res, keyName, index);
                                }
                                else {
                                    res[keyName] = value;
                                }
                            });
                        }
                    }
                    if (isString(key[0])) {
                        if (key[2]) {
                            value = key[2]; // 如果 keys 数组中有指定的 value，优先 keys 数组中的 value
                        }
                        keyName = key[0];
                        if (key[1]) {
                            filterName   = key[1];
                            res[keyName] = filters[filterName](value, res, keyName, index);
                        }
                        else {
                            res[keyName] = value;
                        }
                    }
                }
            }
        });
        return res;

    }

    __bindLanguageKey__(needDisplayStrKeys) {
        needDisplayStrKeys.forEach(key => {
            if (isFunction(this[key])) {
                let target = null;
                if (!isEmpty(this.vm)) {
                    target = this.vm;
                }
                this[key](target, this, key);
            }
        });
    }

    created() {

    }

    /**
     * 处理 value 值，并返回处理后的值，
     * 可以在初始时按需定义，
     * 但是注意 value 会在页面上实时显现，故不能直接修改 value 值，
     * 需要返回一个新值，默认为 value 值。
     * 如果 value 为引用类型，需要注意返回一个复制的值，避免后续操作修改 value 导致页面显示出现问题。
     * 默认情况下值会在 getApiKeyValue 中调用。
     */
    formatValueToApiValue() {
        return this.value;
    }

    /**
     * 将 apiValue 的值处理为对应的 value 值
     * @param apiValue api 数据
     * @param component 当前对象
     * @returns {*}
     */
    formatApiValueToValue(apiValue, component) {
        return apiValue;
    }

    /**
     * 获取接口需要的键值形式对象
     * @returns {{}}
     */
    getApiKeyValue() {
        let obj = {};
        if (this.valueKey) {
            obj[this.valueKey] = this.formatValueToApiValue(this);
        }
        console.log(obj);
        return obj;
    }

    /**
     * 从 api 数据中设置 valueKey 对应的 value 值
     * @param apiData
     */
    setValueFromApiData(apiData, component) {
        // console.log(apiData,this.valueKey,this)
        this.value = this.apiValue = this.formatApiValueToValue(apiData[this.valueKey], this);
    }
}

export class Info extends Base {
    constructor(opts) {
        super({
            vm   : {},
            items: []
        }, opts);
    }

    toString() {
        return createSpansHtml(this.items, this.vm);
    }
}
