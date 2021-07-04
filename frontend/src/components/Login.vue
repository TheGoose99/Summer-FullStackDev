<template>
  <v-container fluid fill-height>
    <v-row justify="center">
      <v-col cols="12" :sm="6" :lg="3">
        <v-card class="elevation-12">
          <v-card-title class="justify-center"> Login </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="email"
                type="text"
                label="Email"
                :rules="[rules.required, rules.email]"
                :maxlength= "maxEmail"
                required>
              </v-text-field>
              <v-text-field
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                label="Parola"
                hint="Trebuie sa contina minim o litera mare, mica, cifra, caract special!"
                :rules="[rules.required, rules.password]"
                :maxlength= "maxPass"
                required>
              </v-text-field>
            </v-form>
            <v-alert type="error" v-model="alert" dismissible>
              {{ mesaj }}
            </v-alert>
          </v-card-text>
          <v-card-actions>
            <v-btn small text @click="forgotPassword" color="black">forgot password</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="register" color="error" text>register</v-btn>
            <v-btn @click="tryLogin" color="primary" text>log in</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Login',

  data: () => ({
    showPassword: false,
    mesaj: null,
    alert: false,
    email: null,
    password: null,
    valid: true,
    maxEmail: 30,
    maxPass: 25,
    rules: {
      email: value => {
        /* eslint-disable no-useless-escape */
        const re = new RegExp('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')
        return re.test(value) || 'Nu prea arata ca o adresa de email valida...'
      },
      password: value => {
        if (!value || !value.length) return true
        /* eslint-disable no-useless-escape */
        const re = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')
        return re.test(value) || 'Campul trebuie sa fie de minim 8 caractere lungime si sa contina: litere mici, litere mari, cifre si caractere speciale (!, @, #, $, %, ^, &)!'
      },
      required: v => !!v || 'Camp obligatoriu!'
    }
  }),

  methods: {
    register () {
      this.$router.push({ name: 'Register' })
    },
    tryLogin () {
      const valid = this.$refs.form.validate()

      if (valid) {
        const { email, password } = this // mdn object destructuring
        const payload = { email, password, strategy: 'local' }

        this.executeLogin(payload)

        // equivalent:
        // const email = this.email
        // const password = this.password
        // const payload = {
        //   email: email,
        //   password: password,
        //   strategy: 'local'
        // }
        // console.log(payload)
      }
    },
    async executeLogin (payload) {
      try {
        const response = await fetch('http://localhost:3030/authentication', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload) // body data type must match "Content-Type" header
        })
        this.snackbar = true
        if (!response.ok) {
          if (response.status === 401) {
            alert('Unauthorized - 401')
          } else if (response.status === 403) {
            alert('Bruh, it\'s the forbidden land')
          } else if (response.status === 404) {
            alert('Bruh, u fucked up')
          } else if (response.status === 429) {
            alert('Bruh, slow down')
          }
        } else {
          alert('You logged in')
          this.$store.commit('setAuthentication', true)
          this.$router.replace({ name: 'Main' })
        }
        this.$refs.form.reset()
      } catch (err) {
        alert('Something went wrong...')
      }
    },
    forgotPassword () {
      this.$router.push({ name: 'Forgot' })
    }
  },
  actions: {
    AutoLogin ({ commit }) {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      const userId = localStorage.getItem('userId')
      commit('authUser', {
        idToken: token,
        userId: userId
      })
    }
  }
}
</script>
