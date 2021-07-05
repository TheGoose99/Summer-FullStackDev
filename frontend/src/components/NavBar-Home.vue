<template>
    <v-toolbar fixed color="teal lighten-1" dark >
        <v-toolbar-title class="title">Welcome To My VueJS Test Project!</v-toolbar-title>
        <v-divider></v-divider>

    <v-tooltip
            bottom
            v-for="item in items"
            :key="item.title"
            >
        <template v-slot:activator="{ on, attrs }">
        <v-btn icon>
            <router-link :to="{ path:item.path }" style="text-decoration: none; color: inherit;">
            <v-list-item-icon>
                <v-icon
                dark
                v-bind="attrs"
                v-on="on"
                large
                md3 >
                {{ item.icon }}
                </v-icon>
            </v-list-item-icon>
            </router-link>
        </v-btn>
        </template>
        <span>{{item.title}}</span>
    </v-tooltip>

    </v-toolbar>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      items: [
        { title: 'Home', icon: 'mdi-home', path: '/' },
        { title: 'Login', icon: 'mdi-account', path: '/login' },
        { title: 'Register', icon: 'mdi-pencil', path: '/register' }
      ],
      color: 'primary'
    }
  }
}
</script>
