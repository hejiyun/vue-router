import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import NotFound from '@/views/Error/404'
import Dashboard from '@/views/dashboard'
import api from '@/http/api'
import store from '@/store'
import { isURL } from '@/utils/validate'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        { path: '', component: Dashboard, name: '主页' }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/404',
      name: 'notFound',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 登录界面登录成功之后，会把用户信息保存在会话
  // 存在时间为会话生命周期，页面关闭即失效。
  const user = sessionStorage.getItem('user')
  if (to.path === '/login') {
    // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
    if (user) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (!user) {
      // 如果访问非登录界面，且户会话信息不存在，代表未登录，则跳转到登录界面
      next({ path: '/login' })
    } else {
      // 加载动态菜单和路由
      addDynamicMenuAndRoutes()
      next()
    }
  }
})

/**
* 加载动态菜单和路由
*/
function addDynamicMenuAndRoutes() {
  if (store.state.app.menuRouteLoaded) {
    console.log('动态菜单及路由已存在')
    return
  }
  api.menu.findMenuTree()
    .then((res) => {
      // 添加动态路由
      store.commit('setMenuTree', res.data)
      // 保存加载状态
      store.commit('menuRouteLoaded', true)
      const dynamicRoutes = addDynamicRoutes(res.data)
      router.options.routes[0].children = router.options.routes[0].children.concat(dynamicRoutes)
      router.addRoutes(router.options.routes)
    }).then(res => {
      const user = sessionStorage.getItem('user')
      api.user.findPermissions({ 'name': user }).then(res => {
        store.commit('serPerms', res.data)
      })
    })
    .catch(function(res) {
      alert(res + '我是')
    })
}

/**
* 添加动态(菜单)路由
* @param {*} menuList 菜单列表
* @param {*} routes 递归创建的动态(菜单)路由
*/
function addDynamicRoutes(menuList = [], routes = []) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].children && menuList[i].children.length >= 1) {
      temp = temp.concat(menuList[i].children)
    } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
      menuList[i].url = menuList[i].url.replace(/^\//, '')
      // 创建路由配置
      var route = {
        path: menuList[i].url,
        component: null,
        name: menuList[i].name,
        meta: {
          menuId: menuList[i].menuId,
          title: menuList[i].name,
          isDynamic: true,
          isTab: true,
          iframeUrl: ''
        }
      }
      // url以http[s]://开头, 通过iframe展示
      if (isURL(menuList[i].url)) {
        route['path'] = menuList[i].url
        route['name'] = menuList[i].name
        route['meta']['iframeUrl'] = menuList[i].url
      } else {
        try {
          // 根据菜单URL动态加载vue组件，这里要求vue组件须按照url路径存储
          // 如url="sys/user"，则组件路径应是"@/views/sys/user.vue",否则组件加载不到
          const array = menuList[i].url.split('/')
          const url = array[0].substring(0, 1).toUpperCase() + array[0].substring(1) + '/' + array[1].substring(0, 1).toUpperCase() + array[1].substring(1)
          route['component'] = resolve => require([`@/views/${url}`], resolve)
          // 给需要的菜单路由添加路由参数
          if (menuList[i].isDetail) {
            const str = route.path + '/:id?'
            route.path = str
          }
        } catch (e) {
          console.log(e)
        }
      }
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    addDynamicRoutes(temp, routes)
  } else {
    console.log(routes)
  }
  return routes
}

export default router
