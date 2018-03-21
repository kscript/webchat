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
