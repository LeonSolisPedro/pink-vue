import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "./assets/css/global.css"
import "./plugins"


Vue.config.productionTip = false


//Firebase Auth
import firebase from "firebase/app"
import "firebase/auth"
let mounted = false
firebase.auth().onAuthStateChanged(user => {
  store.commit("setUserInfo", user)
  if (mounted === false) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
    mounted = true
  }
})