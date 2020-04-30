import Vue from "vue"
import VueRouter from "vue-router"

import Home from "@/views/Home.vue"
import DeckList from "@/views/DeckList.vue"
import DeckEdit from "@/views/DeckEdit.vue"

Vue.use(VueRouter)

  const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/decks",
    name: "DeckList",
    component: DeckList
  },
  {
    path: "/decks/:id",
    name: "DeckEdit",
    component: DeckEdit
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
