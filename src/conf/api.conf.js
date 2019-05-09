import {IS_DEBUG_NYU_1} from './set-debug';
// 登出地址
// export const LOGOUT_URL = 'https://nyu-asp.worknrock.com:8090/Shibboleth.sso/Logout?return=https%3A//shibbolethqa.es.its.nyu.edu/idp/profile/Logout';
export const LOGOUT_URL        = 'https://nyu-asp.worknrock.com:8091/Shibboleth.sso/Logout';
export const LOGIN_URL         = 'https://shibbolethqa.es.its.nyu.edu/idp/profile/SAML2/Redirect/SSO?execution=e82s1';
// 前台地址
export const ORIGIN_WWW        = IS_DEBUG_NYU_1
    ? 'https://nyu-asp.worknrock.com:8091'
    : 'https://asset-sharing.shanghai.nyu.edu';
export const ORIGIN_WWW_DETAIL = ORIGIN_WWW + '#' + '/product-detail';

/** 接口地址 **/
const ORIGIN                     = 'http://wx-dev-php.worknrock.com';
export const BASE_URL            = ORIGIN + '/' + 'api/1.0' + '/';
export const API_TYPE            = 'pc';
export const PICTURE_ADDRESS_URL = ORIGIN + '/' + 'file';
/** webService Api 腾讯位置服务 **/
export const TX_API_URL = 'https://apis.map.qq.com/ws/place/v1/suggestion';

/** 请求api返回配置 **/
export const RETURN_OK            = '1'; //成功
export const RETURN_ERR_OTHER_MSG = '服务器内部错误';
// 需特殊处理的error code
export const ERR_LOGIN            = '-27'; // 登录失败
export const ERR_AUTH             = '-31'; // 没有权限
export const ERR_NETWORK          = '-100'; // 网络错误
// 通用error code
export const ERROR_CODES_MAP = [
    {code: '-1', msg: '版本号错误'},
    {code: '-2', msg: '接口名称错误或非法（字母数字中划线组合）'},
    {code: '-3', msg: '接口参数错误'},
    {code: '-4', msg: '数据库读写错误'},
    {code: '-5', msg: '文件上传失败'},
    {code: '-8', msg: '用户不存在'},
    {code: '-9', msg: '内容不存在'},
    {code: '-10', msg: '创建缩略图失败'},
    {code: '-11', msg: '登录失败'},
    {code: '-12', msg: '项目不存在'},
    {code: '-13', msg: '项目已存在'},
    {code: '-14', msg: '密码不相等'},
    {code: '-15', msg: '原密码错误'},
    {code: '-16', msg: '创建二维码失败'},
    {code: '-17', msg: '邮件发送失败'},
    {code: '-18', msg: '没有权限'},
    {code: '-19', msg: 'event不存在'},
    {code: '-20', msg: '生成海报失败'},
];
