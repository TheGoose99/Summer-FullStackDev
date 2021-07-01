<template>
  <v-app>
    <v-app-bar flat color="#009688" app fill-height>
      <Nav />
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>

  </v-app>
</template>

<script>
import Nav from './components/NavBar_HomePage.vue'
export default {
  name: 'App',
  components: {
    Nav
  },
  data: () => ({
    //
  })
}
</script>

<style>
#app {
  background: url('../Img/Bg.jpg')
    no-repeat center center fixed !important;
  background-size: cover;
}
</style>
