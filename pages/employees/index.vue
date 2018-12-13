<template>
  <v-layout
    column
    justify-center
    align-center>
    <v-flex
      xs12>
      <v-card-title>
        Employees
        <v-spacer/>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        />
      </v-card-title>
      <v-data-table 
        :headers="headers"
        :items="employees"
        :total-items="totalEmployees"
        :loading="loading"
        :pagination.sync="pagination"
        class="elevation-1"
      >
        <template 
          slot="items" 
          slot-scope="props">
          <td>{{ props.item._source.workdayId }}</td>
          <td>{{ props.item._source.lastName }}</td>
          <td>{{ props.item._source.firstName }}</td>
          <td>{{ props.item._source.position }}</td>
          <td>Action</td>
        </template>
      </v-data-table>
    </v-flex>
    
  </v-layout>
</template>
<script>
import headers from './headers.json'
import to from 'await-to-js'
import _ from 'lodash'
import { setTimeout } from 'timers'

export default {
  data() {
    return {
      headers,
      pagination: {},
      loading: true,
      employees: [],
      totalEmployees: 0,
      search: ''
    }
  },
  watch: {
    pagination: {
      handler() {
        this.loading = true
        const self = this
        const pageReq = this.pagination
        const size = pageReq.rowsPerPage
        const from = size * (pageReq.page - 1)

        this.$axios
          .$get(
            `/api/employees/search?from=${from}&size=${size}&q=${this.search}`
          )
          .then(employees => {
            this.loading = false
            this.employees = _.get(employees, 'result.hits.hits', [])
            this.totalEmployees = _.get(employees, 'result.hits.total', 0)
          })
      },
      deep: true
    },
    search: {
      handler() {
        this.loading = true
        const self = this
        const pageReq = this.pagination
        const size = pageReq.rowsPerPage
        const from = size * (pageReq.page - 1)

        this.$axios
          .$get(
            `/api/employees/search?from=0&size=${size}&q=${this.search || '*'}`
          )
          .then(employees => {
            this.loading = false
            this.employees = _.get(employees, 'result.hits.hits', [])
            this.totalEmployees = _.get(employees, 'result.hits.total', 0)
          })
      },
      deep: true
    }
  },
  mounted() {
    this.loading = true
    const self = this
    const pageReq = this.pagination
    const size = pageReq.rowsPerPage
    const from = size * (pageReq.page - 1)

    this.$axios
      .$get(`/api/employees/search?from=${from}&size=${size}&q=${this.search}`)
      .then(employees => {
        this.loading = false
        this.employees = _.get(employees, 'result.hits.hits', [])
        this.totalEmployees = _.get(employees, 'result.hits.total', 0)
      })
  }
}
</script>
