<template>
  <v-app light>
    <v-toolbar
      :clipped-left="clipped"
      fixed
      app
    >
      <nuxt-link 
        to="/" 
        tag="v-toolbar-title">{{ title }}</nuxt-link>
      <v-spacer />
      <v-toolbar-items class="hidden-sm-and-down">
        <nuxt-link 
          to="/employees" 
          tag="v-btn" 
          class="v-btn--flat"
        >Employees
        </nuxt-link>
        <v-btn flat>Link Two</v-btn>
        <v-btn flat>Link Three</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        { icon: 'apps', title: 'Welcome', to: '/' },
        { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'DTR'
    }
  },
  method: {
    users() {
      this.app.router.push({ name: 'users' })
    }
  }
}
</script>
