import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import OrderModule from '@/store/order'
import ProductsModule from '@/store/products'
import { initialiseStores } from '@/store/store-accessor'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)
const initializer = (store: Store<any>) => initialiseStores(store)

// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage
// })
export const plugins = [
  initializer,
  // vuexLocal.plugin
]

const store = new Vuex.Store({
  state: {},
  plugins,
  modules: {
    order: OrderModule,
    products: ProductsModule
  }
})
initializer(store)

export default store
export * from '@/store/store-accessor'
