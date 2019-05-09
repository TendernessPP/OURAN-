export default class Api {
    constructor(opts) {
        this.tk = '';
        Object.keys(opts).forEach(key => this[key] = opts[key]);
    }

    setTk(tk) {
        if (tk != undefined) {
            this.tk = tk;
        }
    }
}
