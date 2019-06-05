import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import { loginApi, isloginApi } from './api/user'
import util from './libs/local'
export default new Vuex.Store({
  state: {
    nickname: '',
    showloading: false
  },
  mutations: {
    setnickname(state, payload) {
      state.nickname = payload
    },
    showloading(state) {
      state.showloding = true
    },
    hideloading(state) {
      state.showloding = false
    }
  },
  actions: {
    //这是一个登陆得actions
    async tologin({ commit }, { user, pass }) {
      //actions提交登陆
      const { token, nickname } = await loginApi(user, pass)
      //token存在本地存储
      util.setlocal('token', token)
      commit('setnickname', nickname)
    },
    //验证是否登陆得actions
    async valilogin({ commit }) {
      const { nickname, token } = await isloginApi()
      commit('setnickname', nickname)
      util.setlocal('token', token)
      return nickname !== undefined
    }
  }
})
