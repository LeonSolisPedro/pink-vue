import Vue from "vue"
import VueRouter from "vue-router"
import firebase from "firebase/app"
import "firebase/auth"
const Home = () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
import Login from "../views/Login.vue"
import EmptyBlock from "../components/EmptyBlock.vue"
import Register from "../views/Register.vue"
const Dashboard = () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue')


Vue.use(VueRouter)

const routes = [
  {
    path: "",
    component: Home
  },
  {
    path: "/aboutus/",
    component: EmptyBlock
  },
  {
    path: "/services/",
    component: EmptyBlock
  },
  {
    path: "/contact/",
    component: EmptyBlock
  },
  {
    path: "/login/",
    component: Login
  },
  {
    path: "/register/",
    component: Register
  },
  {
    path: "/dashboard/",
    component: Dashboard,
    beforeEnter: async (to, from, next) => {
      const tokenResult = await firebase.auth().currentUser?.getIdTokenResult()
      if(tokenResult?.claims?.role !== "admin") next("/")
      else next()
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
