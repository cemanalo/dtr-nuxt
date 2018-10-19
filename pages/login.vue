<template>
  <v-layout>
    <v-flex text-xs-center>
      <v-card>
        <v-card-title class="headline">Login form</v-card-title>
        <v-form 
          ref="form" 
          v-model="valid"
        >
          <v-card-text>
            <v-alert
              v-model="alert"
              dismissible
              color="error"
              icon="warning"
              outline
            >
              {{ alertMessage }}
            </v-alert>
            <v-text-field
              :rules="emailRules"
              v-model="formEmail"
              label="Email"
              required
            />
            <v-text-field
              :rules="passwordRules"
              v-model="formPassword"
              label="Password"
              type="password"
              required
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn
              color="primary"
              flat
              nuxt
              @click="login"
            >Login</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  layout: 'clean',

  fetch({ store, redirect }) {
    if (store.state.authUser) {
      return redirect('/')
    }
  },

  data() {
    return {
      formError: null,
      formEmail: '',
      formPassword: '',
      alert: false,
      alertMessage: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [v => !!v || 'Password is required']
    }
  },

  methods: {
    async login() {
      if (this.$refs.form.validate()) {
        await this.$store
          .dispatch('login', {
            email: this.formEmail,
            password: this.formPassword
          })
          .catch(err => {
            console.log('errrrr')
            console.log(err.message)
            this.alert = err.message
            this.alertMessage = err.message
          })
      }
    }
  }
}
</script>
