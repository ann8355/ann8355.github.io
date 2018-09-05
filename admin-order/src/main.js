import Vue from 'vue'
import axios from 'axios'
import Content from './Content'
import Navbar from './components/Navbar'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'
import brands from '@fortawesome/fontawesome-free-brands'

fontawesome.library.add(solid) // Use any icon from the Solid style
fontawesome.library.add(regular)
fontawesome.library.add(brands)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(require('vue-faker'))

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  strict: true,
  components: { Content, Navbar },
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
