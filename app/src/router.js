import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store.js'

import Home from './views/Home.vue'
import News from './views/News.vue'
import Scheduler from './views/Scheduler.vue'
import Admin from './views/admin/Index.vue'
import AdminNews from './views/admin/News.vue'
import AdminHome from './views/admin/Home.vue'
import AdminLogin from './views/admin/Login.vue'
import PageNotFound from './views/errors/404.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/start',
      component: Home
    },
    {
      path: '/news',
      component: News
    },
    {
      path: '/scheduler',
      component: Scheduler
    },
    {
      path: '/admin',
      component: Admin,
      children: [
        {
          path: '',
          component: AdminHome,
          meta: { requiresAuth: true }
        },
        {
          path: 'login',
          component: AdminLogin
        },
        {
          path: 'news',
          component: AdminNews,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/error/404',
      component: PageNotFound
    },
    {
      path: '*',
      redirect: '/error/404'
    }
  ]
})

router.beforeEach((to, from, next) => {
  //AUTHENTICATED ROUTES
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.logged) {
      next({
        path: '/admin/login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router