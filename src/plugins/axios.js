import Vue from "vue"
import axios from "axios"
import VueAxios from "vue-axios"
import store from "../store"

axios.defaults.baseURL = "https://pink-5ac5a.ue.r.appspot.com/"

if (store.state.token) {
  axios.defaults.headers.common = { "Authorization": `Bearer ${store.state.token}` }
}

Vue.use(VueAxios, axios)