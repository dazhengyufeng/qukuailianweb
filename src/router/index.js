import Vue from 'vue'
import Router from 'vue-router'
import BlogTable from '@/components/BlogTable'
import Login from '@/components/Login'
import SignIn from '@/components/SignIn'
import Content from '@/components/Content'
import Wallet from '@/components/Wallet'
import Transaction from '@/components/Transaction'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // 登录
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    // 主内容
    {
      path: '/content',
      name: 'Content',
      component: Content,
      children: [
        {
          path: 'blogTable',
          name: 'BlogTable',
          component: BlogTable
        },
        {
          path: 'wallet',
          name: 'Wallet',
          component: Wallet
        },
        {
          path: 'transaction',
          name: 'Transaction',
          component: Transaction
        },
      ]
    },
    // 注册
    {
      path: '/signIn',
      name: 'SignIn',
      component: SignIn
    },
  ]
})
