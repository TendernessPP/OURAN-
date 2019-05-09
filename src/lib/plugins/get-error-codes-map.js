let str  = `
define('RETURN_OK', '1');
define('ERR_WRONG_VERSION', '-1'); //版本号错误
define('ERR_NO_ACTION', '-2'); //接口名称错误或非法（字母数字中划线组合）
define('ERR_WRONG_PARAM', '-3'); //接口参数错误
define('ERR_DB_FAILED', '-4'); //数据库读写错误
define('ERR_UPLOAD_FAILED', '-5');          //文件上传失败
define('ERR_REDIS_DOWN', '-6');
define('ERR_SIGNATURE', '-7');
define('ERR_USER_NOT_EXISTS', '-8');        //用户不存在
define('ERR_CONTENT_NOT_EXISTS', '-9');     //内容不存在
define('ERR_CREATE_THUMBNAIL', '-10');      //创建缩略图失败
define('ERR_NO_LOGIN', '-11');              //登录失败
define('ERR_PROJECT_NOT_EXISTS', '-12');    //项目不存在
define('ERR_PROJECT_HAS_EXISTS', '-13');    //项目已存在
define('ERR_UNEQUAL_PASSWORD', '-14');      //密码不相等
define('ERR_ORIGINAL_PASSWORD', '-15');     //原密码错误
define('ERR_CREATE_QR_CODE', '-16');     //创建二维码失败
define('ERR_SEND_EMAIL', '-17');     //邮件发送失败
define('ERR_POWER_NOT_ALLOWED', '-18');     //没有权限
define('ERR_EVENT_NOT_EXISTS', '-19');     //event不存在
define('ERR_GENERATED_POSTER', '-20');       //生成海报失败
`;
let path = require('path');
let fs   = require('fs');
let res  = str.split('\n');

let arr = '';
res.forEach(str => {
    let matchArr = str.match(/define\s*\(\s*'\s*(\w+)\s*'\s*,\s*('[0-9-]*')[^\/\/]*\/\/\s*(.*)/);
    // console.log(matchArr[1], matchArr[2] + '\n');
    if (matchArr) {
        arr += `{code: ${matchArr[2]}, msg: '${matchArr[3]}'},\n`;
    }
});
arr = arr.slice(0, -1);
console.log(arr);
