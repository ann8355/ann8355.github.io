import axios from 'axios'
import Vue from 'vue'

Vue.prototype.$axios = axios // axios不能使用Vue.use(axios)
Vue.config.productionTip = false// production,true=local
Vue.prototype.$hostname = (Vue.config.productionTip) ? 'https://api.myjson.com/bins/owofc' : 'https://api.myjson.com/bins/ggjco'
const PATH = Vue.prototype.$hostname

const actions = {
  CONTENTS_READ: context => {
    return axios.get(PATH).then(res => {
      context.commit('setContents', res.data)
    })
  },
  CONTENT_UPDATE: (context, obj) => {
    return axios.put(PATH, obj).then(res => {
      console.log(res.data)
      context.commit('setContents', res.data)
    })
  }
//   CONTENT_CREATE: (context, obj) => {
//     return axios.post(PATH, obj).then(res => {
//         context.commit('setContents', res.data)
//     });
//   }
}

export default actions
