import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

// 自定义指令 (局部 / 全局)
Vue.directive('permission', {
  inserted: function(el, binding) {
    // 1. 先获取当前按钮所绑定的自定义指令的值
    const currentValue = binding.value
    console.log('---', currentValue)
    // 2. 获取接口返回的按钮权限列表

    const permissionList = store.getters.points || []
    console.log('+++', permissionList)
    // 3. 判断当前按钮所绑定的自定义指令的值是否存在于按钮权限列表中
    if (!permissionList.includes(currentValue)) {
      // console.log('el===>', el)
      el.remove()
    }

    // 4. 如果不存在, 则移除当前按钮
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
