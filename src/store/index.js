import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from "vuex-persistedstate";
import Api from "@/utils/Api.js"

Vue.use(Vuex)
import auth from "@/store/auth"
import app from "@/store/app"



export default new Vuex.Store({
  modules: {
  	app,
    auth
  },
  plugins: [ 
    createPersistedState({
    	key: 'sheleads-admin'
    }) 
  ]
})
