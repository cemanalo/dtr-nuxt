<template>
  <v-layout>
    <v-flex text-xs-center>
      <v-card>
        <v-card-title class="headline">Login form</v-card-title>
        <v-form>
          <v-card-text>
            <v-text-field
              v-model="formEmail"
              label="Email"
            />
            <v-text-field
              v-model="formPassword"
              label="Password"
              type="password"
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
      formPassword: ''
    }
  },

  methods: {
    async login() {
      await this.$store.dispatch('login', {
        email: this.formEmail,
        password: this.formPassword
      })
    }
  }
}
</script>
