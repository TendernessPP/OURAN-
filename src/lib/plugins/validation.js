// 正则表达式
const regExpStr      = {
    typeStr: /^\[object (\w+)\]$/
};
// 值类型
const valueTypeArray = ['null', 'undefined', 'string', 'number', 'boolean'];

// 引用类型
const referenceType = ['object', 'array', 'date', 'function'];

/**
 * 扩展的 typeof
 * 可以进行的类型检测包括但不限于：
 * null、undefined、string、number、array、boolean、object、function、date
 * @param inputValue
 * @returns {*}
 */
export const _typeof = (inputValue) => {
    let toString = Object.prototype.toString;

    let typeStr = toString.apply(inputValue);
    typeStr     = regExpStr.typeStr.exec(typeStr)[1].toLowerCase();
    return typeStr;
};

export const isNull = (inputValue) => {
    return _typeof(inputValue) === 'null';
};

export const isUndefined = (inputValue) => {
    return _typeof(inputValue) === 'undefined';
};

export const isString = (inputValue) => {
    return _typeof(inputValue) === 'string';
};

export const isNumber = (inputValue) => {
    return _typeof(inputValue) === 'number';
};

export const isBoolean = (inputValue) => {
    return _typeof(inputValue) === 'boolean';
};

export const isArray = (inputValue) => {
    return _typeof(inputValue) === 'array';
};

export const isObject = (inputValue) => {
    return _typeof(inputValue) === 'object';
};

export const isFunction = (inputValue) => {
    return _typeof(inputValue) === 'function';
};

export const isDate = (inputValue) => {
    return _typeof(inputValue) === 'date';
};

/**
 * 判断 checkedValue 的类型是否存在于 typesArray 中
 * @param checkedValue
 * @param typesArray
 * @returns {boolean}
 */
export const whetherValueTypeInTypesArray = (checkedValue, typesArray) => {
    let result = typesArray.find(
        ignoreType => _typeof(checkedValue) === ignoreType);
    return result !== undefined;
};

/**
 * 判断是否为自定义的空
 * @param checkedValue 检测值
 * @param emptyValues {Array} 指定的为空的值
 * @param emptyTypesArray 默认为空的类型数组
 * @param notEmptyTypesArray 默认不为空的类型数组
 * @returns {boolean}
 */
export const isEmpty = (
    checkedValue,
    emptyValues,
    emptyTypesArray,
    notEmptyTypesArray
) => {
    if (isArray(emptyValues)) {
        if (emptyValues.indexOf(checkedValue) !== -1) {
            return true;
        }
    }

    let defaultIsEmptyTypesArray  = ['null', 'undefined'];
    let defaultNotEmptyTypesArray = [
        'function', 'date', 'boolean', 'number'
    ];

    function formatArray(defaultTypesArray, typesArray) {
        if (isString(typesArray)) {
            typesArray = [
                ...defaultTypesArray, typesArray
            ];
        }
        else if (isArray(typesArray)) {
            typesArray = [
                ...defaultTypesArray, ...typesArray
            ];
        }
        else {
            typesArray = defaultTypesArray;
        }
        return typesArray;
    }

    emptyTypesArray    = formatArray(defaultIsEmptyTypesArray, emptyTypesArray);
    notEmptyTypesArray = formatArray(defaultNotEmptyTypesArray, notEmptyTypesArray);

    if (whetherValueTypeInTypesArray(checkedValue, emptyTypesArray)) {
        return true;
    }

    if (whetherValueTypeInTypesArray(checkedValue, notEmptyTypesArray)) {
        return false;
    }

    // 可以验证的类型
    if (isObject(checkedValue)) {
        let length = Object.keys(checkedValue).length;
        return length === 0;
    }

    if (isArray(checkedValue)) {
        console.log(checkedValue)
        return checkedValue.length === 0;
    }

    if (isString(checkedValue)) {
        return checkedValue.toString().trim() === '';
    }

    return false;
};

/**
 * 判断两值类型是否相似
 * @param value1
 * @param value2
 * @returns {boolean}
 */
export const isTypeLike = (value1, value2) => {
    return _typeof(value1) === _typeof(value2);
};

/**
 * 判断两值是否相等
 * @param newVal
 * @param oldVal
 * @returns {boolean}
 */
export const isEqual = (newVal, oldVal) => {
    if (isTypeLike(newVal, oldVal)) {
        // 值类型相等
        valueTypeArray.forEach(type => {
            if (type === _typeof(newVal)) {
                return newVal === oldVal;
            }
        });
        // todo 引用类型相等
    }
    return false;
};

/**
 * 判定是否为移动设备
 * @returns {boolean}
 */
export const isMobile = (() => {
    return /Mobile/i.test(window.navigator.userAgent);
})();

/**
 * 属性是否被定义
 * @param obj
 * @param attr
 */
export const isAttrDefined = (obj, attr) => {
    let flag = obj[attr] !== undefined;
    if (flag) {
        console.error(`"${attr}" has been defined!`);
    }
    return flag;
};

// ie 版本
function IEVersion() {
    let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    let isIE      = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1; //判断是否IE<11浏览器
    let isEdge    = userAgent.indexOf('Edge') > -1 && !isIE; //判断是否IE的Edge浏览器
    let isIE11    = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
    if (isIE) {
        let reIE = new RegExp('MSIE (\\d+\\.\\d+);');
        reIE.test(userAgent);
        let fIEVersion = parseFloat(RegExp['$1']);
        if (fIEVersion == 7) {
            return 7;
        }
        else if (fIEVersion == 8) {
            return 8;
        }
        else if (fIEVersion == 9) {
            return 9;
        }
        else if (fIEVersion == 10) {
            return 10;
        }
        else {
            return 6;//IE版本<=7
        }
    }
    else if (isEdge) {
        return 'edge';//edge
    }
    else if (isIE11) {
        return 11; //IE11
    }
    else {
        return -1;//不是ie浏览器
    }
}

// 是否为 ie
export const isIE = (() => {
    let ieVersion = IEVersion();
    if (ieVersion > 0) {
        return true;
    }
    else {
        return false;
    }
})();