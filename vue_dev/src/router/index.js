import Vue from 'vue'
import Router from 'vue-router'

import Page from '@/page/index'
import Home from '@/page/home'
import AddProject from '@/page/home/addProject'
import ProjectList from '@/page/home/projectList'

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
        {
          path: '/home/addProject',
          name: 'addProject',
          component: AddProject
        },
        {
          path: '/home/projectList',
          name: 'projectList',
          component: ProjectList
        }
      ]
    }
  ]
})
