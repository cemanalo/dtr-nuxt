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
    state.authUser = user
  }
}

export const actions = {
  nuxtServerInit({ commit }) {
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }
  },

  async login({ commit }, { user, token }) {
    commit('SET_USER', { token })
    this.$axios.setToken(token)
    const [err, userInfo] = await to(this.$axios.$get(`/api/employees/${user}`))

    if (err) {
      console.log(err.response)
      throw new Error('Bad credentials')
    } else {
      console.log(token)
      commit('SET_USER', { userInfo, token })
      this.$router.push('/')
    }
  }
}

export const plugins = [vuexLocal.plugin]
