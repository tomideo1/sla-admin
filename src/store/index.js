import Vue from "vue"
import Vuex from "vuex"

import Api from "@/utils/Api.js"

Vue.use(Vuex)
import auth from "@/store/auth"



export default new Vuex.Store({
  modules: {
    auth
  }
})
