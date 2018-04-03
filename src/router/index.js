import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import axios from '../axios'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/Message',
      meta: {
        keep: false,
        name: 'home',
        type: 'home',
        requireAuth: false
      },
      component: resolve => require(['../components/common/home.vue'], resolve),
      children: [
        {
          path: '/Message',
          name: 'Message',
          meta: {
            keep: false,
            name: 'Message',
            type: 'page',
            requireAuth: true
          },
          component: resolve => require(['../components/pages/Message/index.vue'], resolve)
        },
        {
          path: '/Post',
          name: 'Post',
          meta: {
            keep: false,
            name: 'Post',
            type: 'page',
            requireAuth: true
          },
          component: resolve => require(['../components/pages/Post/index.vue'], resolve)
        },
        {
          path: '/Setting',
          name: 'Setting',
          meta: {
            keep: false,
            name: 'Setting',
            type: 'page',
            requireAuth: true
          },
          component: resolve => require(['../components/pages/Setting/index.vue'], resolve)
        },
        {
          path: '/Customer',
          name: 'Customer',
          meta: {
            keep: false,
            name: 'Customer',
            type: 'page',
            requireAuth: true
          },
          component: resolve => require(['../components/pages/Customer/index.vue'], resolve)
        }
      ]
    },
    {
      path: '/Auth',
      name: 'Auth',
      meta: {
        keep: false,
        name: 'Auth',
        type: 'Auth',
        requireAuth: false
      },
      component: resolve => require(['../components/common/Auth.vue'], resolve)
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!to.meta.requireAuth) {
    next()
  } else if (store.getters.isAuth) {
    next()
  } else {
    axios({
      url: store.getters.v2 + 'weibo_im/user.php',
      method: 'GET'
    }).then(response => {
      response.data = JSON.parse(localStorage.getItem('token'))
      let token = response.data.result.token
      if (token) {
        store.commit('auth', true)
        store.commit('token', token)
        store.commit('user', response.data.result)
        next({
          path: '/'
        })
      } else {
        next({
          path: '/Auth'
        })
      }
    }).catch(err => {
      console.log(err)
      next({
        path: '/Auth'
      })
    })
  }
})

export default router
