<template>
  <v-layout
    row
    justify-center
    wrap 
    fluid>

    <v-flex xs10>
      <h2>Add New Employee</h2>
    </v-flex>
    <v-flex xs10>
      <v-alert
        v-model="alert"
        dismissible
        type="error"
      >
        {{ alertMsg }}
      </v-alert>
      <v-form 
        ref="form" 
        v-model="valid" 
        lazy-validation>
      
        <v-text-field
          v-model="form.firstName"
          :rules="validators.fnameRules"
          label="First name *"
          required
        />
        <v-text-field
          v-model="form.lastName"
          :rules="validators.lnameRules"
          label="Last name *"
          required
        />
        <v-text-field
          v-model="form.username"
          :rules="validators.usernameRules"
          label="Username *"
          required
        />
        <v-text-field
          v-model="form.workdayId"
          :rules="validators.workdayIdRules"
          label="Workday Id *"
          required
        />
        <nuxt-link to="/employees">
          <v-btn>Cancel</v-btn>
        </nuxt-link>
        <v-btn
          :disabled="!valid"
          @click="submit"
        >
          submit
        </v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>
<script>
import { required, lowerCaseLetters, numeric } from '~/lib/validators'
import to from 'await-to-js'

export default {
  async asyncData({ app, params }) {
    const id = params.id
    let [err, form] = await to(app.$axios.$get(`/api/employees/${id}`))
    return { form, id }
  },
  data() {
    return {
      valid: false,
      alert: false,
      alertMsg: '',
      validators: {
        fnameRules: [v => required(v, 'First name is required')],
        lnameRules: [v => required(v, 'Last name is required')],
        usernameRules: [
          v => required(v, 'Username is required'),
          v => lowerCaseLetters(v)
        ],
        workdayIdRules: [
          v => required(v, 'Workday Id is required'),
          v => numeric(v)
        ]
      }
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.form.email = `${this.form.username}@cambridge.org`
        this.form.password = 'password'
        this.$axios
          .$put(`/api/employees/${this.id}`, this.form)
          .then(data => {
            this.showSuccess()
            this.$router.push('/employees')
          })
          .catch(e => {
            this.alertMsg = e
            this.alert = true
          })
      }
    }
  },
  notifications: {
    showSuccess: {
      title: 'Employee successfully updated',
      type: 'success',
      timeout: 5000
    }
  }
}
</script>
