import { Module, VuexModule, MutationAction, Action } from 'vuex-module-decorators'
import axios from 'axios'
import {Order, Product} from '@/types'
import store from '@/store'
import Config from "@/config";

@Module({ name: 'order', stateFactory: true, store })
export default class OrderModule extends VuexModule {

  current: Order = {
    id: '',
    email: '',
    name: '',
    phone: '',
    address: {
      street: '',
      city: '',
      postalCode: '',
    },
    products: [],
    total: 0,
    deliveryDate: '',
  }

  @MutationAction({ mutate: ['current']})
  async addOrder(newOrder: Order) {

    const orderFormatted = Object.assign({}, newOrder) as Record<string, any>
    orderFormatted.products = orderFormatted.products.reduce( (acc: string, product: Product) =>
      `${acc}${product.group} - ${product.name}:${product.quantity};`, '')
    const res = await axios.get(`${Config.SPREADSHEET_BASE_URL}action=addOrder&data=${JSON.stringify(orderFormatted)}`)
    console.log(res)
    return { current: Object.assign({}, newOrder) }
  }


}

