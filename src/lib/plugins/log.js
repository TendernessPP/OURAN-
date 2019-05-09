import {DEBUG} from '../../conf/app.conf';

/**
 * 错误打印提示
 * @param args
 */
export const logError = (...args) => {
    if (DEBUG) {
        console.error(...args);
    }
    else {
        console.log(...args);
    }
};

/**
 * 警告打印提示
 * @param args
 */
export const logWarn = (...args) => {
    if (DEBUG) {
        console.log(...args);
    }
};

/**
 * 一般打印提示
 * @param args
 */
export const log = (...args) => {
    if (DEBUG) {
        console.log(...args);
    }
};
