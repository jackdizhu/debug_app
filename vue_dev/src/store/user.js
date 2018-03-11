import Vue from 'vue'

// export const USER_SIGNIN = 'user_signin' //登录成功 指向 方法
// export const USER_SIGNOUT = 'user_signout' //退出登录 指向 方法
// const _storage = sessionStorage
const _storage = localStorage
const storage = {
  getItem: (item) => {
    return _storage.getItem(item)
  },
  setItem: (item, str) => {
    return _storage.setItem(item, str)
  },
  removeItem: (item) => {
    return _storage.removeItem(item)
  }
}

export default {

  state: {
    user: (() => {
      let _u = {}
      try {
        _u = JSON.parse(storage.getItem('user'))
      } catch (error) {
        storage.removeItem('user')
        _u = {}
      }
      return _u
    })(),
    token: storage.getItem('token') || ''
  },
  // 同步操作
  mutations: {
    UPDATE_TOKEN (state, token) {
      if (token) {
        state.token = token
        storage.setItem('token', token)
      } else {
        storage.removeItem('token')
        Vue.delete(state, 'token')
      }
    },
    // 方法名 建议大写
    USER_SIGNIN (state, user) {
      storage.setItem('user', JSON.stringify(user))
      // es6 新增方法 方法用于将所有可枚举的属性的值从一个或多个源对象复制到目标对象
      state.user = user
    },
    USER_SIGNOUT (state) {
      storage.removeItem('user')
      Object.keys(state).forEach(k => Vue.delete(state, k))
    }
  },
  // 异步操作
  actions: {
    // {commit} 解构赋值 直接获取属性方法
    user_signin ({commit}, res) {
      commit('USER_SIGNIN', res.user)
      commit('UPDATE_TOKEN', res.token)
    },
    // {commit} 解构赋值 直接获取属性方法
    user_signout ({commit}) {
      commit('USER_SIGNOUT')
      commit('UPDATE_TOKEN', null)
    }
  },
  // getters
  getters: {
    getUserId: function (state) {
      return (state.user && state.user._id) || ''
    }
  }
}
