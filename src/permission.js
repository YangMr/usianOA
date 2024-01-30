import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import store from './store'
import { asyncRoutes } from './router'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/404'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar 开始进度条
  NProgress.start()

  // set page title 设置标题栏
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in 获取token
  const hasToken = getToken()

  if (hasToken) {
    // 有token情况
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (!store.getters.userId) {
        // 获取到当前用户拥有的权限
        const { roles } = await store.dispatch('user/getUserInfo')
        console.log('result=>', roles)

        // 匹配出当前用户拥有的路由
        const filterRoutes = asyncRoutes.filter((item) => {
          return roles.menus.includes(item.name)
        })

        store.commit('user/setRoutes', filterRoutes)

        // 添加动态路由
        router.addRoutes([
          ...filterRoutes,
          // 解决刷新跳转到404问题
          { path: '*', redirect: '/404', hidden: true }
        ])

        // 解决刷新之后白屏问题
        next(to.path)
      } else {
        next()
      }
    }
  } else {
    // 没有token
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar 关闭进度条
  NProgress.done()
})
