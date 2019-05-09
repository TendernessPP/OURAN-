import Vue from 'vue';
import {
    isArray,
    isNumber
} from '@/lib/plugins/validation';
import {logWarn} from '@/lib/plugins/log';
import {
    BUDGET_STATUS,
    INPUT_METHODS,
    INPUT_METHODS_NEED_OPTION_NAME_NUMS
} from '@/conf/app.conf';
import {
    DEFAULT_LANGUAGE_TYPES,
    LANGUAGE
} from '@/conf/lang.conf';
import {getValueByKeyStr} from '@/lib/plugins/get-value';
import moment from 'moment';

function formatNumToIdleAssetStatus(assetType, num) {
    let lang           = {};
    let apiDataMapping = LANGUAGE['en'].idleAssetsStatus[assetType].apiDataMapping;

    DEFAULT_LANGUAGE_TYPES.forEach(type => {
        let idleAssetsStatus = LANGUAGE[type].idleAssetsStatus[assetType];
        let res              = num !== -1
            ? idleAssetsStatus.data.find((item, index) => apiDataMapping[index] === num)
            : '';
        if (res === undefined) {
            res = '';
        }
        lang[type] = res;
    });

    return {
        type: 'lang',
        data: lang
    };
}

function formatIdleAssetStatusIndexToApiNum(assetType, index) {
    let toApiParamsMapping = LANGUAGE['en'].idleAssetsStatus[assetType].toApiParamsMapping;
    return toApiParamsMapping[index];
}

export const filters = {
    /**
     * 数字进两位，小数点后舍弃
     * @param num
     * @returns {Number}
     */
    carry2Bit(num) {
        if (!isNumber(num)) logWarn('TypeWarning: the type of arguments[0] should be number!');
        return parseInt(num / 100);
    },
    formatLang(value, target, keyName, index) {
        let lang = {en: getValueByKeyStr(target, keyName)};
        ['cn'].forEach(type => {
            let key = `${keyName}_${type}`;
            if (getValueByKeyStr(target, key)) {
                lang[type] = getValueByKeyStr(target, key);
            }
        });
        return {
            type: 'lang',
            data: lang
        };
    },
    /** ---- attribute **/
    formatTime(time) {
        return moment(time).format('HH:mm');

    },
    formatTimetoHH(time) {
        let hours = moment(time, 'HH:mm:ss').format('HH');
        if (hours == 0 && time == '24:00')
            return 24;
        else
            return hours;
    },
    formatTimetoMM(time) {
        return moment(time, 'HH:mm:ss').format('mm');
    },
    formatDate(dateStr, formatStr) {
        formatStr = formatStr || 'YYYY-MM-DD';
        if (dateStr) {
            return moment(new Date(dateStr)).format(formatStr);
        }
        else {
            return '';
        }
    },

    formatDate_en(dateStr, formatStr) {
        formatStr = formatStr || 'MM/DD/YYYY';
        if (dateStr) {
            return moment(new Date(dateStr)).format(formatStr);
        }
        else {
            return '';
        }
    },

    formatDateTime(dateStr) {
        let formatStr = 'YYYY-MM-DD HH:mm';
        if (dateStr) {
            let result = moment(new Date(dateStr)).format(formatStr);
            if (result === 'Invalid date') {
                return '0000-00-00 00:00';
            }
            else {
                return result;
            }
        }
        else {
            return '';
        }
    },
    formatDateTime_en(dateStr) {
        let formatStr = 'MM/DD/YYYY HH:mm';
        if (dateStr) {
            let result = moment(new Date(dateStr)).format(formatStr);
            if (result === 'Invalid date') {
                return '00/00/0000 00:00';
            }
            else {
                return result;
            }
        }
        else {
            return '';
        }
    },
    formatDateToServer(dateStr) {
        let formatStr = 'YYYY-MM-DD';
        return filters.formatDate(dateStr, formatStr);
    },
    formatDateMonth(dateStr) {
        let formatStr = 'YYYY-MM';
        return filters.formatDate(dateStr, formatStr);
    },
    formatDateMonth_en(dateStr) {
        let formatStr = 'MM/YYYY';
        return filters.formatDate(dateStr, formatStr);
    },
    formatDateYear(dateStr) {
        let formatStr = 'YYYY';
        return filters.formatDate(dateStr, formatStr);
    },
    formatToFixed(value, bits = 2) {
        let multiple = Math.pow(10, bits);
        return Math.round(value * multiple) / multiple;
    },
    // -------------
    /**
     * 将会议状态由数字转为字符
     * @param status
     * @returns {string}
     */
    formatMeetingRoom(meeting_name) {
        return meeting_name.meeting_room_location + meeting_name.meeting_room_name;
    },
    formatMeetingDateBetween(start_time,end_time) {
        let date = start_time ? String(start_time).split(' ')[0]:null;
        let start_date = start_time ? String(start_time).split(' ')[1]:null;
        let end_date = end_time ? String(end_time).split(' ')[1]:null;
        return date + ' ' + start_date + '~' + end_date;
    },
    formatPlatFormMeetingStatusNumberToString(status,start_time,end_time,target) {
        if(status == 4) {
            let start_date = new Date(start_time);
            let end_date = new Date(end_time);
            let now_date = new Date();
            if(now_date.getTime() > start_date.getTime() && now_date.getTime() < end_date.getTime()) {
                target.status = 5;
            }
            else if(now_date.getTime() > end_date.getTime()) {
                target.status = 6;
            }
        }
        return BUDGET_STATUS[parseInt(target.status - 1)];
    },
    formatMeetingDisplayName(display_name,meeting_name) {
        return display_name = display_name ? display_name:meeting_name;
    },
    formatActualCount(actualCount, totalCount) {
        let percent = actualCount / totalCount * 100;
        if (isNaN(percent)) {
            return actualCount;
        }
        else {
            return actualCount + ` ( ${Math.round(actualCount / totalCount * 100)}% )`;
        }
    },
    /*Budget*/
    formaFiscalYear(fiscal_year_info) {

        return fiscal_year_info.fiscal_year;
    },
    formaTypeInfo(type_info) {

        return type_info.type_name;
    },
    formaUserInfo(user_info) {

        return user_info.display_name;
    },
    formaAmount(user_info) {
        user_info = parseFloat((user_info + "").replace(/[^\d\.-]/g, "")) + "";
        let l = user_info.split(".")[0].split("").reverse();
        let t = "";
        for (let i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return '￥'+t.split("").reverse().join("") ;
    },
    formaTime(submit_time) {
        if (submit_time) {
            let timeSlice = submit_time.slice(0,11);
            return timeSlice;
        }else {
            return '';
        }

    },
    formaStatusToString(status) {
        return BUDGET_STATUS[parseInt(status - 1)];
    },
    /*Budget detail*/
    ledgerAccount(ledger_account_info){
        return ledger_account_info.ledger_account_name;
    },
    costCenter(cost_center_info){
        return cost_center_info.cost_center_name;
    }
};
// Vue上全局注册filters
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

Vue.prototype.$filters = filters;
