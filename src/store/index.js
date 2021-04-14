import Vue from "vue"
import Vuex from "vuex"
import vuexLocal from "../plugins/vuex-persist"
import firebase from "firebase/app"
import "firebase/auth"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    token: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setToken(state, payload) {
      state.token = payload
    }
  },
  actions: {
    async login({ commit }, form) {
      try {
        const user = await firebase.auth().signInWithEmailAndPassword(form.email, form.password)
        commit("setUser", JSON.stringify(user))
        const token = await firebase.auth().currentUser.getIdToken()
        commit("setToken", token)
        Vue.axios.defaults.headers.common = { "Authorization": `Bearer ${token}` }
        alert(`Welcome ${user.user.email}`)
        return true
      } catch {
        alert("Incorrect password or username, please try again")
      }
      return false
    },
    logout({commit}){
      firebase.auth().signOut()
      commit("setUser", null)
      commit("setToken", null)
    }
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
