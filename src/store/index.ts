import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import OrderModule from '@/store/order'
import ProductsModule from '@/store/products'
import { initialiseStores } from '@/store/store-accessor'

Vue.use(Vuex)
const initializer = (store: Store<any>) => initialiseStores(store)
export const plugins = [initializer]

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
