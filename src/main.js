// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import requests from '../src/utils/request.js'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'



import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: 'wOpTc8W4egqlCtKxhXC92NrngGXXAYVQ' //官方提供的ak秘钥
})
Vue.use(Element)
Vue.prototype.rq = requests

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

