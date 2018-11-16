<template>
  <div />
</template>
<script>
export default {
  created() {
    const token = this.$route.query.token
    const user = this.$route.query.user
    this.$store.dispatch('login', { token, user })
  }
}
</script>
