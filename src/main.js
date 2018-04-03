// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import elementUI from 'element-ui'
// import websocket from 'websocket'
import axios from './axios'
import store from './store'
import {regX, wbk} from './utils'

Vue.prototype.$axios = axios
Vue.prototype.$store = store
Vue.prototype.$RegX = regX

Vue.use(elementUI)

Vue.prototype.$wbk = wbk
let eventBus = {
  install (Vue, options) {
    Vue.prototype.$bus = new Vue({
      data () {
        return {
          evs: []
        }
      }
    })
  }
}
Vue.use(eventBus)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
