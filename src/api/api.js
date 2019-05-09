import Vue from 'vue';
import {ajax} from '@/lib/ajax/ajax';
import qs from 'qs';
import {
    Api
} from './utils/index';
import {UploadFile} from '@/lib/plugins/upload-files';
import {
    API_TYPE,
    BASE_URL
} from '@/conf/api.conf';

export const api = new Api({
    /*用户登录*/
    user               : {
        login         : (params, options) => ajax('login', params, options),
        logout        : (params, options) => ajax('logout', params, options)
    },
    /*上传图片*/
    imageOperation     : {
        uploadImage: new UploadFile({
            apiPath: 'upload', fileType: 'file'
        }),
        deleteImage: (params, options) => ajax('delete-image', params, options)
    },
});

function exportPdf(path, params, options) {
    let data             = qs.stringify(params);
    path                 = BASE_URL + API_TYPE + '/' + path + '?' + data;
    let iframe           = document.createElement('iframe');
    iframe.name          = 'hiddenIframe';
    iframe.src           = path;
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    setTimeout(() => {
        document.body.removeChild(iframe);
    }, 1000 * 60);
}

Vue.prototype.$api = api;
