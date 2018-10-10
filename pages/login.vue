<template>
  <v-layout>
    <v-flex text-xs-center>
      <v-card>
        <v-card-title class="headline">Login form</v-card-title>
        <v-form>
          <v-card-text>
            <v-text-field
              label="Email"
            />
            <v-text-field
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
            >Login</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  layout: 'clean'
}
</script>
