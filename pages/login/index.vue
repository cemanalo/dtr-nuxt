<template>
  <v-layout>
    <v-flex text-xs-center>
      <v-card>
        <v-card-title class="headline">DTR</v-card-title>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="primary"
            flat
            nuxt
            @click="login"
          >Login</v-btn>
        </v-card-actions>
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

  methods: {
    login() {
      window.location.replace(process.env.LOGIN_URL)
    }
  }
}
</script>
