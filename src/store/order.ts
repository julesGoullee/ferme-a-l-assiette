import {Module, VuexModule, MutationAction, Mutation, Action} from 'vuex-module-decorators'
import axios from 'axios'
import {Address, Order, Product} from '@/types'
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

  orderLoaded = false
  orderProductsLoaded = false
  rawProducts = ''

  @MutationAction({ mutate: ['current']})
  async addOrder(newOrder: Order) {

    const res = await axios.get(`${Config.SPREADSHEET_BASE_URL}action=addOrder&data=${JSON.stringify(newOrder)}`)
    newOrder.id = res.data.data.Id
    return { current: Object.assign({}, newOrder)}
  }

  @MutationAction({ mutate: ['current']})
  async updateOrder(newOrder: Order) {

    const res = await axios.get(`${Config.SPREADSHEET_BASE_URL}action=updateOrder&data=${JSON.stringify(newOrder)}&id=${newOrder.id}`)
    newOrder.id = res.data.data.Id
    return { current: Object.assign({}, newOrder)}

  }


  @MutationAction({ mutate: ['current', 'rawProducts', 'orderLoaded']})
  async fetchOrder(orderId: string) {

    const res = await axios.get(`${Config.SPREADSHEET_BASE_URL}action=getOrder&id=${orderId}`)
    const address: Address = {
      street:  res.data.data.Rue,
      city:  res.data.data.Ville,
      postalCode: res.data.data['Code postal'],
    }

    const order: Order = {
      id: res.data.data.Id,
      email: res.data.data['E-mail'],
      name: res.data.data.Nom,
      phone: res.data.data.Telephone,
      total: 0,
      address: address,
      deliveryDate: res.data.data['Date de livraison'],
      products: []
    }

    return { current: order, rawProducts:  res.data.data.Produits, orderLoaded: true  }

  }

  @Mutation
  updateOrderProducts(products: Product[]) {
    this.current.products = products
    this.orderProductsLoaded = true
  }

  @Action
  async loadOrderProducts() {

    const products: Product[] = this.rawProducts.split(';')
      .filter( (partial: string) => partial !== '')
      .map( (partialProduct: string) => {

        const [rawLabel, quantity] = partialProduct.split(':')
        const product = this.context.rootState.products.products.find( (product: Product) => `${product.group ? `${product.group} - ` : ''}${product.name}` === rawLabel)

        console.log(partialProduct)
        console.log(product)
        if(product){

          product.quantity = parseFloat(quantity)

        }

        return product

      })

    this.context.commit('updateOrderProducts', products)

  }

}

