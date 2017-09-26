/**
 * 入口
 *
 * @author zhaomiao at 2017-08-30
 */
import Vue from 'vue'
import App from './App'
import router from './router'
import './utils/rem'
import FastClick from 'fastclick'
import 'normalize.css/normalize.css'
import './styles/reset.less'

/**
 * promise 数据处理
 * [axios 文档](https://github.com/mzabriskie/axios)
 */
import Axios from './utils/ajax'
// 把 `axios` 模块挂载到 `vue` 全局上，从而能够全局调用方法
Vue.prototype.$http = Axios
/**
 * 消除物理点击和 click 移动浏览器上的事件触发之间的300毫秒延迟
 */
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  /**
   * 路由发生变化修改页面 `title` (需要在路由配置内进行配置 `title`)
   */
  // if (to.meta.title) document.title = to.meta.title
  // next()
})

/* eslint-disable no-new */

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
