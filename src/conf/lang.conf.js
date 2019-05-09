const en = {

    yes: 'Yes',
    no : 'No',

    yesNo: ['Yes', 'No'],


    inputMethods: [
        'Single-line', 'Multi-line', 'Drop-down', 'Check-box', 'Radio-box'
    ],

    reportTimeType: ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'],
    addCategory   : 'category'
};
const cn = {

    yes: '是',
    no : '否',

    yesNo: ['是', '否'],


    inputMethods: [
        '单行文本', '多行文本', '下拉选项', '多选', '单选'
    ],

    reportTimeType: ['按天', '按周', '按月', '按季', '按年'],
    addCategory   : '添加分类'
};

export const DEFAULT_LANGUAGE_TYPE = 'cn';

export const DEFAULT_LANGUAGE_TYPES = ['cn', 'en'];

export const LANGUAGE = {
    type: 'cn',
    en,
    cn
};