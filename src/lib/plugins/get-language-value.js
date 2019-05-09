import {getKeyValue} from './format';
import {BroadcastCenter} from '../class/Broadcast-Center';
import {
    DEFAULT_LANGUAGE_TYPE,
    LANGUAGE
} from '../../conf/lang.conf';
import Vue from 'vue';
import {getValueByKeyStr} from './get-value';

class LanguageBroadcastCenter extends BroadcastCenter {
    constructor() {
        super();
    }

    /**
     * 注销所有在指定 vnode 下注册的信息
     * @param vnode
     */
    unregisterByVnode(vnode) {
        this.unregisterBy('vnode', vnode);
    }
}

let languageBroadcastCenter = new LanguageBroadcastCenter();

export let $t = init(LANGUAGE, languageBroadcastCenter);

/**
 * 提供在 vue 模板中绑定的方式
 */
Vue.directive('getLangValue', {
    bind: function(el, binding, vnode) {
        let path = binding.value;
        // todo 可以考虑增加
        let pros = {};
        $t(path, pros, {
            rnode: el,
            vnode
        });
    }
});

/**
 * 当每个 vue 组件销毁时，在广播中心移除该组件下的所有注册信息
 */
Vue.mixin({
    destroyed() {
        languageBroadcastCenter.unregisterByVnode(this);
    }
});

function init(languageMap, languageBroadcastCenter) {
    defineLanguageType(languageMap, languageBroadcastCenter, DEFAULT_LANGUAGE_TYPE);

    /**
     * 支持替换 {key} 结构的插值
     * @param value {string}
     * @param pros 模板需要替换的变量对象  {object}
     * @returns {string}
     */
    function replaceValueVariableFromObjValue(value, pros) {
        if (pros) {
            let regexp = new RegExp(/{([A-z_$][A-z_$0-9]*)}/, 'g'); // {key}
            value      = value.replace(regexp, (...args) => {
                let key = args[1];
                return pros[key];
            });
        }
        return value;
    }

    /**
     * 为广播中心注册者绑定对应语言的值
     * @param langType 语言类型
     * @param registrar 注册者
     */
    function bindLanguageValueToRegistrar(langType, registrar) {
        let value   = getValueByKeyStr(languageMap[langType], registrar.path); // 支持属性和下标字符串调用
        value       = replaceValueVariableFromObjValue(value, registrar.pros);
        let bindKey = registrar.bindKey;
        if (registrar.type === 'rnode') {
            registrar.target.innerHTML = value;
        }
        else {
            if (bindKey) {
                registrar.target[bindKey] = value;
            }
            else {
                registrar.target = value;
            }
        }
        return value;
    }

    /**
     * 为 language 对象 type 属性添加监听
     * type 改变时通知所有在广播中心注册过的注册者
     * @param language
     * @param languageBroadcastCenter 广播中心
     * @param defaultLangType 默认语言类型
     * @returns {string}
     */
    function defineLanguageType(language, languageBroadcastCenter, defaultLangType = 'en') {
        let langType;
        Object.defineProperty(language, 'type', {
            get () {
                if (langType === undefined) {
                    langType = defaultLangType;
                    languageBroadcastCenter.broadcast(registrar => {
                        bindLanguageValueToRegistrar(langType, registrar);
                    });
                }
                return langType;
            },
            set (value) {
                if (langType === value) return;
                langType = value;
                languageBroadcastCenter.broadcast(registrar => {
                    bindLanguageValueToRegistrar(langType, registrar);
                });
            }
        });
    }

    /**
     * getLangValue 设置 language 表中的值
     * @param path 对应 language 表中的注册字段，支持属性和下标字符串调用（e.g. 'name.value[0].title'）
     * @param pros 模板需要替换的变量对象, {object}
     * @param opts ({rnode: 真实的 dom 节点, {object}
 *               vnode: vue 的实例, {object}
 *               type: 定义 registrar 注册的是真实的节点还是 vue 的实例, {object}
 *               target: 向广播中心注册的注册者目标, {object}
 *               bindKey: 最后对应 language 的值需要绑定到的注册者目标的属性, {object}
 *             })
     * @returns {Function}
     */
    function getLangValue(path, pros, opts = {}) {
        return function(vnode, target, bindKey) {
            Object.assign(opts, {path, pros});
            if (opts.rnode) {
                Object.assign(opts, {
                    type: 'rnode', target: opts.rnode
                });
                delete opts.rnode;
            }
            else {
                Object.assign(opts, {
                    type: 'vnode', target: target || opts.target || this
                });
            }
            if (vnode != null) {
                opts.vnode = vnode;
            }
            if (bindKey != null) {
                opts.bindKey = bindKey;
            }
            if (!opts.vnode) {
                throw new Error('param "vnode" is required!');
            }
            if (!opts.target) {
                throw new Error('param "target" is required!');
            }
            let registrar = Object.assign({bindKey: 'text'}, opts);
            opts          = null;
            languageBroadcastCenter.register(registrar);
            return bindLanguageValueToRegistrar(languageMap.type, registrar);
        };
    }

    return getLangValue;
}
