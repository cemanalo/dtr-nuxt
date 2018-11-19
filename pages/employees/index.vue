<template>
  <v-layout
    column
    justify-center
    align-center>
    <v-flex
      xs12>
      <v-data-table 
        :headers="headers"
        :items="employees"
        :total-items="totalItems"
        :loading="loading"
        :pagination.sync="pagination"
      >
        <template 
          slot="items" 
          slot-scope="props">
          <td>{{ props.item.workdayId }}</td>
          <td>{{ props.item.lastName }}</td>
          <td>{{ props.item.firstName }}</td>
          <td>{{ props.item.position }}</td>
          <td>Action</td>
        </template>
      </v-data-table>
    </v-flex>
    
  </v-layout>
</template>
<script>
import headers from './headers.json'
import to from 'await-to-js'

export default {
  data() {
    return {
      headers,
      pagination: {},
      loading: true,
      employees: [],
      totalItems: 0
    }
  },
  watch: {
    pagination: {
      async handler() {
        this.loading = true
        const pageReq = this.pagination
        const limit = pageReq.rowsPerPage
        const skip = limit * (pageReq.page - 1)

        const filter = JSON.stringify({
          limit,
          skip
        })

        const [employeesErr, employees] = await to(
          this.$axios.$get(`/api/employees?filter=${filter}`)
        )

        const [totalItemsErr, totalItems] = await to(
          this.$axios.$get(`/api/employees/count`)
        )

        this.loading = false
        this.employees = employees
        this.totalItems = totalItems.count
      },
      deep: true
    }
  }
}
</script>
