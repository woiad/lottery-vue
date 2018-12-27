import index from '.././components/main'

export const loginRouter = {
  name: 'login',
  path: '/login',
  meta: {
    title: 'Login'
  },
  component: () => import('@/components/login/login')
}

export const MainRouter = {
  name: 'home',
  path: '/',
  meta: {
    title: '首页'
  },
  component: index,
  children: [
    {name: 'lotterySet', path: '/lotterySet', component: () => import('@/components/lotterySet/lotterySet'), meta: {title: '抽奖设置'}},
    {name: 'prizeSet', path: '/prizeSet', component: () => import('@/components/prizeSet/prizeSet'), meta: {title: '奖品设置'}},
    {name: 'monitor', path: '/monitor', component: () => import('@/components/monitor/monitor'), meta: {title: '状态监控'}},
    {name: 'personSet', path: '/personSet', component: () => import('@/components/personSet/personSet'), meta: {title: '人员设置'}}
  ]
}

export const LotteryRouter = {
  name: 'lotteryDevice',
  path: '/lucky',
  component: () => import('@/components/lotteryDevice/lotteryDevice'),
  meta: {title: '开始抽奖'}
}

export const page404 = {
  path: '/*',
  name: 'error-404',
  meta: {
    title: '404-页面不存在'
  },
  component: () => import('@/components/error-page/error-404')
}
export const routers = [
  loginRouter,
  MainRouter,
  LotteryRouter,
  page404
]
