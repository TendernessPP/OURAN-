import Toast from './toast/toast';
import Vue from 'vue';

export const toast = (msg, duration = 1500) => {
    Toast({
        message : msg,
        position: 'middle',
        duration
    });
};

Vue.prototype.$toast = toast;
