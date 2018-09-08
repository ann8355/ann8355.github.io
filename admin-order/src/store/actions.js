import axios from 'axios'
import Vue from 'vue'

Vue.prototype.$axios = axios // axios不能使用Vue.use(axios)

const actions = {
  CONTENTS_READ: context => {
    return axios.get('https://api.myjson.com/bins/8e744').then(res => {
      context.commit('setContents', res.data)
    })
  }
}

export default actions
