import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import axios from 'axios'
import {Product, Unit} from '@/types'
import store from '@/store'
import Config from '@/config'

@Module({ name: 'products', stateFactory: true, store })
export default class ProductsModule extends VuexModule {

  products: Product[] = []
  productsLoaded = false

  @MutationAction({ mutate: ['products', 'productsLoaded']})
  async loadProduct() {

    const res = await axios.get(`${Config.SPREADSHEET_BASE_URL}action=read&table=Produits`)
    const products = res.data.data.map( (record: any) => {

      return {
        id: record.Id,
        name: record.Produit,
        label: record['Libellé'],
        unitPrice: parseFloat(record.Prix),
        unit: record['Unité'] as Unit
      } as Product
    })

    return { products, productsLoaded: true }

  }

}

