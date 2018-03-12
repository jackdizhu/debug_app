import Vue from 'vue'
import Router from 'vue-router'

import Page from '@/page/index'
import Home from '@/page/home'
import Err from '@/page/home/error'
import AddProject from '@/page/home/addProject'
import ProjectList from '@/page/home/projectList'
import ProjectDetails from '@/page/home/projectList/projectDetails'

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
          path: '/home/error',
          name: 'error',
          component: Err
        },
        {
          path: '/home/addProject',
          name: 'addProject',
          component: AddProject
        },
        {
          path: '/home/projectList',
          name: 'projectList',
          component: ProjectList
        },
        {
          path: '/home/projectList/projectDetails',
          name: 'projectDetails',
          component: ProjectDetails
        }
      ]
    }
  ]
})
