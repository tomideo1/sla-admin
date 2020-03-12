import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {
      loggedIn: true,
      user: {
        data: {
          name: "Dapo Believe",
          age: 29,
          sex: "Male"
        }
      }
    }
  },
  getters: {
    auth: state => {
      return state.auth
    }
  },
  mutations: {}
})
