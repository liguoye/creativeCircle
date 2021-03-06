import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: () => import('@/page/home/index')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/page/register.vue')
  },
  {
    path: '/forgetPassword',
    name: 'forgetPassword',
    component: () => import('@/page/forgetPassword.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/page/login.vue')
  }, {
    path: '/customerWorkOrder',
    name: 'customerWorkOrder',
    component: () => import('@/page/customerWorkOrder/index')
  }, {
    path: '/accountRecharge',
    name: 'accountRecharge',
    component: () => import('@/page/fundManagement/accountRecharge/index')
  }, {
    path: '/fundManagement',
    name: 'fundManagement',
    component: () => import('@/page/fundManagement/fundManagement/index')
  }, {
    path: '/orderMessage',
    name: 'orderMessage',
    component: () => import('@/page/fundManagement/orderMessage/index')
  }, {
    path: '/publicPointExchange',
    name: 'publicPointExchange',
    component: () => import('@/page/fundManagement/publicPointExchange/index')
  },
  {
    path: '/transferManagement',
    name: 'transferManagement',
    component: () => import('@/page/fundManagement/transferManagement/index')
  },
  {
    path: '/basicData',
    name: 'basicData',
    component: () => import('@/page/memberCenter/basicData/index')
  },
  {
    path: '/cuteHand',
    name: 'cuteHand',
    component: () => import('@/page/memberCenter/cuteHand/index')
  },
  {
    path: '/goodsManagement',
    name: 'goodsManagement',
    component: () => import('@/page/memberCenter/goodsManagement/index')
  },
  {
    path: '/inviteHaoyu',
    name: 'inviteHaoyu',
    component: () => import('@/page/memberCenter/inviteHaoyu/index')
  },
  {
    path: '/platformNotice',
    name: 'platformNotice',
    component: () => import('@/page/memberCenter/platformNotice/index')
  },
  {
    path: '/noticeDetail/:id',
    name: 'noticeDetail',
    component: () => import('@/page/memberCenter/platformNotice/noticeDetail')
  },
  {
    path: '/shopManagement',
    name: 'shopManagement',
    component: () => import('@/page/memberCenter/shopManagement/index')
  },
  {
    path: '/flowTaskManagement',
    name: 'flowTaskManagement',
    component: () => import('@/page/taoBaoAPP/flowTaskManagement/index')
  },
  {
    path: '/pubilcFlowTask',
    name: 'pubilcFlowTask',
    component: () => import('@/page/taoBaoAPP/pubilcFlowTask/index')
  },
  {
    path: '/evaluationManagement',
    name: 'evaluationManagement',
    component: () => import('@/page/taskManagement/evaluationManagement/index')
  },
  {
    path: '/managementFineBrushes',
    name: 'managementFineBrushes',
    component: () => import('@/page/taskManagement/managementFineBrushes/index')
  },
  {
    path: '/orderEarlyWarn',
    name: 'orderEarlyWarn',
    component: () => import('@/page/taskManagement/orderEarlyWarn/index')
  },
  {
    path: '/publicFineBrushes',
    name: 'publicFineBrushes',
    component: () => import('@/page/taskManagement/publicFineBrushes/index')
  },
  {
    path: '/taoBaoAsk',
    name: 'taoBaoAsk',
    component: () => import('@/page/taskManagement/taoBaoAsk/index')
  },
  {
    path: '/404',
    component: () =>
        import('@/page/404'),
    hidden: true
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      savedPosition;
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
})
