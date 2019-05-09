/**
 * 信息广播中心
 */
export class BroadcastCenter {
    constructor() {
        this.registrars = [];
    }

    /**
     * 注册信息
     * @param registrar
     */
    register(registrar) {
        this.registrars.push(registrar);
    }

    /**
     * 广播事件
     * @param fn 需要执行的事件
     */
    broadcast(fn) {
        this.registrars.forEach(registrar => fn && fn(registrar));
    }

    /**
     * 注销具有指定 key 对应 value 的所有注册者
     * @param key
     * @param value
     */
    unregisterBy(key, value) {
        this.registrars = this.registrars.filter(registrar => registrar[key] !== value);
    }

}