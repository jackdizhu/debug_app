import Vue from 'vue'
import Router from 'vue-router'

import Page from '@/page/index'
import Home from '@/page/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Page,
      children: [
        // {
        //   path: '/page/VModelTest',
        //   name: 'VModelTest',
        //   component: VModelTest
        // }
      ]
    },
    {
      path: '/home',
      component: Home,
      children: [
        // {
        //   path: '/page/VModelTest',
        //   name: 'VModelTest',
        //   component: VModelTest
        // }
      ]
    }
  ]
})
