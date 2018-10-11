export const state = () => ({
  authUser: 0
})

export const mutations = {
  SET_USER: (state, user) => {
    alert('SET_USER:' + user)
    state.authUser = user
  }
}

export const actions = {
  login({ commit }, { email, password }) {
    return this.$axios
      .$post(`${process.env.BASE_API_URL}/employees/login`, {
        email,
        password
      })
      .then(res => {
        if (res.status === 401) {
          console.log('Bad credentials')
        } else {
          commit('SET_USER', res)
          this.$router.push('/')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
