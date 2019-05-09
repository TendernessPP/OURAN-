/**
 * 判断 dom 元素是否具有 className
 * @param el
 * @param className
 * @returns {boolean}
 */
export const hasClass    = (el, className) => {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
    return reg.test(el.className);
};
/**
 * 为 dom 元素增加 className
 * @param el
 * @param className
 */
export const addClass    = (el, className) => {
    if (hasClass(el, className)) {
        return;
    }
    let newClass = el.className.split(' ');
    newClass.push(className);
    el.className = newClass.join(' ');

};
/**
 * 为 dom 元素移除 className
 * @param el
 * @param className
 */
export const removeClass = (el, className) => {
    if (hasClass(el, className)) {
        el.className = el.className.split(className).join('');
    }
};
/**
 * 加载脚本
 * @param url
 */
export const loadScript  = (url) => {
    return new Promise(function(resolve, reject) {
        let script     = document.createElement('script');
        script.type    = 'text/javascript';
        script.src     = url;
        script.onerror = reject;
        document.head.appendChild(script);
        window.onload = function() {
            resolve(window.BMap);
        };
    });
};

/**
 * 生成多个连续的 span
 * @param items | {text: '', style: '', className: ''}
 * @param vm 对应的 vue 实例，有值则支持多语种
 * @returns {string}
 */
export const createSpansHtml = (items, vm) => {
    let res = '';
    items.forEach(item => {
        let text = item.text;
        if (vm) {
            text = vm.$gl(item);
        }
        if (!item.style) {
            item.style = '';
        }
        if (!item.className) {
            item.className = '';
        }
        res += `<span style="${item.style}" class="${item.className}">${text}</span>`;
    });
    return res;
};

/**
 * 创建一个 target 为 _blank 的 a 标签
 * @param href a 标签新开地址
 * @returns {Element}
 */
export function createBlankTargetATag(href) {
    let a    = document.createElement('a');
    a.target = '_blank';
    a.href   = href;
    return a;
}

/**
 * 为元素增加 click 事件
 * @param id
 * @param fn
 */
export function addClickFnToElementById(id, fn) {
    const el = document.getElementById(id);

    if (el.onclick) {
        let tempFn = el.onclick;
        el.onclick = () => {
            tempFn && tempFn();
            fn && fn();
        };
    }
    else {
        el.onclick = () => {
            fn && fn();
        };
    }
}

