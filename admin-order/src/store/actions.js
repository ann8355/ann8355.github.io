import axios from 'axios'
import Vue from 'vue'

Vue.prototype.$axios = axios // axios不能使用Vue.use(axios)
Vue.config.productionTip = false// production,true=local
Vue.prototype.$hostname = (Vue.config.productionTip) ? 'https://api.myjson.com/bins/owofc' : 'https://api.myjson.com/bins/ggjco'
const PATH = Vue.prototype.$hostname

const actions = {
  CHARTDATA_GET: context => {
    // chart假資料
    let data = []
    let income
    let cost
    let revenue
    let date
    for (let i = 1; i < 367; i++) {
      income = Math.ceil(Math.random() * 1000)
      cost = Math.ceil(income / 5)
      revenue = income + cost
      date = new Date(2018, 0, i).toISOString().substr(0, 10)
      data.push({'date': date, 'income': income, 'cost': cost, 'revenue': revenue})
    }
    data.splice(0, 1)
    return context.commit('setChart', data)
  },
  CONTENTS_READ: context => {
    return axios.get(PATH).then(res => {
      context.commit('setContents', res.data)
    })
  },
  CONTENT_UPDATE: (context, obj) => {
    return axios.put(PATH, obj).then(res => {
      context.commit('setContents', res.data)
    })
  },
  CONTENT_CREATE: (context, obj) => {
    return axios.put(PATH, obj).then(res => {
      context.commit('setContents', res.data)
    })
  },
  CONTENT_DELETE: (context, obj) => {
    return axios.put(PATH, obj).then(res => {
      context.commit('setContents', res.data)
    })
  }
}

export default actions
