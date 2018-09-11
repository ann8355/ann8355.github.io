// import Vue from 'vue'
// import axios from 'axios'

// Vue.prototype.$axios = axios //axios不能使用Vue.use(axios)

const mutations = {
  setContents (state, data) {
    state.contents = data
  },
  setObj (state, obj) {
    state.obj = obj
  }
// let datalist = [];
// for(let i=0 ;i<8;i++){
//     let price = this.$faker().commerce.price();
//     let status = this.$faker().random.number({min:1, max:2});
//     let specificates = new Array(3)
//     for(let j=0 ;j<specificates.length;j++){
//         let size = this.$faker().random.number({min:1, max:3});
//         specificates[j] = {
//             sizeSelected: sizeMap.get(size),
//             color: this.$faker().commerce.color(),
//             inventory: parseInt(this.$faker().finance.amount())
//         }
//     }
//     let data = {
//         productName: this.$faker().commerce.product(),
//         proDiscript: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione quia quam, eaque voluptatem totam ea.',
//         original: parseInt(price),
//         discounts: Math.round(parseInt(price)*0.8),
//         imgSrc: [],
//         specificates: specificates,
//         status: btnMap.get(status)
//     }
//     datalist.push(data)
// }
}

export default mutations
