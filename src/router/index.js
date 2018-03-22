import Vue from 'vue'
import Router from 'vue-router'
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
            requireAuth: false
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
            requireAuth: false
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
            requireAuth: false
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
            requireAuth: false
          },
          component: resolve => require(['../components/pages/Customer/index.vue'], resolve)
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (1 || to.meta.type === 'index' || !to.meta.requireAuth) {
    next()
  }
})

export default router
