import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import Login from "../views/Login.vue"
import EmptyBlock from "../components/EmptyBlock.vue"

Vue.use(VueRouter)

const routes = [
  { path: "", component: Home },
  { path: "/aboutus/", component: EmptyBlock },
  { path: "/services/", component: EmptyBlock },
  { path: "/contact/", component: EmptyBlock },
  { path: "/login/", component: Login }
]

const router = new VueRouter({
  routes
})

export default router
