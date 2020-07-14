<template>
  <b-container>
    <b-overlay :show="show" rounded="sm" opacity="0.7">
      <slot></slot>
      <template v-slot:overlay>
        <div class="text-center">
          <p>Nouvelle version disponible</p>
          <b-button
            variant="info"
            size="sm"
            @click="refreshApp"
          >
            Actualiser
          </b-button>
        </div>
      </template>
    </b-overlay>
  </b-container>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class UpdateApp extends Vue {

    registration: any = null
    show = true

    created () {

      document.addEventListener('swUpdated', (e: any) => {

        console.log('swUpdated', e)
        this.show = true
        this.registration = e.detail

      }, { once: true });

      navigator.serviceWorker.addEventListener('controllerchange', () => {

        console.log('controllerchange')
        window.location.reload();

      });

    }

    refreshApp () {

      console.log('refreshApp')
      if(this.registration && this.registration.waiting){

        this.registration.waiting.postMessage('skipWaiting');

      }

    }

  }

</script>
