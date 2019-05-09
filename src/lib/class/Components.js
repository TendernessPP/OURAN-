import {toast} from '../plugins/toast';
import {api} from '../../api/api';
import {deepClone} from '../plugins/merge';
import {
    Component,
    Info
} from './Base';
import {
    isArray,
    isEmpty,
    isNumber,
    isObject,
    isString
} from '../plugins/validation';
import {resetObjsAttr} from '../plugins/resetObj';

import {filters} from '../../filters/filters';
import {
    DEFAULT_LANGUAGE_TYPES,
    LANGUAGE
} from '../../conf/lang.conf';
import {propertyIsRequired} from '../plugins/error';

export class Btn extends Component {
    constructor(opts) {
        super({
            name       : '',
            displayForm: ''
        }, opts);
    }

    onclick() {}
}

export class FormPart extends Component {
    constructor(opts) {
        super({
            type         : 'auto',
            rowCounts    : 1,
            itemDirection: 'column',
            items        : [
                new FormItem()
            ],
            operation    : new Operation()
        }, opts);
        this.__bindSomeToItems__();
    }

    /**
     * 给每个 item 绑定数据
     */
    __bindSomeToItems__() {
        let bindPartToItem = item => item.part = this; // 将 part 绑到 item 上
        let bindItemIndex = (item, index) => item.itemIndex = index; // 将 index 绑到 item 上
        this.items.forEach((item, index) => {
            bindPartToItem(item);
            bindItemIndex(item, index);
        });
    }

    created() {

    }

    /**
     * 获取该部分接口需要的键值形式对象
     * @returns {{}}
     */
    getApiKeyValues() {
        let obj = {};
        if (this.type === 'table-authEdit') {
            obj = this.getApiKeyValue();
            console.log(obj);
        }
        else if (this.type === 'person-group') {
            obj = this.getApiKeyValue();
            console.log(obj);
        }
        else {
            this.items.forEach(item => {
                let params = item.getApiKeyValue();
                Object.assign(obj, params);
            });
        }
        return obj;
    }

    /**
     * 从 api 数据中设置该部分每个 item 的 valueKey 对应的 value 值
     * @param apiData
     */
    setValuesFromApiData(apiData) {
        if (this.type === 'table-authEdit') {
            this.setValueFromApiData(apiData, this);
        }
        else if (this.type === 'person-group') {
            this.setValueFromApiData(apiData, this);
        }
        else if (this.type === 'password') {
            this.items.forEach(item => {
                item.setValueFromApiData(apiData.data, this, item);
            });
        }
        else {
            this.items.forEach(item => {
                item.setValueFromApiData(apiData, this, item);
            });
        }
    }
}

export class FormItem extends Component {
    constructor(opts) {
        super({
            isShow     : true,
            isNecessary: false,
            title      : '',
            type       : 'input',
            valueKey   : '', // 对应 api 接口参数 key 值
            value      : '',
            placeholder: '',
            itemIndex  : undefined, // 所在 part 的计数
            required   : '' // {String | Object({required:{warning:''}})}
        }, opts);
    }

    /**
     * 获取上一个项
     */
    getPrevItem() {
        return this.part.items[this.itemIndex - 1];
    }

    /**
     * 获取下一个项
     */
    getNextItem() {
        return this.part.items[this.itemIndex + 1];
    }

    setIsShow(isShow) {
        this.isShow = isShow;
    }

    hide() {
        this.isShow = false;
    }

    show() {
        this.isShow = true;
    }
}

export class Operation extends Component {
    constructor(opts) {
        super({
            width: '200px',
            items: [
                new Btn()
            ]
        }, opts);
    }

    setIsActive(flag = true) {
        this.btns.forEach(btn => {
            if (btn.isActive !== undefined) {
                btn.isActive = flag;
            }
        });
    }
}

export class Form extends Component {
    constructor(opts) {
        super({
            needSplitFormPart       : false, // 是否需要分离 parts （会将每个 part 部分形成新的 form）
            isMergePartsApiKeyValues: false, // 是否合并 formParts 的 keyValue 对象，默认不可并，以数组形式返回每个 part 的 keyValue 对象
            parts                   : [
                new FormPart()
            ]
        }, opts);
    }

    reset() {
        this.parts.forEach((part) => {
            part.items.forEach((item) => {
                item.value = '';
                if (part.type === 'upload-images' || part instanceof FormUploadImagesPart) {
                    item.items.forEach(imageItem => {
                        imageItem.value         = '';
                        imageItem.images[0].src = '';
                        if (imageItem.type === 'multi') {
                            imageItem.images[0].src = '';
                            imageItem.images.splice(1);
                        }
                    });
                }
            });
        });
    }

    /**
     * 设置激活状态
     * @param flag
     */
    setIsActive(flag = true) {
        this.isActive = flag;
        this.parts.forEach(part => {
            part.isActive = flag;
            part.items.forEach(item => {
                item.isActive = flag;
                if (part.type === 'upload-images' || part instanceof FormUploadImagesPart) {
                    item.items.forEach(imageItem => {
                        imageItem.isActive = flag;
                    });
                }
            });
        });
    }

    getPartsValues() {
        let partsValues = [];
        this.parts.forEach(part => {
            let values = part.items.map(item => item.value);
            partsValues.push(values);
        });
        return partsValues;
    }

    setPartsValues(partsValues, vm) {
        this.parts.forEach(part => {
            part.items.forEach((item, index) => vm.$set(item, 'value', partsValues[index]));
        });
    }

    getPartsKeyValues() {
        let result;
        this.parts.forEach(part => {
            let keyValues = part.getApiKeyValues();
            if (this.isMergePartsApiKeyValues) {
                if (!result) {
                    result = {};
                }
                Object.assign(result, keyValues);
            }
            else {
                if (!result) {
                    result = [];
                }
                result.push(keyValues);
            }
        });
        return Array.isArray(result) ? result : [result];
    }

    /**
     * 执行每一部分或者每一部分下小项的 created 函数
     * @returns {Promise.<*[]>}
     */
    async setPartsItemsCreated() {
        // 生成 created promise
        function createWaitFnCreatedPromise(target) {
            return new Promise(async resolve => {
                if (target.created) {
                    await target.created(target); // 等待执行完 created 后，再 resolve
                    resolve();
                }
            });
        }

        let createdFns = []; // 搜集 created promise

        this.parts.forEach(part => {
            if (part.type === 'table-authEdit') {
                createdFns.push(createWaitFnCreatedPromise(part.data));
            }
            if (part.type === 'person-group') {
                createdFns.push(createWaitFnCreatedPromise(part));
            }
            else {
                part.items.forEach((item) => {
                    createdFns.push(createWaitFnCreatedPromise(item));
                });
            }
        });
        // 等待所有的 Promise
        return Promise.all(createdFns);

    }

    /**
     * 向每一部分或者每一部分下小项上绑定 valueKey 对应的值
     * @param apiData
     */
    setPartsKeyValues(apiData) {
        this.parts.forEach(part => part.setValuesFromApiData(apiData));
    }

    validate(vm) {
        let parts = this.parts;
        for (let i = 0; i < parts.length; i++) {
            let part  = parts[i];
            let items = part.items;
            // console.log(part)
            if (part.type === 'table-authEdit') {
                // console.log(11111111);
                if (toastWarning(part, vm)) {
                    return false;
                }
            }
            if (part.type === 'person-group') {
                // console.log(11111111);
                if (toastWarning(part, vm)) {
                    return false;
                }
            }
            if (items) {
                for (let j = 0; j < items.length; j++) {
                    let item = items[j];
                    // 没有 value 时
                    // 并且需要警告
                    if (item.type === 'inputs' || part.type === 'upload-images' || part instanceof FormUploadImagesPart) {
                        let items = item.items;
                        for (let k = 0; k < items.length; k++) {
                            let item = items[k];
                            if (toastWarning(item, vm)) {
                                return false;
                            }
                        }
                    }
                    if(item.type === 'search-select'){
                        console.log(item.warn)
                    }
                    if (toastWarning(item, vm)) {
                        return false;
                    }
                }
            }

        }

        return true;

        function toastWarning(item, vm) {
            let isShow       = item.isShow === undefined ? true : item.isShow;
            let isEmptyValue = isEmpty(item.value);

            if (item.type === 'time-picker-between') {
                if (isEmpty(item.value)) {
                    isEmptyValue = true;
                }
                else {
                    isEmptyValue = isEmpty(item.value.from) || isEmpty(item.value.to);
                }
            }

            if (item.type === 'person-group') {
                if (isEmpty(item.persons)) {
                    isEmptyValue = true;
                }
                else {
                    isEmptyValue = false;
                }
            }

            if (isShow && isEmptyValue && item.required) {
                __toastWarning(vm, item);
                return true;
            }
            return false;

            function __toastWarning(vm, item) {
                let warning = vm.$gl(item.required) || vm.$gl(item.required.warning);
                toast(warning);
            }

        }
    }
}

export class Mask extends Component {
    constructor(opts) {
        super({
            needMask: false,
            title   : {
                text: ''
            },
            content : {
                type: 'form-part', // form-part | text
                data: new FormPart()
            }
        }, opts);
    }

    then(fn) {
        fn && fn(this);
        return this;
    }

    open(vm, vmDataKey = 'mask') {
        vm[vmDataKey] = this;
        this.needMask = true;
        return this;
    }

    close(vm, vmDataKey = 'mask') {
        this.needMask = false;
        if (vm) {
            vm[vmDataKey] = {};
        }
    }

    getItems(target, keys) {
        this.__formatTargetKeys__(target, keys, (res, key, index) => {
            let item = this.content.data.items[index];
            if (isObject(res)) {
                let lang = res.data;
                if (item instanceof FormLangInputsItem) {
                    ['en', 'cn'].forEach((langType, index) => {
                        item.items[index].value = lang[langType];
                    });
                }
                if (item instanceof FormAddInputsItem) {
                    item.value = res.data;
                }
            }
            if (isString(res)) {
                item.value = res;
            }

        });
        return this;
    };

    getItemsToObj(valueItems, keys) {
        return this.__formatValueItemsToObj__(valueItems, keys);
    }

    setDataFromTableTr(trData, mappingArr) {
        return new Promise(resolve => {
            let maskData = this.content.data;
            if (mappingArr) {
                mappingArr.forEach((trDataIndex, maskDataIndex) => maskData.items[maskDataIndex].value = trData[trDataIndex].text);
                resolve(maskData);
            }
            else {
                resolve(maskData);
            }
        });
    }

    reset() {
        this.close();
        if (this.content.type === 'text') {
            // this.content.data = '';
        }
        if (this.content.type === 'form-part') {
            this.content.data.items.forEach(item => {
                if (item.type === 'inputs') {
                    item.items.forEach(subItem => {
                        subItem.value = '';
                    });
                }
                else {
                    item.value = '';
                }
            });
        }
    }

    validate(vm) {
        let items = this.content.data.items;
        if (items) {
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                // 没有 value 时
                // 并且需要警告
                if (item.type === 'inputs') {
                    let flag = true;
                    item.items.forEach(item => {
                        if (flag) {
                            if (!item.value && item.required) {
                                toastWarning(item, vm);
                                flag = false;
                            }
                        }
                    });
                    if (!flag) {
                        return;
                    }
                }
                if (item.type === 'add-inputs') {
                    console.log(333333);
                    let flag   = true;
                    item.value = [
                        {
                            option_name_cn: '', option_name_en: '',
                            option_value  : ''
                        }
                    ];
                    if (item.isShow) {
                        item.items.forEach((subItem, index) => {
                            if (flag) {
                                let en = subItem.value.lang.en.toString();
                                let cn = subItem.value.lang.cn.toString();
                                if (en === '' || cn === '') {
                                    console.log(en, cn, '44444444');
                                    if (subItem.required) {
                                        toastWarning(subItem, vm);
                                    }
                                    else if (item.required) {
                                        toastWarning(item, vm);
                                    }
                                    flag = false;
                                }
                                else {
                                    if (index === 0) {
                                        item.value.splice(0);
                                    }
                                    item.value.push({en, cn});
                                }
                            }
                        });
                    }
                    if (!flag) {
                        return;
                    }
                }
                console.log('555555');
                if (isEmpty(item.value) && item.required) {
                    toastWarning(item, vm);
                    return;
                }
                console.log('66666');
            }
        }
        this.onsuccess(this);
        this.reset();

        function toastWarning(target, vm) {
            let warning = vm.$gl(target.required) || vm.$gl(target.required.warning);
            toast(warning);
        }
    }

    canceled() {
        this.oncancel();
        this.reset();
    }

    onsuccess() {}

    oncancel() {}

    async setPartsItemsCreated() {
        // 生成 created promise
        function createWaitFnCreatedPromise(target) {
            return new Promise(async resolve => {
                if (target.created) {
                    await target.created(target); // 等待执行完 created 后，再 resolve
                    resolve();
                }
            });
        }

        let createdFns = []; // 搜集 created promise
        this.content.data.items.forEach(item => {
                    createdFns.push(createWaitFnCreatedPromise(item));
        });
        // 等待所有的 Promise
        return Promise.all(createdFns);

    }
    setPartsKeyValues(apiData) {
        console.log(apiData);
        this.data.items.forEach(part => part.setValuesFromApiData(apiData));
    }
}

export class Table extends Component {
    constructor(opts) {
        super({
            apiModule: '', // api 模块名，对应自定义 api.js 中 api 对象下的属性名
            apiData  : {},
            title    : '',
            data     : {
                thead: [],
                tbody: [
                    []
                ]
            },
            operation: new Operation(),
            vm       : {}
        }, opts);
        this.createItem = this.__createApiFn__('create', () => {}, (data) => {
            let pager = this.vm.pager;
            pager.setInitPage(1);
        });
        this.deleteItem = this.__createApiFn__('delete', () => {}, (data) => {
            let pager      = this.vm.pager;
            let oldApiList = this.apiData.list;
            // 删除如果当前页数据没有了，设置相应 pager 数据变化
            if (oldApiList.length === 1) {
                let totalPage = pager.totalPage -= 1;
                pager.setInitPage(totalPage);
            }
        });

    }

    /**
     * 获取数据
     * @param params  api 需要传给后端的参数
     * @param keys target 的属性和 filter 方法或者处理函数 | (key, [key], [key, (filter | filterFn), opts], {name, filter, opts})
     *        opts 为绑定到每个 tbody 单项上的属性，对象是为 opts 属性， 数组时为 keys[2]
     * @returns {Promise.<void>}
     */
    async getItems(params = {}, keys = [], special) {
        //this.apiModule  = this.apiModule || this.vm.moduleName;
        // console.log(params);
        let data        = await this.__getApiDataList__(params);
        this.data.tbody = []; // 清空 body
        let tbody       = this.data.tbody;
        data            = data || {};
        data.order_list       = data.order_list || data.data || [];
        let keyWords;
        // console.log(special);
        if (special) {
            switch (special.type) {
                case 'identity':
                    keyWords = special.key;
                    break;
                default:
                    break;
            }
            keyWords = keyWords.split(' ');
        }
        let keyWordsCache;
        data.order_list.forEach((item, index) => {
            if (!tbody[index]) {
                this.vm.$set(tbody, index, []);
            }
            this.__formatTargetKeys__(item, keys, (res, key, keyIndex) => {
                let lang    = {};
                let apiText = '';
                let opts    = keys[keyIndex].opts || keys[keyIndex][2];
                if (isObject(res)) {
                    if (res.type === 'lang') {
                        lang = res.data;
                    }
                    apiText = lang[LANGUAGE.type];
                }
                if (isString(res) || isNumber(res)) {
                    apiText = res.toString().trim();
                    DEFAULT_LANGUAGE_TYPES.forEach(type => {
                        lang[type] = apiText;
                    });
                }
                if (keyWords) {
                    if (key == keyWords[1]) {
                        let langC     = special[res.toString()].lang;
                        lang.cn       = keyWordsCache.lang.cn + langC.cn;
                        lang.en       = keyWordsCache.lang.en + langC.en;
                        apiText       = lang[LANGUAGE.type];
                        keyWordsCache = {};
                    }
                    if (key == keyWords[0]) {
                        keyWordsCache = Object.assign({
                            text: apiText, lang
                        }, opts);
                    }
                }
                if (!keyWords || key != keyWords[0]) {
                    tbody[index].push(Object.assign({
                        text: apiText, lang
                    }, opts));
                }
            });

            tbody[index].apiData = item;
        });

        let pager = this.vm.pager;
        this.vm.pager.reset({
            initPage : params.page,
            totalPage: data.total_page
        });

        // 超出无值处理
        // if (data.total_page !== 0) {
        //     if (params.page > pager.totalPage) {
        //         params.page -= 1;
        //         this.getItems(params, keys);
        //     }
        // }

        return data;
    };

    /*Budget  tableIncrease详情页获取表格数据*/
    async getIncreaseTableItems(params = {}, keys = [], special) {
        //this.apiModule  = this.apiModule || this.vm.moduleName;
        // console.log(params);
        let data        = await this.__getTableApiDataList__(params);
        this.data.tbody = []; // 清空 body
        let tbody       = this.data.tbody;
        data            = data || {};
        data.budget_increase = data.budget_increase || data.data || [];
        let keyWords;
        // console.log(special);
        if (special) {
            switch (special.type) {
                case 'identity':
                    keyWords = special.key;
                    break;
                default:
                    break;
            }
            keyWords = keyWords.split(' ');
        }
        let keyWordsCache;
        data.budget_increase.forEach((item, index) => {
            if (!tbody[index]) {
                this.vm.$set(tbody, index, []);
            }
            this.__formatTargetKeys__(item, keys, (res, key, keyIndex) => {
                let lang    = {};
                let apiText = '';
                let opts    = keys[keyIndex].opts || keys[keyIndex][2];
                if (isObject(res)) {
                    if (res.type === 'lang') {
                        lang = res.data;
                    }
                    apiText = lang[LANGUAGE.type];
                }
                if (isString(res) || isNumber(res)) {
                    apiText = res.toString().trim();
                    DEFAULT_LANGUAGE_TYPES.forEach(type => {
                        lang[type] = apiText;
                    });
                }
                if (keyWords) {
                    if (key == keyWords[1]) {
                        let langC     = special[res.toString()].lang;
                        lang.cn       = keyWordsCache.lang.cn + langC.cn;
                        lang.en       = keyWordsCache.lang.en + langC.en;
                        apiText       = lang[LANGUAGE.type];
                        keyWordsCache = {};
                    }
                    if (key == keyWords[0]) {
                        keyWordsCache = Object.assign({
                            text: apiText, lang
                        }, opts);
                    }
                }
                if (!keyWords || key != keyWords[0]) {
                    tbody[index].push(Object.assign({
                        text: apiText, lang
                    }, opts));
                }
            });

            tbody[index].apiData = item;
        });

        // let pager = this.vm.pager;
        // this.vm.pager.reset({
        //     initPage : params.page,
        //     totalPage: data.total_page
        // });

        // 超出无值处理
        // if (data.total_page !== 0) {
        //     if (params.page > pager.totalPage) {
        //         params.page -= 1;
        //         this.getItems(params, keys);
        //     }
        // }

        return data;
    };
    /*Budget  tableDecrease详情页获取表格数据*/
    async getDecreaseTableItems(params = {}, keys = [], special) {
        //this.apiModule  = this.apiModule || this.vm.moduleName;
        // console.log(params);
        let data        = await this.__getTableApiDataList__(params);
        this.data.tbody = []; // 清空 body
        let tbody       = this.data.tbody;
        data            = data || {};
        data.budget_decrease  = data.budget_decrease || data.data || [];
        let keyWords;
        // console.log(special);
        if (special) {
            switch (special.type) {
                case 'identity':
                    keyWords = special.key;
                    break;
                default:
                    break;
            }
            keyWords = keyWords.split(' ');
        }
        let keyWordsCache;
        data.budget_decrease.forEach((item, index) => {
            if (!tbody[index]) {
                this.vm.$set(tbody, index, []);
            }
            this.__formatTargetKeys__(item, keys, (res, key, keyIndex) => {
                let lang    = {};
                let apiText = '';
                let opts    = keys[keyIndex].opts || keys[keyIndex][2];
                if (isObject(res)) {
                    if (res.type === 'lang') {
                        lang = res.data;
                    }
                    apiText = lang[LANGUAGE.type];
                }
                if (isString(res) || isNumber(res)) {
                    apiText = res.toString().trim();
                    DEFAULT_LANGUAGE_TYPES.forEach(type => {
                        lang[type] = apiText;
                    });
                }
                if (keyWords) {
                    if (key == keyWords[1]) {
                        let langC     = special[res.toString()].lang;
                        lang.cn       = keyWordsCache.lang.cn + langC.cn;
                        lang.en       = keyWordsCache.lang.en + langC.en;
                        apiText       = lang[LANGUAGE.type];
                        keyWordsCache = {};
                    }
                    if (key == keyWords[0]) {
                        keyWordsCache = Object.assign({
                            text: apiText, lang
                        }, opts);
                    }
                }
                if (!keyWords || key != keyWords[0]) {
                    tbody[index].push(Object.assign({
                        text: apiText, lang
                    }, opts));
                }
            });

            tbody[index].apiData = item;
        });

        // let pager = this.vm.pager;
        // this.vm.pager.reset({
        //     initPage : params.page,
        //     totalPage: data.total_page
        // });

        // 超出无值处理
        // if (data.total_page !== 0) {
        //     if (params.page > pager.totalPage) {
        //         params.page -= 1;
        //         this.getItems(params, keys);
        //     }
        // }

        return data;
    };
    /**
     * 根据 tr 行的索引获取当前的 tr 行的数据
     * @param trIndex  tr 行索引
     */
    getCurrentTrData(trIndex) {
        let trData = this.data.tbody[trIndex];
        if (isObject(trData)) {
            trData = trData.items;
        }
        return trData;
    }


}

export class Pager extends Component {
    constructor(opts) {
        super({
            initPage   : 1,
            currentPage: 1,
            totalPage  : 0
        }, opts);
    }

    reset(opts) {
        this.initPage    = opts.initPage || 1;
        this.currentPage = opts.initPage;
        this.totalPage   = opts.totalPage || 0;
    }

    setInitPage(page) {
        this.currentPage = page;
        this.initPage    = page;
        return page;
    }

    setTotalPage(page) {
        return this.totalPage = page;
    }

    setCurrentPage(page) {
        return this.currentPage = page;
    }

    goPage({page}) {
        this.currentPage = page;
        this.ongopage({page});
    }

    ongopage({page}) {

    }
}

export class Nav extends Component {
    constructor(opts) {
        super({
            title: {
                text: '',
                lang: {en: '', cn: ''}
            },
            items: [
                new NavItem()
            ]
        }, opts);
    }
}

export class NavItem extends Component {
    constructor(opts) {
        super({
            isRootPathSelect: false, // 是否为路由为 '/' 时的选中
            text            : '',
            lang            : {en: '', cn: ''},
            select          : false,
            location        : {
                path: '', query: {}
            }
        }, opts);
    }
}

export class FormAddInputsItem extends FormItem {
    constructor(opts) {
        super(Object.assign({
            type: 'add-inputs'
        }, opts));
    }

    validate(vm) {
        console.log(22222222);
        let flag = true;
        if (this.isShow) {
            this.items.forEach(item => {
                if (flag) {
                    flag = this.validateItem(item, vm, flag);
                }
            });
        }
        return flag;
    }

    validateItem(item, vm, flag = true) {
        console.log(1111111);
        if (this.isShow) {
            let en = item.value.lang.en.toString();
            let cn = item.value.lang.cn.toString();
            if (en === '' || cn === '') {
                if (item.required) {
                    toastWarning(item, vm);
                    flag = false;
                }
                else if (this.required) {
                    toastWarning(this, vm);
                    flag = false;
                }
            }

            function toastWarning(target, vm) {
                let warning = vm.$gl(target.required) || vm.$gl(target.required.warning);
                toast(warning);
            }
        }
        return flag;
    }
}

export class FormInputItem extends FormItem {
    constructor(opts) {
        super(Object.assign({
            type              : 'input',
            inputType         : 'text', // input 的类型, 默认 text
            needOperation     : false, // 是否需要操作
            needPostfixInfo   : false, // 是否需要后缀信息
            needFromAddContent: false, // 是否需要增加的内容框
            postfixInfo       : {},
            operation         : {
                btns: [
                    {
                        type     : '',
                        className: '',
                        onclick  : () => {}
                    }
                ]
            },
            value             : '',
            addValues         : [] // 操作增加的值
        }, opts));
    }
}

export class FormPassword extends FormItem {
    constructor(opts) {
        super(Object.assign({
            title             : '',
            passwordType      : 'text', //
            max_length        : 4,
            passwordStyle     : '*', // *
            passwordIsShowType: 'text',
            value             : ''
        }, opts));
    }

    formatApiValueToValue(apiValue, component) {
        if (apiValue) {
            return String(apiValue);
        }
        else {
            return '';
        }
    }
}

export class FormSelectDateItem extends FormItem {
    constructor(opts) {
        super(Object.assign({
            type     : 'select-date',
            initValue: ''
        }, opts));
    }
}

export class FormNecessarySelectDateItem extends FormSelectDateItem {
    constructor(opts) {
        super(Object.assign({
            isNecessary: true
        }, opts));
    }
}

export class FormSelectDateBetweenItem extends FormItem {
    constructor(opts) {
        super(Object.assign({
            type: 'select-date-between',
            from: {},
            to  : {}
        }, opts));
    }

    reset() {
        this.from.value = '';
        this.to.value   = '';
    }

    validate(vm) {
        if (this.isShow) {
            if (this.from.required && !this.from.value) {
                toastWarning(this.from, vm);
                return false;
            }
            if (this.to.required && !this.to.value) {
                toastWarning(this.to, vm);
                return false;
            }

            function toastWarning(target, vm) {
                let warning = vm.$gl(target.required) || vm.$gl(target.required.warning);
                toast(warning);
            }
        }
        return true;
    }
}

export class FormTimePickerBetweenItem extends FormSelectDateBetweenItem {
    constructor(opts) {
        super(Object.assign({
            type : 'time-picker-between',
            value: {from: '', to: ''},
            from : {
                value: '', placeholder: '', disabled: false,
                onchange() {}
            },
            to   : {
                value: '', placeholder: '', disabled: false,
                onchange() {}
            }
        }, opts));
    }

}

export class FormNecessaryInputItem extends FormInputItem {
    constructor(opts) {
        super(Object.assign({
            isNecessary: true
        }, opts));
    }
}

export class FormNecessaryInputPasswordItem extends FormNecessaryInputItem {
    constructor(opts) {
        super(Object.assign({
            inputType: 'password'
        }, opts));
    }
}

export class FormInputsItem extends FormInputItem {
    constructor(opts) {
        super(Object.assign({
            type: 'inputs'
        }, opts));
    }
}

export class FormLangInputsItem extends FormInputsItem {
    constructor(opts) {
        super(Object.assign({}, opts));
        this.items[0].postfixInfo     = {lang: {en: 'EN', cn: '英文'}};
        this.items[0].needPostfixInfo = true;
        this.items[1].postfixInfo     = {lang: {en: 'CN', cn: '中文'}};
        this.items[1].needPostfixInfo = true;
    }
}

export class FormRadioItem extends FormItem {
    constructor(opts) {
        super(Object.assign({
            type      : 'radio',
            pickValues: []
        }, opts));
    }
}
export class FormNecessaryRadioItem extends FormRadioItem {
    constructor(opts) {
        super(Object.assign({
            isNecessary: true
        }, opts));
    }
}

export class FormCheckBoxItem extends FormItem {
    constructor(opts) {
        super(Object.assign({
            type       : 'checkbox',
            checkValues: []
        }, opts));
    }
}

export class FormSelectBetweenItem extends FormItem {
    constructor(opts) {
        super(Object.assign({
            type           : 'select-between',
            title          : '',
            placeholder    : ['', ''],
            firSelectValues: [],
            secSelectValues: [],
            selectIndex: -1,
            searchIndex: -1,
            value: ''
        },opts));
    }
}

export class FormCommentItem extends FormItem {
    constructor(opts) {
        super(Object.assign({
            type           : 'record',
            historyComments: [],
            style          : {}
        }, opts));
    }
}

export class FormSelectItem extends FormItem {
    constructor(opts) {
        super(Object.assign({
            type           : 'select',
            needPlaceholder: true,
            // placeholder    : {lang: {cn: '请选择.....', en: 'Please select...'}},
            selectValues   : []
        }, opts));
    }
}

export class FormSearchSelectItem extends FormSelectItem {
    constructor(opts) {
        super(Object.assign({
            type: 'search-select'

        }, opts));
    }
}

export class FormNecessarySearchSelectItem extends FormSearchSelectItem {
    constructor(opts) {
        super(Object.assign({
            isNecessary: true
        }, opts));
    }
}

export class FormNonPlaceholderSelectItem extends FormSelectItem {
    constructor(opts) {
        super(Object.assign({
            needPlaceholder: false
        }, opts));
    }
}

export class FormNecessarySelectItem extends FormSelectItem {
    constructor(opts) {
        super(Object.assign({
            isNecessary: true
        }, opts));
    }
}

export class FormTextItem extends FormItem {
    constructor(opts) {
        super(Object.assign({
            type: 'text'
        }, opts));
    }
}

export class FormTextNativeItem extends FormItem {
    constructor(opts) {
        super(Object.assign({
            type              : 'text',
            needTextareaNative: true
        }, opts));
    }
}
export class FormNecessaryTextNativeItem extends FormTextNativeItem {
    constructor(opts) {
        super(Object.assign({
            isNecessary: true
        }, opts));
    }
}

export class FormUploadImagesItem extends FormItem {
    constructor(opts) {
        super(Object.assign({
            direction  : 'row',
            title      : '',
            isNecessary: false,
            type       : 'solo', // (solo | multi)
            images     : [
                {src: ''}
            ]
        }, opts));
    }

    setImages(images) {
        console.log('here');
        this.images.splice(0);
        images.forEach(image => this.images.push(image));
    }

    setValueFromApiData(apiData) {
        let images_arr = this.formatApiValueToValue(apiData[this.valueKey], this);
        if (this.type == 'multi') {
            this.value = deepClone(images_arr);
        }
        else {
            this.value = images_arr[0].fileName;
        }
        images_arr.length === 0 ? null:this.images = deepClone(images_arr);
    }

    onupload() {};
}

export class FormNecessaryUploadImagesItem extends FormUploadImagesItem {
    constructor(opts) {
        super(Object.assign({
            isNecessary: true
        }, opts));
    }
}

export class FormUploadImagesMultiItem extends FormUploadImagesItem {
    constructor(opts) {
        super(Object.assign({
            type: 'multi'
        }, opts));
    }

    onadd(currentVue) {} // 当且仅当 type 为 multi 时有效
}

export class FormTableAuthEditPart extends FormPart {
    constructor(opts) {
        super(Object.assign({
            type: 'table-authEdit',
            data: {
                thead: [],
                tbody: [
                    []
                ]
            }
        }, opts));
        this.bindPartToData();
    }

    bindPartToData() {
        this.data.part = this;
    }
}

export class FormPersonGroupPart extends FormPart {
    constructor(opts) {
        super(Object.assign({
            type             : 'person-group',
            title            : '',
            person_group_type: 'edit',
            persons          : []
        }, opts));
        this.bindPartToData();
    }

    bindPartToData() {
        console.log(this);
        // this.data.part = this;
    }

}

export class FormTextPart extends FormPart {
    constructor(opts) {
        super(Object.assign({
            type     : 'text',
            rowCounts: 1,
            items    : [
                new FormTextItem()
            ]
        }, opts));
    }
}

export class FormInputOrSelectPart extends FormPart {
    constructor(opts) {
        super(Object.assign({
            itemDirection: 'row',
            type         : 'input-or-select'
        }, opts));
    }
}

export class FormUploadImagesPart extends FormPart {
    constructor(opts) {
        super(Object.assign({
            type : 'upload-images',
            items: [
                {
                    type : 'upload-images',
                    items: [
                        new FormUploadImagesItem({
                            title   : '',
                            images  : [
                                {src: ''}
                            ],
                            onupload: () => {}
                        }),
                        new FormUploadImagesMultiItem({
                            images  : [
                                {src: ''}
                            ],
                            onupload: () => {}
                        })
                    ]
                }
            ],
            info : new Info({
                items: []
            })
        }, opts));
    }

    getApiKeyValues() {
        let obj = {};
        this.items[0].items.forEach(item => {
            Object.assign(obj, item.getApiKeyValue());
        });
        return obj;
    }

    setValueFromApiData() {

    }
}

export class MaskMsg extends Mask {
    constructor(opts) {
        super(Object.assign({
            isHeightAuto: true,
            content     : {
                type: 'text',
                data: ''
            }
        }, opts));
    }
}

export class MaskDeleteMsg extends MaskMsg {
    constructor(opts) {
        super(Object.assign({
            title  : {lang: {en: 'Delete', cn: '删除'}},
            content: {
                type: 'text',
                data: {
                    lang: {
                        en: 'Are you sure you want to delete it!',
                        cn: '你是否确认删除！'
                    }
                }
            }
        }, opts));
    }
}

// 自定义
export class NavMain extends Nav {
    constructor(opts) {
        super(Object.assign({
            vm   : null,
            items: [
                {
                    title: new NavItem(),
                    items: [
                        new NavItem()
                    ]
                }
            ]
        }, opts));
        propertyIsRequired(this, 'vm');
    }

    resetSelect() {
        this.items.forEach(group => {
            // 全部置为 false
            if (group.items && group.items.length) {
                resetObjsAttr(group.items, 'select', false);
            }
            group.title.select = false;
        });
    }

    soloSelected(target, type, data) {
        let haveItems = data && data.items && data.items.length;
        if (!haveItems) {
            this.resetSelect();
        }
        if (type === 'clickTitle') {
            !haveItems ? target.select = true : null;
        }
        if (type === 'clickItem') {
            target.select = true;
        }
    }

    setSideBarSelected() {
        let path = this.vm.$route.path;
        this.resetSelect();
        if (path === '/') {
            this.items.forEach(navItem => {
                if (navItem.title.isRootPathSelect) {
                    navItem.title.select = true;
                }
                else {
                    if (navItem && navItem.items) {
                        navItem.items.forEach(subItem => {
                            if (subItem.isRootPathSelect) {
                                subItem.select = true;
                            }
                        });
                    }
                }
            });
        }
        else {
            let setSubItemSelect = (item) => {
                let getModuleName          = (path) => path.split('/')[1];
                let itemLocationModuleName = getModuleName(item.location.path);
                let pathModuleName         = getModuleName(path);
                if (!['/password/currentUserPassword'].includes(path)) {
                    if (item.location.path === path || itemLocationModuleName === pathModuleName) {
                        item.select = true;
                    }
                }
            };
            this.items.forEach(navItem => {
                if (navItem.items && navItem.items.length) {
                    navItem.items.forEach(subItem => {
                        setSubItemSelect(subItem);
                    });
                }
                else {
                    // 仅有 title
                    setSubItemSelect(navItem.title);
                }
            });
        }
    }
}

export class NavSub extends Nav {
    constructor(opts) {
        super(Object.assign({
            needOperation: false,
            apiModule    : '', // api 模块名，对应自定义 api.js 中 api 对象下的属性名
            items        : [
                new NavItem()
            ]
        }, opts));
        this.lastItemIndex     = 0;
        this.selectedApiItem   = {};
        this.selectedItemIndex = undefined;

        /**
         * 上移或下移 item
         * @param type {'up'|'down'}
         * @param index 对应 items 中的索引
         * @returns {Promise.<void>}
         */
        this.upOrDownItem = async (type, index) => {
            let isUp              = type === 'up';
            let selectedItemIndex = isUp ? index - 1 : index + 1;
            let endIndex          = isUp ? 0 : this.lastItemIndex;
            let data              = new Promise(resolve => resolve({}));
            if (index !== endIndex) {
                data = await api[this.apiModule].update(type, {
                    spend_category_id: this.apiData.list[index].spend_category_id
                });
                await this.getDataAndSelectItem(selectedItemIndex);
            }
            return data;
        };

        this.renameItem = async (index, data) => {
            let obj = {};
            if (data instanceof FormLangInputsItem) {
                obj = {
                    spend_category_display_name   : data.items[0].value,
                    spend_category_display_name_cn: data.items[1].value
                };
            }
            if (isString(data)) {
                obj = {
                    spend_category_display_name: data
                };
            }
            let apiItem = this.getApiListItem(index);
            let res     = await api[this.apiModule].update('rename', Object.assign({
                spend_category_id: apiItem.spend_category_id
            }, obj));
            await this.getDataAndSelectItem(index);
            return res;
        };

        this.deleteItem = async (index) => {
            let item               = this.getApiListItem(index);
            let data               = await api[this.apiModule].delete({
                spend_category_id: item.spend_category_id
            });
            this.selectedItemIndex = -1;
            await this.getDataAndSelectItem(0);
            return data;
        };

        this.createItem = async (params) => {
            let oldLastItemIndex = this.lastItemIndex;
            let data             = await api[this.apiModule].create(params);
            await this.getDataAndSelectItem(oldLastItemIndex + 1);
            return data;
        };
    }

    /**
     * 获取数据
     * @param params  api 需要传给后端的参数
     * @param keys api 数据对应 keys
     * @returns {Promise.<void>}
     */
    async getItems(params = {}, keys = []) {

        let data   = await this.__getApiDataList__(this.apiModule, params);
        this.items = []; // 清空 body
        data.list  = data.list || data.data || [];
        data.list.forEach((item) => {
            let apiText = '';
            let lang    = {};

            if (isString(keys)) {
                let key = keys;
                apiText = item[key].toString().trim();
            }

            if (isArray(keys)) {
                this.__formatTargetKeys__(item, keys, (res, key) => {
                    if (isObject(res)) {
                        if (res.type === 'lang') {
                            lang = res.data;
                        }
                    }
                });
                apiText = lang[LANGUAGE.type];
            }

            let navItem = new NavItem({
                text: apiText,
                lang
            });

            this.items.push(navItem);
        });

        this.lastItemIndex = this.items.length - 1;
        return data;
    };

    /**
     * 设置选中
     * @param index 对应 items 索引
     * @returns {boolean} 是否需要设置
     */
    setSelectedItem(index) {
        if (this.selectedItemIndex !== index) {
            this.items[index].select = true;
            this.selectedItemIndex   = index;
            this.selectedApiItem     = this.apiData.list[index];
            return true;
        }
        return false;
    }

    getSelectedApiItem() {
        return this.selectedApiItem;
    }

    getSelectedApiItemID() {
        return this.selectedApiItem.spend_category_id;
    }

    selectFirstItem() {
        return this.setSelectedItem(0);
    }

    async getDataAndSelectItem(selectedItemIndex) {
        await this.getItems({}, [
            [
                'spend_category_display_name', 'formatLang'
            ]
        ]);
        if (selectedItemIndex != null) {
            this.setSelectedItem(selectedItemIndex);
        }
    }

    getApiListItem(index) {
        return this.apiData.list[index];
    }

    getFirstApiListItem() {
        return this.getApiListItem(0);
    }

    onclickItem() {}

    ondelete() {}

    showOperation() {
        this.needOperation = true;
    }

    hideOperation() {
        this.needOperation = false;
    }
}

export class FormItemsPart extends FormPart {
    constructor(opts) {
        super({
            type         : 'items',
            rowCounts    : 1,
            itemDirection: 'column',
            items        : []
        }, opts);
    }

    async getItems(data, keys = []) {
        this.items.splice(0); // 清空 body
        this.__formatTargetKeys__(data, keys, (res, key) => {

            let lang    = {};
            let apiText = '';
            if (isObject(res)) {
                if (res.type === 'lang') {
                    lang = res.data;
                }
                apiText = lang[LANGUAGE.type];
            }
            if (isString(res) || isNumber(res)) {
                apiText = res.toString().trim();
                DEFAULT_LANGUAGE_TYPES.forEach(type => {
                    lang[type] = apiText;
                });
            }
            this.items.push({lang});
        });

        return data;
    };
}
