import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from "vuex-persistedstate";
import Api from "@/utils/Api.js"

Vue.use(Vuex)
import auth from "@/store/auth"



export default new Vuex.Store({
  modules: {
    auth
  },
  plugins: [ 
    createPersistedState({
    	key: 'sheleads-admin'
    }) 
  ]
})
