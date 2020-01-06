export default {
  state: {
    // 用户权限标识集合
    perms: []
  },
  getters: {

  },
  mutations: {
    setPerms(state, perms) {
      // 用户权限标识集合
      state.perms = perms
    }
  },
  actions: {
  }
}
