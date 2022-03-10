import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import My from '@/components/my'
import goodsDetails from '@/components/details'
import login from '@/components/login'
import regist from '@/components/regist'
import forget from '@/components/forget'
import cart from '@/components/cart'
import confirmOrder from '@/components/confirmOrder'
import pay from '@/components/pay'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/my',
      component: My
    },
    {
      path: '/details',
      name: 'details',
      component: goodsDetails
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/regist',
      component: regist
    },

    {
      path: '/forget',
      component: forget
    },
    {
      path: '/cart',
      component: cart
    },
    {
      path: '/confirmOrder',
      name: 'confirmOrder',
      component: confirmOrder
    },
    {
      path: '/pay',
      name: 'pay',
      component: pay
    }


  ]
})
