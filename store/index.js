import VuexPersistence from 'vuex-persist'
import to from 'await-to-js'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

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
  nuxtServerInit({ commit }) {
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }
  },

  async login({ commit }, { email, password }) {
    console.log(process.env.BASE_API_URL)
    const [err, token] = await to(
      this.$axios.$post(`${process.env.BASE_API_URL}/employees/login`, {
        email,
        password
      })
    )

    if (err) {
      console.log(err.response)
      throw new Error('Bad credentials')
    } else {
      console.log(token)
      commit('SET_USER', token)
      this.$router.push('/')
    }
  }
}

export const plugins = [vuexLocal.plugin]
