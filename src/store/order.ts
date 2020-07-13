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

    console.info(JSON.stringify(newOrder))
    const res = await axios.get(`${Config.SPREADSHEET_BASE_URL}action=addOrder&data=${JSON.stringify(newOrder)}`)
    console.log(res)
    return { current: Object.assign({}, newOrder) }
  }


}

