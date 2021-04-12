import axios from "axios"
import store from "../store"

axios.defaults.baseURL = "https://pink-5ac5a.ue.r.appspot.com/"

if(store.state.token) {
  axios.defaults.headers.common = { "Authorization": `Bearer ${store.state.token}` }
}