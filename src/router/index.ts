import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import CommandEnd from '../views/CommandEnd.vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import '@/assets/main.scss'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/nouvelleCommande',
    name: 'NewOrder',
    component: Home
  },
  {
    path: '/commande/:id',
    name: 'OrderId',
    component: Home
  },
  {
    path: '/commandeTermine',
    name: 'CommandEnd',
    component: CommandEnd
  },
  {
    path: '*',
    name: 'All',
    component: Home
  },
]

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

const router = new VueRouter({
  routes,
  scrollBehavior(){
    return { x: 0, y: 0 }
  },
  mode: 'history'
})

export default router
