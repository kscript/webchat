// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import elementUI from 'element-ui'
import axios from './axios'
import store from './store'

Vue.prototype.$axios = axios
Vue.prototype.$store = store

Vue.use(elementUI)

var eventBus = {
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
