import {toast} from './toast';
import {
    isObject,
    isString
} from './validation';
import {LANGUAGE} from '../../conf/lang.conf';
import {Base} from '../class/Base';
import {ajax} from '../ajax/ajax';
import {
    ERR_CODE,
    FILE_TYPES,
    IMAGE_TYPES,
    SUCCESS_CODE
} from '../../conf/app.conf';
import {ERR_NETWORK} from '../../conf/api.conf';

export function getFileExtension(fileName) {
    let extension = fileName.split('.').pop();
    return fileName === extension ? '' : '.' + extension;
}

export function isFile(file_name, opts, extensions = [
    '.jpg', '.jpeg', '.png', '.bmp', '.doc', '.docx', '.ppt', '.pptx',
    '.xls', '.xlsx', '.pdf', '.ogg','.mp4','.flv','.avi','.wmv','rmvb'
]) {
    let extension = getFileExtension(file_name);
    let res       = false;
    extensions.forEach((validExtension) => {
        if (!res) {
            if (extension.toLowerCase() === validExtension) {
                res = true;
            }
        }
    });
    opts = Object.assign({
        needToast: true,
        toastMsg : {en: '所选文件格式错误！', cn: 'Selected file format error!'}
    }, opts);
    if (opts.needToast && !res) {
        let msg = opts.toastMsg;
        if (isString(msg)) {
            msg = toast(msg);
        }
        if (isObject(msg)) {
            if (msg.lang) {
                msg = msg.lang[LANGUAGE.type];
            }
            if (msg.en) {
                msg = msg[LANGUAGE.type];
            }

        }
        toast(msg);
    }

    return res;
}

export function isImage(fileName, opts, extensions = IMAGE_TYPES || [
    '.jpg', '.jpeg', '.png', '.bmp'
]) {
    return isFile(fileName, opts, extensions);
}

export function getPreFile(e) {
    return e.target.files[0] || e.dataTransfer.files[0];
}

export function getFileReaderDataURL(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
        reader.onload = function(e) {
            resolve(e.target.result);
        };
    });
}

export function getUploadFile(file, opts) {
    console.log(file, opts)
    if (opts.fileType) {
        if (opts.fileType === 'image') {
            if (!isImage(file.name, opts)) {
                return;
            }
        }
        else {
            if (!isFile(file.name, opts)) {
                console.log(1)
                return;
            }
        }
    }
    let data = new FormData();
    if(opts.fileType === 'image'){
        data.append('person_img', file);
    }
    else {
        data.append('file', file);
    }
    console.log(data);
    return data;
}

export class UploadFile extends Base {
    constructor(opts) {
        super({
            apiPath : '',
            fileType: 'file',
        }, opts);
        this.file    = null;
        this.preFile = null;
        this.params  = null;
    }

    setPreFile(e) {
        console.log(e)
        this.file = this.preFile = getPreFile(e);
        return this;
    }

    setUploadFile(opts, file = this.file) {
        opts      = Object.assign({fileType: this.fileType}, opts);
        this.file = getUploadFile(file, opts);
        return this;
    }

    getFile(e) {
        this.setPreFile(e).setUploadFile();
    }

    uploadFile(options, apiPath = this.apiPath) {
        console.log(this.file)
        options = options || {};
        if (this.file && this.file instanceof FormData) {
            // log(1)
            if(this.params){
                Object.keys(this.params).forEach(key => {
                    this.file.append(key, this.params[key]);
                })
            }
            return ajax(apiPath,this.file, Object.assign({needTk: false}), Object.assign(options,{needFormData: false}));
        }
        else {
            // log(2)
            return new Promise(resolve => resolve({code: ERR_CODE}));
        }
    }

    upload(e,params,options,apiPath = this.apiPath) {
        this.params = params;
        this.getFile(e);
        console.log(this)
        return this.uploadFile(options, apiPath);
    }

    getPreFile() {
        return getFileReaderDataURL(this.preFile);
    }
}

