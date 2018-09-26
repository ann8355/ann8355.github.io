import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import state from './rootState'
// import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  // getters,
  state,
  actions,
  mutations
})

export default store
