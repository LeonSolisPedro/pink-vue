import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "./assets/css/global.css"
import "./plugins"


Vue.config.productionTip = false


const app = new Vue({
  router,
  store,
  render: h => h(App)
})


//Firebase Auth
import firebase from "firebase/app"
import "firebase/auth"
let mounted = false
firebase.auth().onAuthStateChanged(user => {
  store.commit("setUserInfo", user)
  if(mounted === false){
    app.$mount('#app')
    mounted = true
  }
})