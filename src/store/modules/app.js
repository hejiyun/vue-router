export default {
  state: {
    // 应用名称
    appName: 'Kitty Platform',
    // 主题颜色
    themeColor: '#4b5f6e',
    // 上一次主题颜色
    oldThemeColor: '#4b5f6e',
    // 导航栏收缩状态
    collapse: false,
    // 保存加载菜单
    menuRouteLoaded: false
  },
  getters: {
    collapse(state) {
      // 对应着上面state
      return state.collapse
    }
  },
  mutations: {
    collapse(state) {
      // 改变收缩状态
      state.collapse = !state.collapse
    },
    themeColor(state, themeColor) {
      // 改变主题颜色
      state.themeColor = themeColor
    },
    oldThemeColor(state, oldThemeColor) {
      // 改变主题颜色
      state.oldThemeColor = oldThemeColor
    },
    menuRouteLoaded(state, menuRouteLoaded) {
      // 保存加载状态
      state.menuRouteLoaded = menuRouteLoaded
    }
  },
  actions: {
    onThemeChange({ commit, state }, data) {
      commit('themeColor', data.themeColor)
      commit('oldThemeColor', data.oldThemeColor)
    }
  }
}
