import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import axios from 'axios'
import {Product, Unit} from '@/types'
import store from '@/store'
import Config from '@/config'

@Module({ name: 'products', stateFactory: true, store })
export default class ProductsModule extends VuexModule {

  products: Product[] = []
  productGroups: string[] = []
  productsLoaded = false

  @MutationAction({ mutate: ['products', 'productGroups', 'productsLoaded']})
  async loadProduct() {

    const res = await axios.get(`${Config.SPREADSHEET_BASE_URL}action=getProducts`)

    const groups = new Set();

    const products = res.data.data.map( (record: any) => {

      if(record.Groupe){

        groups.add(record.Groupe);

      }

      return {
        id: record.Id,
        name: record.Nom,
        group: record.Groupe,
        label: `${record.Nom} (${parseFloat(record.Prix).toFixed(2)}€/${record['Unité']})`,
        unitPrice: parseFloat(record.Prix),
        unit: record['Unité'] as Unit
      } as Product
    })

    return { products, productGroups: Array.from(groups), productsLoaded: true }

  }

}

