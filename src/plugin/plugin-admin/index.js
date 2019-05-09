// Element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 组件
import '@/components'
// svg 图标
import '@/components/cp-icon-svg/cp-icon-svg';
// bind some to Vue.prototype
require('@/lib/plugins/vue-global').init();
// vue plugins进度条
import '@/lib/plugins/progress-bar';
/** test **/
import '@/lib/plugins/get-language-value';
//  api   接口
import '@/api/api';
//  filters 过滤器
import '@/filters/filters';
// set Debug 是否需要登录权限
import '@/conf/set-debug';
// refreshRem
// import '@/lib/plugins/refresh-rem';
export default {
  async install (Vue, options) {
    // Element
    Vue.use(ElementUI)
  }
}
