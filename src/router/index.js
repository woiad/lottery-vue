import Vue from 'vue'
import Router from 'vue-router'
import {routers} from './router'
import util from '../util'

Vue.use(Router)

export const router = new Router({
  routes: routers
})

router.beforeEach((to, from, next) => {
  util.title(to.meta.title)
  console.log(to)
  let userName = ''
  if (!to.name) {
    routers.push({name: 'error-404'})
  }
  if (localStorage.getItem('userName')) {
    userName = localStorage.getItem('userName')
  }
  if (to.path === '/' && !userName) {
    router.push({name: 'login'})
  }
  next()
})
