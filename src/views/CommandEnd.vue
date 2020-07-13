<template>
  <b-container fluid>
    <b-row  align-v="center" style="margin: 10%">
      <b-col cols="12">
        <b-icon icon="check2-circle" color="green" font-scale="4" style="vertical-align: middle;"></b-icon>
        <h1 style="display: inline; font-size: 30px; margin-left: 15px; vertical-align: middle;">Commande confirmée!</h1>
      </b-col>
    </b-row>
    <b-row align-h="center" align-v="center" style="margin: 10%">
      <b-col>Nous vous avons envoyé un récapitulatif par email
      </b-col>
    </b-row>
    <b-row align-h="center" align-v="center">
      <InstagramGallery />
    </b-row>
  </b-container>
</template>

<script lang="ts">

  import InstagramGallery from '@/components/InstagramGallery.vue'

  export default {
    name: 'CommandEnd',
    components: { InstagramGallery }
  }

</script>
