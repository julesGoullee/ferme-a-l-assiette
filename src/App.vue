<template>
  <UpdateApp>
    <b-container fluid id="app">
      <b-row class="p-0">
        <router-view/>
      </b-row>
    </b-container>
  </UpdateApp>
</template>
<script lang="ts">

  import UpdateApp from '@/components/updateApp.vue'

  export default {
    name: 'App',
    components: { UpdateApp }
  }

</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*overflow: hidden;*/
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
  }
}
</style>
