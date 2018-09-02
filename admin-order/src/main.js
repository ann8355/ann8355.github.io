import Vue from 'vue'
import axios from 'axios'
import Content from './Content'
import Navbar from './components/Navbar'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

Vue.component('v-icon', Icon)
Vue.use(require('vue-faker'))

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  strict: true,
  components: { Content, Navbar, Icon },
  template: `<div>
              <Navbar/>
              <Content/>
            </div>`,
  data: {
    contents: [],
    display: ''
  },
  // store,
  router: router,
  methods: {
    test () {
      console.log('hi')
    }
  },
  mounted () {
    axios.get('http://localhost:3000/comments').then((res) => {
      this.contents = res.data
      this.display = res.data[0].body
    })
  }
})
