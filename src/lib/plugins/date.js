/**
 * 获取当前的日期数组
 * @returns {string}
 */
export function getCurrentDateArr() {
    let date  = new Date();
    let year  = date.getFullYear();
    let month = date.getMonth();
    let day   = date.getDay();
    return [year, month, day];
}


