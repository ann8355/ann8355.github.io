import axios from 'axios'
import Vue from 'vue'

Vue.prototype.$axios = axios // axios不能使用Vue.use(axios)
Vue.config.productionTip = false// production,true=local
Vue.prototype.$hostname = (Vue.config.productionTip) ? 'http://localhost:3000' : 'https://api.myjson.com/bins/8e744'
const PATH = Vue.prototype.$hostname

const actions = {
  CONTENTS_READ: context => {
    return axios.get(PATH).then(res => {
      context.commit('setContents', res.data)
    })
  }
}

export default actions
