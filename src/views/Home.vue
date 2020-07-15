<template>
  <b-container fluid class="home">
    <b-row align-h="center" class="mb-2">
      <b-col cols="12" class="text-center mt-3">
        <b-img-lazy
          src="/img/logo.png"
          alt="logo"
          height="100"
        ></b-img-lazy>
      </b-col>
    </b-row>
    <b-row align-h="center">
      <b-col class="intro mt-2 mb-4 text-justify">
        Bonjour à tous,
        <br/>
        <br/>
        Dans le contexte actuel, les marchés étant suspendus, nous vous offrons un service de livraison à domicile.
        Soucieux de la qualité de nos produits, nous vous garantissons l'origine "Producteurs Locaux".
        <br>
        Nos produits sont vendus au kilo ou à la pièce, le prix varie selon le poids de l’animal.
        Le total de votre commande vous sera donné lors de votre livraison par un ticket, une fois la commande pesée.
        <br>
        Vous pouvez passer vos commandes 24 heures avant la livraison, depuis ce bon de commande.
        Pour les secteurs de Blanquefort et Bruges, les livraisons se feront entre 12h et 14h.
        Pour le secteur de Mérignac, Caudéran et Bordeaux entre 14h30 et 15h30.
        Pour le secteur de Bègles, après 16h.
        Le paiement s’effectue à la livraison par carte bancaire, espèce ou chèque.
        <br/>
        <br/>
        Bonne humeur, la livraison est offerte.
        <br/>

      </b-col>
    </b-row>
    <b-row id="order-container" align-h="center" style="max-width: 700px; margin: auto"> <Order /> </b-row>
  </b-container>
</template>

<script lang="ts">

  import Order from '@/components/OrderForm.vue'

  export default {
    name: 'Home',
    components: { Order }
  }

</script>
<style lang="scss">
  .intro {
    font-size: 13px;
    /*padding: 0 25px!important;*/
  }
</style>
