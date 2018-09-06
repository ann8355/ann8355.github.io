import Vue from 'vue'
// import axios from 'axios'
import Content from './Content'
import Navbar from './components/Navbar'
import Modal from './components/Modal'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import fontawesome from '@fortawesome/fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'
import brands from '@fortawesome/fontawesome-free-brands'

fontawesome.library.add(solid) // Use any icon from the Solid style
fontawesome.library.add(regular)
fontawesome.library.add(brands)

Vue.use(require('vue-faker'))

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  strict: true,
  components: { Content, Navbar, Modal },
  template: `<div>
              <Navbar/>
              <Content/>
              <Modal/>
            </div>`,
  data: {
    data: ''
  },
  // store,
  router: router,
  mounted () {
    // axios.get('http://localhost:3000/comments').then((res) => {
    //   this.contents = res.data
    //   this.display = res.data[0].body
    // })
  }
})
