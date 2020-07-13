import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import CommandEnd from '../views/CommandEnd.vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import '@/assets/main.scss'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/commandeTermine',
    name: 'CommandEnd',
    component: CommandEnd
  }
]

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

const router = new VueRouter({
  routes
})

export default router
