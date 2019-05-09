export const DEBUG = process.env.NODE_ENV !== 'production';

export const INPUT_METHODS = [
    'Single-line', 'Multi-line', 'Drop-down', 'Check-box', 'Radio-box'
];

export const INPUT_METHODS_NEED_OPTION_NAME_NUMS = [2, 3, 4];

export const IMAGE_TYPES = [
    '.jpg','.png'
];
export const VIDEO_TYPES = [
    '.ogg','.mp4','.flv','.avi','.wmv','rmvb'
];
export const FILE_TYPES  = [
    '.jpg', '.jpeg', '.png', '.bmp', '.doc', '.docx', '.ppt', '.pptx',
    '.xls', '.xlsx', '.pdf','.ogg'
];

export const ERR_CODE     = '-1';
export const SUCCESS_CODE = '1';
// 人员状态
export const PERSON_STATUS = {
    1: '在职',
    2: '离职'
};
// 是否
export const TRUE_FALSE_STATUS = {
    1: 'YES',
    0: 'NO'
};
export const BUDGET_STATUS = ['Submitted', 'Received', 'Budget Owner Approved', 'Sent Back', 'Draft', 'Terminated',];
