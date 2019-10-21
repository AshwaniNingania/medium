import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    username(state) {
      return (state.user && state.user.username) || null;
    },
    user(state) {
      return (state.user) || null;
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    getUser: async function({commit}) {
      const user = await axios.get('/user');
      commit('setUser', user);
    }
  }
})
