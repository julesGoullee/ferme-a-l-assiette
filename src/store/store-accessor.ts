import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import OrderModule from '@/store/order'
import ProductsModule from '@/store/products'


let orderStore: OrderModule
let productsStore: ProductsModule

function initialiseStores(store: Store<any>): void {
  orderStore = getModule(OrderModule, store)
  productsStore = getModule(ProductsModule, store)
}

export { initialiseStores, orderStore, productsStore }
