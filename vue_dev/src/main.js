import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import router from './router'
import store from './store'
import { request } from './com/http.js'
import Api from './com/api.js'
// 时间日期 处理库
import moment from 'moment'

// import browserDebug from './com/browserDebug/index.js'

// import IView from 'iview'
// import 'iview/dist/styles/iview.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 主题
import '@/them/index.less'
import '@/less/com.less'
// import config from './com/config.js'

// browserDebug({
//   reportUrl: 'http://127.0.0.1:3000/projectErrorInfo_v1/addProjectErrorInfo',
//   key: '7433dcd97077d2502cf0e3051001bc3b'
// }, window)
((W) => {
  W.onerror = function (msg, url, line, col, error) {
    console.log({msg, url, line, col, error})
  }
})(window)

// 使用 路由
Vue.use(Router)
// Vue.use(IView)
Vue.use(ElementUI)

// Vue.config.productionTip = false
Vue.prototype.$request = request
Vue.prototype.$api = Api
Vue.prototype.$moment = moment

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
