<template>
  <b-container class="order">
    <b-row align-h="center">
      <b-form @submit="onSubmit" style="padding: 0 10px">
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
            v-model="order.label"
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
        <b-container class="mb-2 mt-3">
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
                v-for="product in order.products"
                :key="product.id"
              >
                <b-container>
                  <b-row>
                    <b-col style="font-size: 13px;padding: 0" class="mb-1 mt-0">
                      {{product.name}}
                    </b-col>
                  </b-row>
                  <b-row align-v="center">
                    <b-col cols="3" style="padding:0">
                      <b-form-input
                        id="input-order-edit-product-quantity"
                        v-model="product.quantity"
                        type="number"
                        min="0.1"
                        step="any"
                        autocomplete="off"
                        size="sm"
                      ></b-form-input>
                    </b-col>
                    <b-col cols="7" class="" style="font-size: 12px;text-align: center; padding:0">
                      <div v-if="product.quantity !== undefined && product.quantity !== 0 && product.quantity !== ''">
                        {{product.unit}} x {{product.unitPrice.toFixed(2)}}€ = {{ (product.unitPrice * product.quantity).toFixed(2) }}€
                      </div>
                    </b-col>
                    <b-col cols="2">
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
        <b-container fluid class="mb-3 mt-3">
          <b-row align-v="center">
            <b-col cols="12" class="p-0">
              <b-dropdown
                :text="orderAddProduct.id === '' ? 'Sélectionner un produit ' : `${orderAddProduct.name} `"
                block
                no-flip
                dropup
                lazy
                class="mt-2 mb-2"
                size="sm"
                menu-class="select-product-drop-down-menu"
                boundary="#order-container"
              >
              <b-dropdown-item
                v-for="product in getProductsValues()"
                :key="product.id"
                @click="onSelectProduct(product)"
                size="sm"
                style="font-size: 12px;"
              >{{ product.label }}</b-dropdown-item>
              </b-dropdown>
            </b-col>
          </b-row>
          <b-row >
            <b-col cols="3" class="p-0">
              <b-form-group id="input-group-order-add-product-quantity" label-for="input-order-add-product-quantity" class="mb-0">
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
            <b-col cols="6" class="p-0 mb-0" style="font-size: 12px; text-align: center;align-self: center;" >
              <span v-if="orderAddProduct.id !== '' && orderAddProduct.quantity !== undefined && orderAddProduct.quantity !== 0 && orderAddProduct.quantity !== ''">
                {{orderAddProduct.unit}} x {{orderAddProduct.unitPrice.toFixed(2)}}€ = {{ (orderAddProduct.unitPrice * orderAddProduct.quantity).toFixed(2) }}€
              </span>
            </b-col>
            <b-col cols="3" class="p-0">
              <b-form-group
                id="input-group-add-product-button"
                label-for="input-add-product-button"
                class="mb-0"
              >
                <b-button
                  id="input-add-product-button"
                  type="button"
                  variant="outline-info"
                  v-on:click="addProduct"
                  :disabled="orderAddProduct.id === '' || (orderAddProduct.quantity === undefined || orderAddProduct.quantity === 0)"
                  squared
                  size="sm"
                  style="width: 100%;"
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
                  :key="product.id">
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
  import {Component, Vue} from 'vue-property-decorator';
  import {Order, Product, Unit} from '@/types';
  import {orderStore, productsStore} from '@/store'
  import moment from 'moment';
  import 'moment/locale/fr';

  @Component
  export default class OrderForm extends Vue {

    order: Order = orderStore.current
    showConfirmation = false
    deliveryMinDate = moment().toDate()
    deliveryMaxDate = moment().add(3, 'months').toDate()

    orderAddProduct: Product = {
      id: '',
      name: '',
      label: '',
      quantity: undefined,
      unitPrice: 0,
      unit: Unit.KG
    }

    productsLoaded = productsStore.productsLoaded

    mounted(){

      this.$nextTick(function () {

        if(!this.productsLoaded){

          productsStore.loadProduct()

        }

      })

    }

    public getProductsValues(): Product[] {

      return productsStore.products.reduce( (acc: Product[], product: Product) => {

          if(!this.order.products.find(productSelected => productSelected.id === product.id) ){

            acc.push(product)

          }

          return acc

        }, []) as Product[]
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

    public onSelectProduct(product: Product) {

      this.orderAddProduct = Object.assign({}, product, { quantity: this.orderAddProduct.quantity })

    }

    public addProduct (event: any): void {

      console.log(this.orderAddProduct);
      event.preventDefault()
      const product = productsStore.products.find( product => product.id === this.orderAddProduct.id)
      console.log(product);
      this.order.products.push(Object.assign({}, product, { quantity: this.orderAddProduct.quantity }) )
      this.orderAddProduct = {
        id: '',
        name: '',
        label: '',
        quantity: undefined,
        unitPrice: 0,
        unit: Unit.KG
      }

    }

    public removeProduct(removedProduct: Product): void {

      this.order.products = this.order.products.filter(product => product.id !== removedProduct.id)

    }

    public getTotal(): string {

      return this.order.products.reduce( (acc: number, product: Product) => acc + ( (product.quantity || 1) * product.unitPrice), 0).toFixed(2)

    }

  }
</script>

<style lang="scss">

  .order {
    width: 80%;
  }
  .card-header {
    padding: 0.35rem 0.7rem;
  }
  .select-product-drop-down-menu {
    height: 500px!important;
    width: 100%;
    overflow-y: scroll!important;
    overflow-x: hidden!important;
    li a {
      padding: 0.25rem 1rem;
    }
  }
</style>
