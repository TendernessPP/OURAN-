const vcity = {
    11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
    21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏",
    33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南",
    42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆",
    51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃",
    63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"
};

let checkCard = function (card) {
    card = card.toString();
    //是否为空
    if (card === '') {
        return false;
    }
    //校验长度，类型
    if (isCardNo(card) === false) {
        return false;
    }
    //检查省份
    if (checkProvince(card) === false) {
        return false;
    }
    //校验生日
    if (checkBirthday(card) === false) {
        return false;
    }
    //检验位的检测
    // if (checkParity(card) === false) {
    //     return false;
    // }
    return true;
};

//检查号码是否符合规范，包括长度，类型
let isCardNo = function (card) {
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    let reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
    if (reg.test(card) === false) {
        return false;
    }

    return true;
};

//取身份证前两位,校验省份
let checkProvince = function (card){
    let province = card.substr(0, 2);
    if (vcity[province] == undefined) {
        return false;
    }
    return true;
};

//提取生日对象
let extractBirthDayObj = function (card) {
    let len = card.length;
    //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
    if (len == 15) {
        let re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
        let birthday   = getBirthday(len, re_fifteen)
        return birthday;
    }
    //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
    if (len == 18) {
        let re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
        let birthday    = getBirthday(len, re_eighteen)
        return birthday;
    }
    function getBirthday(len, re_fifteen) {
        let arr_data = card.match(re_fifteen);
        let year     = arr_data[2];
        let month    = arr_data[3];
        let day      = arr_data[4];
        let birthday = {};
        if (len == 15) year = '19' + year;
        return birthday = {year, month, day}
    }
}

//检查生日是否正确
let checkBirthday = function (card) {
    let birthdayObj = extractBirthDayObj(card)
    let birthday    = new Date(birthdayObj.year + '/' + birthdayObj.month + '/' + birthdayObj.day);
    return verifyBirthday(birthdayObj.year, birthdayObj.month, birthdayObj.day, birthday);
};

//校验日期
let verifyBirthday = function (year, month, day, birthday) {
    let now      = new Date();
    let now_year = now.getFullYear();
    //年月日是否合理
    if (birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
        //判断年份的范围（3岁到100岁之间)
        let time = now_year - year;
        if (time >= 3 && time <= 100) {
            return true;
        }
        return false;
    }
    return false;
};

//校验位的检测
let checkParity = function (card) {
    //15位转18位
    card    = changeFivteenToEighteen(card);
    let len = card.length;
    if (len == '18') {
        let arrInt   = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        let arrCh    = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        let cardTemp = 0, i, valnum;
        for (i = 0; i < 17; i++) {
            cardTemp += card.substr(i, 1) * arrInt[i];
        }
        valnum = arrCh[cardTemp % 11];
        if (valnum == card.substr(17, 1)) {
            return true;
        }
        return false;
    }
    return false;
};

//15位转18位身份证号
let changeFivteenToEighteen = function (card) {
    if (card.length == '15') {
        let arrInt   = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        let arrCh    = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        let cardTemp = 0, i;
        card         = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
        for (i = 0; i < 17; i++) {
            cardTemp += card.substr(i, 1) * arrInt[i];
        }
        card += arrCh[cardTemp % 11];
        return card;
    }
    return card;
};

module.exports = {
    checkCard,
    extractBirthDayObj
};