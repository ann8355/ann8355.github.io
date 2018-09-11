import Vue from 'vue'
import Content from './Content'
import Navbar from './components/Navbar'
import Modal from './components/Modal'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import fontawesome from '@fortawesome/fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'
import brands from '@fortawesome/fontawesome-free-brands'
import VueBus from 'vue-bus'

fontawesome.library.add(solid) // Use any icon from the Solid style
fontawesome.library.add(regular)
fontawesome.library.add(brands)

Vue.use(require('vue-faker'))
Vue.use(VueBus)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { Content, Navbar, Modal },
  template: `<div>
              <Navbar/>
              <Content/>
              <Modal/>
            </div>`,
  store: store,
  router: router
})
