<template>
  <b-container fluid id="app">
<!--    <b-row>-->
<!--      <b-col id="nav">-->
<!--        <router-link to="/">Home</router-link> |-->
<!--        <router-link to="/about">About</router-link>-->
<!--      </b-col>-->
<!--    </b-row>-->
    <b-row class="p-0"> <router-view/> </b-row>
  </b-container>
</template>

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
