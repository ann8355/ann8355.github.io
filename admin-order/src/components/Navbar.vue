<template>
  <div id="navbar">
    <nav class="navbar navbar-expand navbar-dark bg-dark fixed-top" style="background-color: #000000!important;">
      <div class="container-fluid">
        <a class="navbar-brand mr-5" href="#"><h4>Shoptime</h4></a>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto" style="position: absolute;bottom: 0px;">
              <router-link :to="item.path" tag="li" v-for="(item) in pages" active-class="active" :key="item.id" class="nav-item mx-3" exact>
                <a class="nav-link"><h6>{{ item.title }}</h6></a> 
              </router-link>
          </ul>
          <span class="navbar-text text-white" style="position: absolute;right: 40px;">
            ADMIN
          </span>
        </div>
	    </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      pages: [
        {
          title: 'HOME',
          path: '/'
        },
        {
          title: 'ORDERS',
          path: '/Orders'
        },
        {
          title: 'PRODUCT',
          path: '/Product'
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.active{
  border-bottom: 3px solid #fff!important;
}
</style>
