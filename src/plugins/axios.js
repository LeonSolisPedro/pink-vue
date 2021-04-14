import Vue from "vue"
import axios from "axios"
import VueAxios from "vue-axios"
import store from "../store"

axios.defaults.baseURL = "http://localhost:3000/"

if (store.state.token) {
  axios.defaults.headers.common = { "Authorization": `Bearer ${store.state.token}` }
}

Vue.use(VueAxios, axios)