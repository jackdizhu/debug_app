// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import router from './router'
import store from './store'
import { request } from './com/http.js'
import Api from './com/api.js'

import browserDebug from './com/browserDebug/index.js'

// import IView from 'iview'
// import 'iview/dist/styles/iview.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 主题
import '@/them/index.less'
import '@/less/com.less'
// import config from './com/config.js'

browserDebug.settings = {
  cdn: '//s.url.cn/qqun/qun/qqweb/m/qun/confession/js/vconsole.min.js', // vconsole CDN地址
  reportUrl: '//127.0.0.1:3000/api/err/', // 错误报告地址
  otherReport: {
    key: 'reportKey'
  },
  entry: '#entry' // 请点击这个DOM元素召唤vconsole 6次
}

// 使用 路由
Vue.use(Router)
// Vue.use(IView)
Vue.use(ElementUI)

// Vue.config.productionTip = false
Vue.prototype.$request = request
Vue.prototype.$api = Api

let _vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
// 处理 语法检测
Vue.use({
  _vm
})
