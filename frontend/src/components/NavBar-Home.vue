<template>
    <v-toolbar color="#009688" flat>
    <v-toolbar-title
    class="title">Welcome To My VueJS Test Project!</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-toolbar-items>

    <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
        <v-btn icon>
            <router-link to="/" style="text-decoration: none; color: inherit;">
                <v-icon
                color="white"
                dark
                v-bind="attrs"
                v-on="on"
                large
                md3 >
                mdi-home
                </v-icon>
            </router-link>
        </v-btn>
        </template>
        <span>Home</span>
    </v-tooltip>

    <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
        <v-btn icon>
            <router-link to="/login" style="text-decoration: none; color: inherit;">
                <v-icon
                color="white"
                dark
                v-bind="attrs"
                v-on="on"
                large >
                mdi-account
                </v-icon>
            </router-link>
        </v-btn>
        </template>
        <span>Login</span>
    </v-tooltip>

    <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
        <v-btn icon>
            <router-link to="/register" style="text-decoration: none; color: inherit;">
                <v-icon
                color="white"
                dark
                v-bind="attrs"
                v-on="on"
                large >
                mdi-pencil
            </v-icon>
            </router-link>
        </v-btn>
        </template>
        <span>Sign Up</span>
    </v-tooltip>

    </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    logout () {
      localStorage.removeItem('token')
      this.$router.replace({ name: 'Login' })
    }
  }
}
</script>

<style>
.title {
    color: whitesmoke;
}
</style>
