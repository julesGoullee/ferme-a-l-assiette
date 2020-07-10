import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import {Product} from '@/types'
import store from '@/store'

@Module({ name: 'products', stateFactory: true, store })
export default class ProductsModule extends VuexModule {

  products: Product[] = []
  productsLoaded = false

  @MutationAction({ mutate: ['products', 'productsLoaded']})
  async loadProduct() {
    const productsLoaded: Product[] = [
      {
        name: 'Andouillette AAAAA (25.00€/kg)',
        unitPrice: 25,
      },
      {
        name: 'Blanc de Poulet (18.50€/kg)',
        unitPrice: 18.5,
      },
      {
        name: 'Boudin Noir (13.80€/kg)',
        unitPrice: 25,
      },
    ]

    return { products: productsLoaded, productsLoaded: true }

  }

}

