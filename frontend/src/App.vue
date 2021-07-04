<template>
  <v-app id='app'>
    <div class="mx-0 d-flex flex">
    <v-main>
      <router-view name="sidebar"/>
      <router-view name="topbar"/>
      <router-view />
    </v-main>
    </div>

  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data: () => ({
    //
  })
}
</script>
