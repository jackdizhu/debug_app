import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'

import Page from '@/page/index'
import VModelTest from '@/page/v_test/VModelTest.vue'
import VAwesomeSwiper from '@/page/v_test/VAwesomeSwiper.vue'
import VAwesomeSwiper2 from '@/page/v_test/VAwesomeSwiper.1.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      component: Page,
      children: [
        {
          path: '/page/VModelTest',
          name: 'VModelTest',
          component: VModelTest
        },
        {
          path: '/page/VAwesomeSwiper',
          name: 'VAwesomeSwiper',
          component: VAwesomeSwiper
        },
        {
          path: '/page/VAwesomeSwiper2',
          name: 'VAwesomeSwiper2',
          component: VAwesomeSwiper2
        }
      ]
    }
  ]
})
