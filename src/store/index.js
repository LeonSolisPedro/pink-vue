import Vue from "vue"
import Vuex from "vuex"
import vuexLocal from "../plugins/vuex-persist"
import firebase from "firebase/app"
import "firebase/auth"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
      displayName: null,
      email: null,
      emailVerified: null
    },
    isAuthenticated: false,
    token: null
  },
  mutations: {
    setUserInfo(state, payload) {
      state.userInfo.displayName = payload?.displayName
      state.userInfo.email = payload?.email
      state.userInfo.emailVerified = payload?.emailVerified
    },
    setAuth(state, payload) {
      state.isAuthenticated = payload
    },
    setToken(state, payload) {
      state.token = payload
    }
  },
  actions: {
    async login({ commit, state }, form) {
      try {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        await firebase.auth().signInWithEmailAndPassword(form.email, form.password)
        const token = await firebase.auth().currentUser.getIdToken()
        commit("setAuth", true)
        commit("setToken", token)
        Vue.axios.defaults.headers.common = { "Authorization": `Bearer ${token}` }
        alert(`Welcome ${state.userInfo.displayName ?? ""}`)
        return true
      } catch {
        alert("Incorrect password or username, please try again")
      }
      return false
    },
    async registerUser(_, form) {
      try {
        await Vue.axios.post("api/register", form)
        return true
      } catch (error) {
        alert("An error ocurred, please verify your form and try again")
        console.error(error)
      }
      return false
    },
    async refreshToken({ commit, dispatch }) {
      try {
        const token = await firebase.auth().currentUser.getIdToken(true)
        Vue.axios.defaults.headers.common = { "Authorization": `Bearer ${token}` }
        commit("setToken", token)
        return true
      } catch (error) {
        console.error(`Unable to refresh the token: ${error}`)
        dispatch("logout")
      }
      return false
    },
    logout({ commit }) {
      firebase.auth().signOut()
      commit("setAuth", false)
      commit("setToken", null)
    }
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
