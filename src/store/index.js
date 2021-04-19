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
    setToken(state, payload) {
      state.token = payload
      state.isAuthenticated = payload ? true : false
      Vue.axios.defaults.headers.common = { "Authorization": `Bearer ${payload}` }
    }
  },
  actions: {
    async login({ commit, state }, form) {
      try {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        await firebase.auth().signInWithEmailAndPassword(form.email, form.password)
        let token = await firebase.auth().currentUser.getIdToken()

        //This is a really bad practice, however, Firebase auth doesn't privide a role-managment system,
        //So we have to build or own, here we're asking our backend is there's any role avaible for our logged user
        await Vue.axios({ url: "/api/getRoles", method: "GET", headers: { "Authorization": `Bearer ${token}` } })
        token = await firebase.auth().currentUser.getIdToken(true)

        commit("setToken", token)
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
      commit("setToken", null)
    }
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
