<template>
  <v-container fluid fill-height>
    <v-row justify="center">
      <v-col cols="12" :sm="6" :lg="3">
        <v-card class="elevation-12">
          <v-card-title class="justify-center"> Schimba Parola </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="email"
                type="text"
                label="Email valid"
                hint="email, duh!"
                :rules="[rules.required, rules.email]"
                required>
              </v-text-field>
              <v-text-field
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                label="Noua Parola"
                hint="Trebuie sa contina minim o litera mare, mica, cifra, caract special!"
                :rules="[rules.required, rules.password]"
                required>
              </v-text-field>
              <v-text-field
                v-model="password2"
                :type="showPassword ? 'text' : 'password'"
                label="Noua Parola Confirm"
                hint=" Noua ta parola trebuie sa contina minim 8 caractere si sa includa o litera mare, mica, cifra, caract special"
                :rules="[ (password === password2) || 'Parolele nu coincid']"
                required>
                </v-text-field>
            </v-form>
            <v-alert type="error" v-model="alert" dismissible>
              {{ mesaj }}
            </v-alert>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="login" color="error" text>Back To Login</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="tryChange" color="primary" text>Change Password</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Forgot',

  data: () => ({
    password: null,
    password2: null,
    showPassword: false,
    mesaj: null,
    alert: false,
    email: null,
    valid: true,
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
    tryChange () {
      const valid = this.$refs.form.validate()

      if (valid) {
        const { password } = this
        const payload = { password }

        this.executeChange(payload)
      }
    },

    async executeChange (payload) {
      try {
        const response = await fetch('http://localhost:3030/users', {
          method: 'PATCH',
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
        alert('Eroare la schimbarea parolei, bruh')
        console.error(err)
      }
    }
  }
}
</script>
