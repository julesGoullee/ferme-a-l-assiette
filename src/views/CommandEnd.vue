<template>
  <b-container fluid>
    <b-row  align-v="center" style="margin: 10%">
      <b-col cols="12">
        <b-icon icon="check2-circle" color="green" font-scale="4" style="vertical-align: middle;"></b-icon>
        <h1 style="display: inline; font-size: 27px; margin-left: 15px; vertical-align: middle;">Commande {{this.orderUpdate() ? 'mise à jour' : 'confirmée'}}!</h1>
      </b-col>
    </b-row>
    <b-row align-h="center" align-v="center" style="margin: 10%">
      <b-col>Nous vous avons envoyé un récapitulatif par email
      </b-col>
    </b-row>
    <b-row align-h="center">
      <InstagramGallery />
    </b-row>
  </b-container>
</template>

<script lang="ts">

  import {Component, Vue} from 'vue-property-decorator'
  import InstagramGallery from '@/components/InstagramGallery.vue'
  import {orderStore} from '@/store'

  @Component({
    components: { InstagramGallery }
  })
  export default class CommandEnd extends Vue {

    public orderUpdate(): boolean {

      return orderStore.orderLoaded;

    }

  }

</script>
