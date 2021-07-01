<template>
<div>
<v-app>
<v-container fluid fill-height>
    <v-row justify="center">
      <v-col cols="12" :sm="6" :lg="3">
          <v-card
            class="mx-auto"
            max-width="344"
            outlined >
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">Index Page</div>
                <v-list-item-title class="headline mb-1">Login or Register</v-list-item-title>
                <v-list-item-subtitle>That's sadsdas gonna be a good project.</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-card-actions>
              <v-spacer></v-spacer>
                <router-link to="/login" style="text-decoration: none; color: inherit;">
                  <v-btn text color="primary">Login</v-btn>
                </router-link>
                <router-link to="/register" style="text-decoration: none; color: inherit;">
                  <v-btn text color="error">Sign Up</v-btn>
                </router-link>
            </v-card-actions>
          </v-card>
      </v-col>
    </v-row>
  </v-container>
</v-app>
</div>

</template>

<script>
export default {
  name: 'Index',
  data: () => ({

  })
}
</script>
