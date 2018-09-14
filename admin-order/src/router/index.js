import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Orders from '@/components/Orders'
import Product from '@/components/Product'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      linkActiveClass: 'active',
      component: Home
    }, {
      path: '/Orders/:page',
      name: 'Orders',
      linkActiveClass: 'active',
      component: Orders
    }, {
      path: '/Product',
      name: 'Product',
      linkActiveClass: 'active',
      component: Product
    }, {
      path: '*',
      redirect: '/'
    }
  ]
})
