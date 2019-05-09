import {
    DEFAULT_LANGUAGE_TYPES
} from '../../conf/lang.conf';
import {
    isArray,
    isObject
} from '../plugins/validation';

export class Language {
    constructor(opts) {
        if (isArray(opts)) {
            DEFAULT_LANGUAGE_TYPES.forEach((type, index) => {
                this[type] = opts[index];
            });
        }
        if (isObject(opts)) {
            for (let key in opts) {
                let isALangTypeKey = DEFAULT_LANGUAGE_TYPES.findIndex(type => type === key) !== -1;
                if (isALangTypeKey) {
                    this[key] = opts[key];
                }
            }
        }
    }
}