import { Module, VuexModule, MutationAction, Action } from 'vuex-module-decorators'
import {Order} from '@/types'
import store from '@/store'

@Module({ name: 'order', stateFactory: true, store })
export default class OrderModule extends VuexModule {

  current: Order = {
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
    // const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos')
    // return ({ todos: data })
    return { current: Object.assign({}, newOrder) }
  }


}

