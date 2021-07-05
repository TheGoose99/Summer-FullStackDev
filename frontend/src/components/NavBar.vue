<template>
  <div>
      <v-navigation-drawer
        v-model="drawer"
        :color="color"
        :expand-on-hover="expandOnHover"
        :mini-variant="miniVariant"
        :right="right"
        :permanent="permanent"
        :src="bg"
        absolute
        dark
      >
        <v-list
          dense
          nav
          class="py-0"
        >
          <v-list-item two-line :class="miniVariant && 'px-0'">
            <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/men/81.jpg">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Welcome back,</v-list-item-title>
              <v-list-item-subtitle>{user}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <template v-for="(item, index) in items">
          <v-list-item
            v-if="item.icon"
            :key="item.title"
            link
            :to="item.path"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

            <v-divider
              v-else-if="item.divider"
              :key="index"
            ></v-divider>

            <v-subheader
              v-else-if="item.header"
              :key="item.header"
            >
              {{ item.header }}
            </v-subheader>
          </template>
        </v-list>
      </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      drawer: true,
      items: [
        { divider: true },
        { header: 'Future labels' },
        { title: 'Home', icon: 'mdi-home', path: '/' },
        { title: 'Login', icon: 'mdi-account', path: '/login' },
        { title: 'Register', icon: 'mdi-pencil', path: '/register' },
        { divider: true },
        { header: 'Actions' },
        { title: 'Logout', icon: 'mdi-logout', path: '/' }
      ],
      color: 'primary',
      colors: [
        'primary',
        'blue',
        'success',
        'red',
        'teal'
      ],
      permanent: true,
      miniVariant: true,
      expandOnHover: true
    }
  },
  computed: {
    bg () {
      return this.background ? 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg' : undefined
    }
  }
}
</script>
