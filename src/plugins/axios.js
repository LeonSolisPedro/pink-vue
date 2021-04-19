import Vue from "vue"
import axios from "axios"
import VueAxios from "vue-axios"
import store from "../store"
import router from "../router"

axios.defaults.baseURL = "http://localhost:3000"

if (store.state.isAuthenticated) {
  axios.defaults.headers.common = { "Authorization": `Bearer ${store.state.token}` }
}


axios.interceptors.response.use(response => response , async error => {
  if (store.state.isAuthenticated) {
    if(error.response.status === 401){
      const result = await store.dispatch("refreshToken")
      if(result){
        error.config.headers = { "Authorization": `Bearer ${store.state.token}` }
        return axios.request(error.config)
      } else {
        router.push("/login/")
      }
    }
  }
  return Promise.reject(error)
})


Vue.use(VueAxios, axios)