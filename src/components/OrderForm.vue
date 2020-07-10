<template>
  <b-container class="order align-content-center">
    <b-row align-h="center">
      <b-form @submit="onSubmit" >
        <b-form-group
          id="input-group-order-email"
          label="Email"
          label-for="input-order-email"
          description="Nous ne partagerons jamais votre e-mail avec quelqu'un d'autre."
        >
          <b-form-input
            id="input-order-email"
            v-model="order.email"
            type="email"
            required
            placeholder="jean.dupond@gmail.com"
            size="sm"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-order-name" label="Nom" label-for="input-order-name">
          <b-form-input
            id="input-order-name"
            v-model="order.name"
            required
            placeholder="Jean Dupond"
            size="sm"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-order-phone" label="Téléphone" label-for="input-order-phone">
          <b-form-input
            id="input-order-phone"
            v-model="order.phone"
            type="tel"
            required
            placeholder="0612345678"
            size="sm"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-order-address-street" label="Adresse" label-for="input-order-address-street">
          <b-form-input
            id="input-order-address-street"
            v-model="order.address.street"
            required
            placeholder="Rue"
            size="sm"
          ></b-form-input>
        </b-form-group>
        <b-container>
          <b-row>
            <b-col cols="8" style="padding-left: 0">
              <b-form-group id="input-group-order-address-city" lable="Ville" label-for="input-order-address-city">
                <b-form-input
                  id="input-order-address-city"
                  v-model="order.address.city"
                  required
                  placeholder="Ville"
                  size="sm"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="4" style="padding: 0">
              <b-form-group id="input-group-order-address-postal-code" label-for="input-order-address-postal-code">
                <b-form-input
                  id="input-order-address-postal-code"
                  v-model="order.address.postalCode"
                  required
                  placeholder="Code postal"
                  size="sm"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </b-container>

        <b-form-group id="input-group-order-edit-product-select" label-for="input-order-edit-product-quantity">
          <b-card
            header="Produits selectionnés:"
            v-if="order.products.length > 0"
            size="sm"
          >
            <b-list-group>
              <b-list-group-item
                v-for="product in this.order.products"
                :key="product.name"
              >
                <b-container>
                  <b-row>
                    <b-col style="font-size: 13px;padding: 0" class="mb-1 mt-0">
                      {{product.name}}
                    </b-col>
                  </b-row>
                  <b-row align-v="center">
                    <b-col cols="8" style="padding: 0">
                      <b-form-input
                        id="input-order-edit-product-quantity"
                        v-model="product.quantity"
                        type="number"
                        min="0"
                        value="0"
                        step="any"
                        autocomplete="off"
                        size="sm"
                      ></b-form-input>
                    </b-col>
                    <b-col cols="4">
                      <b-icon-x-circle
                        v-on:click="removeProduct(product)"
                        variant="danger"
                      ></b-icon-x-circle>
                    </b-col>
                  </b-row>
                </b-container>
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-form-group>
        <b-container style="padding: 1px">
          <b-row>
            <b-col>
              <b-form-group id="input-group-order-add-product-select" label="Sélectionner un produit" label-for="input-order-add-product-select">
                <b-form-select
                  id="input-order-add-product-select-product"
                  v-model="orderAddProduct.name"
                  :options="getProductsValues()"
                  placeholder="Sélectionne un produit"
                  size="sm"
                ></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="8">
              <b-form-group id="input-group-order-add-product-quantity" label-for="input-order-add-product-quantity">
                <b-form-input
                  id="input-order-select-product-quantity"
                  v-model="orderAddProduct.quantity"
                  type="number"
                  min="0"
                  value="0"
                  step="any"
                  placeholder="1.2"
                  autocomplete="off"
                  size="sm"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="4">
              <b-form-group
                id="input-group-add-product-button"
                label-for="input-add-product-button"
              >
                <b-button
                  id="input-add-product-button"
                  type="button"
                  variant="outline-info"
                  v-on:click="addProduct"
                  :disabled="orderAddProduct.name === null || (orderAddProduct.quantity === null || orderAddProduct.quantity === '0' || orderAddProduct.quantity === '')"
                  squared
                  size="sm"
                >Ajouter</b-button>
              </b-form-group>
            </b-col>
          </b-row>
        </b-container>

        <b-form-group id="input-group-order-delivery-date" label-for="input-order-delivery-date">
          <b-form-datepicker
            id="input-order-delivery-date"
            v-model="order.deliveryDate"
            locale="fr-FR"
            label-no-date-selected="Pas de date selectionnée"
            start-weekday="1"
            required
            placeholder="Selectionnez la date de livraison"
            :min="deliveryMinDate"
            :max="deliveryMaxDate"
            :date-disabled-fn="dateDisabled"
            size="sm"
          ></b-form-datepicker>
        </b-form-group>

        total: {{getTotal()}}
        <b-form-group id="input-group-order-validate" label-for="input-order-validate">
          <b-button
            id="input-order-validate"
            type="submit"
            variant="primary"
            size="sm"
            style="width: 100%;"
          >Valider</b-button>
        </b-form-group>

      </b-form>
      <b-modal
        id="modal-confirm"
        size="xl"
        title="Confirmation de commande"
        v-model="showConfirmation"
      >
        <b-container >
          <b-row>
            <b-col>Nom:</b-col>
            <b-col>{{order.name}}</b-col>
          </b-row>
          <b-row>
            <b-col>Email:</b-col>
            <b-col>{{order.email}}</b-col>
          </b-row>
          <b-row>
            <b-col>Rue:</b-col>
            <b-col>{{order.address.street}}</b-col>
          </b-row>
          <b-row>
            <b-col>Ville:</b-col>
            <b-col>{{order.address.city}}</b-col>
          </b-row>
          <b-row>
            <b-col>Code postal:</b-col>
            <b-col>{{order.address.postalCode}}</b-col>
          </b-row>
          <b-row>
            <b-col>Date de livraison</b-col>
            <b-col>{{formatDelivery(order.deliveryDate)}}</b-col>
          </b-row>
          <b-row>
            <b-col>Produits:</b-col>
            <b-col>
              <b-list-group>
                <b-list-group-item
                  v-for="product of order.products"
                  :key="product.name">
                  {{product.name}} - {{product.quantity}}
                </b-list-group-item>
              </b-list-group>
            </b-col>
          </b-row>
        </b-container>
      </b-modal>
    </b-row>
  </b-container>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import {Order, Product, ProductValues} from '@/types';
  import { orderStore, productsStore } from '@/store'
  import moment from 'moment';
  import 'moment/locale/fr';

  interface OrderAddProduct {
    name: any;
    quantity: any;
  }

  @Component
  export default class OrderForm extends Vue {

    order: Order = orderStore.current
    showConfirmation = false
    deliveryMinDate = moment().toDate()
    deliveryMaxDate = moment().add(3, 'months').toDate()

    orderAddProduct: OrderAddProduct = {
      name: null,
      quantity: null
    }

    productsLoaded = productsStore.productsLoaded

    mounted(){

      this.$nextTick(function () {

        if(!this.productsLoaded){

          productsStore.loadProduct()

        }

      })

    }

    public getProductsValues(): ProductValues[] {

      return [{ value: null, text: 'Cliquer pour choisir un produit', disabled: true } as ProductValues]
        .concat(productsStore.products.reduce( (acc: ProductValues[], product: Product) => {

          if(!this.order.products.find(productSelected => productSelected.name === product.name) ){

            acc.push({ value: product.name, text: product.name })

          }
          return acc

        }, []) as ProductValues[])
    }

    public onSubmit (event: any): void {
      event.preventDefault()

      console.info(this.order)
      orderStore.addOrder(this.order)
      this.showConfirmation = true

    }

    public dateDisabled (ymd: any, date: Date): boolean {
      const weekday = date.getDay();
      return !([4, 5].includes(weekday) && date.getTime() > Date.now() )
    }

    public formatDelivery(deliveryDate: string): string {
      return moment(deliveryDate).format('dddd Do MMMM YYYY')
    }
    public addProduct (event: any): void {

      console.log(this.orderAddProduct);
      event.preventDefault()
      const product = productsStore.products.find( product => product.name === this.orderAddProduct.name)
      console.log(product);
      this.order.products.push(Object.assign({}, product, { quantity: parseFloat(this.orderAddProduct.quantity) }) )
      this.orderAddProduct = {
        name: null,
        quantity: null
      }

    }

    public removeProduct(removedProduct: Product): void {

      this.order.products = this.order.products.filter(product => product.name !== removedProduct.name)

    }

    public getTotal(): string {

      return this.order.products.reduce( (acc: number, product: Product) => acc + ( (product.quantity || 1) * product.unitPrice), 0).toFixed(2)

    }

  }
</script>

<style scoped lang="scss">

  .order {
    width: 80%;
  }
  .card-header {
    padding: 0.35rem 0.7rem;
  }
</style>
