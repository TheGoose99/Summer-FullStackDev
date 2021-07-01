<template>
    <v-container fluid fill-height >
      <v-row justify="center">
      <v-col cols="12" :sm="8" :lg="3">
        <v-card class="elevation-12">
          <v-card-title class="justify-center"> Register </v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid">
                <v-text-field
                v-model="email"
                type="text"
                label="Email"
                hint="email, duh!"
                :rules="[rules.required, rules.email]"
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
                required>
              </v-text-field>
                <v-text-field
                v-model="password2"
                v-validate="'confirmed:password'"
                :type="showPassword ? 'text' : 'password'"
                label="ParolaConfirm"
                hint="Parolele trebuie sa coincida"
                :rules="[ (password === password2) || 'Parolele nu coincid']"
                required>
              </v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="login" color="error" text>Back to Login</v-btn>
            <v-btn @click="tryRegister" color="primary" text>sign up</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      </v-row>
    </v-container>
</template>

<script>
// import Login from '@/components/Login'
// import Index from '@/components/Index'
export default {
  name: 'register',
  /*  components: {
    Login, Index
  },
<v-btn @click="show = 'login'">Login</v-btn>
<v-btn @click="show = 'index'">Index</v-btn>

<login v-if="show === 'login'"/>
<index v-if="show === 'index'" />
*/
  data: () => ({
    password: null,
    password2: null,
    showPassword: false,
    show: null,
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
    login () {
      this.$router.push({ name: 'Login' })
    },
    tryRegister () {
      const valid = this.$refs.form.validate()

      if (valid) {
        const { email, password } = this
        const payload = { email, password }

        this.executeRegister(payload)
      }
    },

    async executeRegister (payload) {
      try {
        const response = await fetch('http://localhost:3030/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        })
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
          alert('All went according to plan!')
        }
      } catch (err) {
        alert('Eroare la inregistrare, bruh')
        console.error(err)
      }
    }
  }
}
</script>
