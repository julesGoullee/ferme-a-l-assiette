<template>
  <b-container fluid class="order">
    <b-row align-h="center">
      <b-form @submit="onSubmit" style="padding: 0 10px; width: 100%">
        <b-form-group
          id="input-group-order-email"
          label="Email"
          style="font-size: 13px"
          label-for="input-order-email"
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

        <b-form-group
          id="input-group-order-name"
          label="Nom" label-for="input-order-name"
          style="font-size: 13px"
        >
          <b-form-input
            id="input-order-name"
            v-model="order.name"
            required
            placeholder="Jean Dupond"
            size="sm"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-order-phone"
          label="Téléphone"
          label-for="input-order-phone"
          style="font-size: 13px"
        >
          <b-form-input
            id="input-order-phone"
            v-model="order.phone"
            type="tel"
            required
            placeholder="0612345678"
            size="sm"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-order-address-street"
          label="Adresse"
          label-for="input-order-address-street"
          style="font-size: 13px"
        >
          <b-form-input
            id="input-order-address-street"
            v-model="order.address.street"
            required
            placeholder="Rue"
            size="sm"
          ></b-form-input>
        </b-form-group>
        <b-container fluid class="mb-2 mt-3">
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
            :header-html="`<div><span style='float:left'>Produits selectionnés</span><span style='float:right; font-weight: 500'>${getTotal()} €</span></div>`"
            v-if="order.products.length > 0"
            size="sm"
          >
            <b-list-group>
              <b-list-group-item
                v-for="product in order.products"
                :key="product.id"
              >
                <b-container fluid>
                  <b-row>
                    <b-col style="font-size: 13px;padding: 0" class="mb-1 mt-0">
                      {{product.group}} - {{product.name}}
                    </b-col>
                  </b-row>
                  <b-row align-v="center">
                    <b-col cols="3" style="padding:0">
                      <b-form-input
                        id="input-order-edit-product-quantity"
                        v-model="product.quantity"
                        type="number"
                        min="0.1"
                        :number=true
                        step="any"
                        autocomplete="off"
                        size="sm"
                      ></b-form-input>
                    </b-col>
                    <b-col cols="7" class="" style="font-size: 12px; text-align: center; padding:0">
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
          <b-form>
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
                  <b-dropdown-group v-for="productGroup in getProductGroups()" :header="productGroup" :key="productGroup">
                    <b-dropdown-item
                      v-for="product in getProductsValues(productGroup)"
                      :key="product.id"
                      @click="onSelectProduct(product)"
                      size="sm"
                      style="font-size: 12px;"
                    >{{ product.label }}</b-dropdown-item>
                  </b-dropdown-group>
                  <b-dropdown-divider></b-dropdown-divider>
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
            <b-row>
              <b-col cols="3" class="p-0">
                <b-form-group id="input-group-order-add-product-quantity" label-for="input-order-add-product-quantity" class="mb-0">
                  <b-form-input
                    id="input-order-select-product-quantity"
                    v-model="orderAddProduct.quantity"
                    type="number"
                    min="0"
                    max="1000"
                    value="0"
                    :number=true
                    step="any"
                    placeholder="1.2"
                    autocomplete="off"
                    size="sm"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="6" class="p-0 mb-0" style="font-size: 12px; text-align: center;align-self: center;">
                <div v-if="orderAddProduct.id !== '' && orderAddProduct.quantity && parseFloat(orderAddProduct.quantity.toString() ) > 0">
                  {{orderAddProduct.unit}} x {{orderAddProduct.unitPrice.toFixed(2)}}€ = {{ (orderAddProduct.unitPrice * orderAddProduct.quantity).toFixed(2) }}€
                </div>
              </b-col>
              <b-col cols="3" class="p-0">
                <b-form-group
                  id="input-group-add-product-button"
                  label-for="input-add-product-button"
                  class="mb-0"
                >
                  <b-button
                    id="input-add-product-button"
                    type="submit"
                    variant="outline-info"
                    v-on:click="addProduct"
                    :disabled="orderAddProduct.id === '' || (!orderAddProduct.quantity || parseFloat(orderAddProduct.quantity) <= 0)"
                    squared
                    size="sm"
                    style="width: 100%;"
                  >Ajouter</b-button>
                </b-form-group>
              </b-col>
            </b-row>
          </b-form>
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

        <b-form-group id="input-group-order-validate" label-for="input-order-validate">
          <b-button
            id="input-order-validate"
            type="submit"
            variant="primary"
            size="sm"
            style="width: 100%;"
            :disabled="!isValid()"
          >Valider</b-button>
        </b-form-group>

      </b-form>
      <b-modal
        id="modal-confirm"
        size="xl"
        title="Confirmation de commande"
        v-model="showConfirmation"
        scrollable
        @ok="confirmOrder"
      >
        <b-container style="font-size: 13px;">
          <b-row>
            <b-col cols="4" class="p-0" >Nom:</b-col>
            <b-col cols="8">{{order.name}}</b-col>
          </b-row>
          <b-row>
            <b-col cols="4" class="p-0">Email:</b-col>
            <b-col cols="8">{{order.email}}</b-col>
          </b-row>
          <b-row>
            <b-col cols="4" class="p-0">Rue:</b-col>
            <b-col cols="8">{{order.address.street}}</b-col>
          </b-row>
          <b-row>
            <b-col cols="4" class="p-0">Ville:</b-col>
            <b-col cols="8">{{order.address.city}}</b-col>
          </b-row>
          <b-row>
            <b-col cols="4" class="p-0">Code postal:</b-col>
            <b-col cols="8">{{order.address.postalCode}}</b-col>
          </b-row>
          <b-row>
            <b-col cols="4" class="p-0">Date de livraison</b-col>
            <b-col cols="8">{{formatDelivery(order.deliveryDate)}}</b-col>
          </b-row>
          <b-row>
            <b-table
              striped
              :items="order.products"
              :fields="modalFields"
              class="mt-3 confirm-products-table"
              small
            >
              <template v-slot:table-caption>
                <div style="text-align: center">Votre total est estimé a {{order.total.toFixed(2)}} €</div>
              </template>
            </b-table>
          </b-row>
        </b-container>
        <template v-slot:modal-footer="{ ok, cancel }">
          <div class="w-100">
            <b-button
              variant="danger"
              size="sm"
              class="float-left w-40"
              style="width: 40%"
              @click="cancel()"
            >
              Modifier
            </b-button>
            <b-button
              variant="primary"
              size="sm"
              class="float-right"
              style="width: 40%"
              @click="ok()"
            >
              Valider
            </b-button>
          </div>
        </template>
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

    modalFields = [
      {
        key: 'name',
        label: 'Produit',
        formatter: (value: any, key: any, item: Product) => {
          return `${item.group} - ${item.name}`
        }
      },
      {
        key: 'quantity',
        label: 'Quantité',
        formatter: (value: any, key: any, item: Product) => {
          return `${item.quantity} ${item.unit}`
        }
      },
      {
        key: 'unitPrice',
        label: 'Prix',
        formatter: (value: any, key: any, item: Product) => {
          return `${value.toFixed(2)} €`
        }
      }
    ]

    mounted(){

      this.$nextTick(function () {

        if(!this.productsLoaded){

          productsStore.loadProduct()

        }

      })

    }

    public isValid(): boolean {

      return this.order.products.length > 0 &&
        this.order.deliveryDate !== '' &&
        this.order.email !== '' &&
        this.order.name !== '' &&
        this.order.phone !== '' &&
        this.order.address.city !== '' &&
        this.order.address.street !== '' &&
        this.order.address.postalCode !== '';

    }

    public getProductGroups() {

      return productsStore.productGroups

    }

    public getProductsValues(group?: string) {

      return productsStore.products.reduce( (acc: Product[], product: Product) => {

        if( (group === product.group || !group && product.group === '') &&
          !this.order.products.find(productSelected => productSelected.id === product.id) ){

          acc.push(product)

        }

        return acc

      }, []) as Product[]
    }

    public onSubmit (event: any): void {

      event.preventDefault()
      this.order.total = this.order.products.reduce( (acc: number, product: Product) => acc + ( (product.quantity || 1) * product.unitPrice), 0)
      this.showConfirmation = true

    }

    public confirmOrder(event: any): void {

      event.preventDefault()
      this.showConfirmation = false
      orderStore.addOrder(this.order).then( () => {
        this.$router.push('/commandeTermine')
      })

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

      event.preventDefault()
      const product = productsStore.products.find( product => product.id === this.orderAddProduct.id)
      const quantity = this.orderAddProduct.quantity ? parseFloat(this.orderAddProduct.quantity.toString() ) : 0;

      this.order.products.push(Object.assign({}, product, { quantity }) )
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
  .confirm-products-table {
    tr {
      td:nth-child(2) {
        white-space: nowrap;
      }
      td:nth-child(3) {
        white-space: nowrap;
      }
    }
  }

</style>
