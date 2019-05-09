import {
    isObject,
    isString
} from './validation';

let objTemplateRegexp = new RegExp(/{([A-z_$][A-z_$0-9]*)}/, 'g'); // {key}

let objRegexp = new RegExp(/\.([A-z_$][A-z_$0-9]*[^\.])/, 'g'); // .key

let arrRegexp = new RegExp(/\[([0-9]+)\]/, 'g'); // [0]

/**
 * 通过指定的 regexp 设置模板中的值
 * @param templateValueObj 为模板提供值得对象
 * @param templateStr 模板字符串
 * @param regexp 指定的正则
 * @returns {*}
 */
function setTemplateValueByRegexp(templateValueObj, templateStr, regexp = new RegExp(/{([A-z_$][A-z_$0-9]*)}/, 'g')) {
    templateStr = templateStr.replace(regexp, (...args) => {
        let key = args[1];
        return templateValueObj[key];
    });
    return templateStr;
}

/**
 * 测试字符串是否可以被 regexp 匹配
 * @param str
 * @param regexp
 * @returns {{code: number, data: Array}} code（1：匹配，0：不匹配） data（匹配后返回 reduce 匹配成功的数组）
 */
function testStr(str, regexp) {
    let res = {
        code: 0,
        data: []
    };

    str.replace(regexp, (...args) => {
        if (!res.code) {
            res.code = 1;
        }

        let value = args[1];

        if (value.indexOf('[') !== -1) {
            value   = value.replace(arrRegexp, '');
            args[0] = '.' + value;
            args[1] = value;
        }

        res.data.push({key: args[1], index: args[2]});
    });

    return res;
}

/**
 * 通过提供的属性字符串获取目标对象中对应的值
 * @param target 目标对象
 * @param keyStr 属性字符串 （支持 .key | [0]，如 abc.name.value[0].title）
 * @returns {*}
 */
export function getValueByKeyStr(target, keyStr) {
    let searchArr = [];

    let result = target;

    let regexps = [objRegexp, arrRegexp];

    if (!isString(keyStr)) {
        throw new Error('param "keyStr" should be a string!');
    }

    regexps.forEach(regexp => {
        let res = testStr(keyStr, regexp);
        if (res.code) {
            searchArr = [...searchArr, ...res.data];
        }
    });

    searchArr.sort((a, b) => a.index - b.index);

    if (searchArr.length) {
        let firstKey = keyStr.slice(0, searchArr[0].index);

        let keys = [firstKey];

        searchArr.forEach(item => keys.push(item.key));

        keys.forEach(key => {
            if (result) {
                result = result[key];
            }
        });
    }
    else {
        result = result[keyStr];
    }

    return result;
}


