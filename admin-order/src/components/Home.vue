<template>
    <div id="home" class="none">
        <h4>OVERVIEW</h4>
        <div class="mt-4 row" style="height: 138px;">
            <div v-for="(item) in overviews" :key="item.id" class="bg-white h-100 rounded d-inline-flex justify-content-center align-items-center flex-column col">
                <h6 >{{item.name}}</h6>
                <h1 class="mt-1" v-bind:class="item.class">{{item.cost}}</h1>
            </div>
        </div>
        <div class="mt-3 py-4 px-4 bg-white rounded row" style="height: 406px;">
            <h4>Activity</h4>
                <div class="col-12 bg-dark" style="height: 85%;">
                    <div id="chart" class="w-100 h-100"></div>
                </div>
        </div>
        <div class="mt-3 row" style="height: 456px;">
            <div id="transcation" class="bg-white rounded mr-3 h-100 d-inline-flex py-4 flex-column col">
                <h4 class="mb-4 ml-4">Transcation Website</h4>
                <div v-for="(item) in transcates" :key="item.id" class="d-flex align-items-center border-bottom border-secondary pb-4 mb-4 mx-4 row">
                    <i class="fa fa-facebook-official fa-3x col"></i>
                    <h6 name="website" class="text-secondary col text-center">{{item.website}}</h6>
                    <h5 class="col text-center">{{item.total}}</h5>
                    <h6 class="col text-right" v-bind:class="item.class">
                        <v-icon class="mr-1" name="arrow-up" v-if="item.class == 'text-success'"/>
                        <v-icon class="mr-1" name="arrow-down" v-else/>
                        {{item.percentage}}</h6>
                </div>
            </div>
            <div id="order" class="bg-white rounded h-100 d-inline-flex py-4 px-4 flex-column col">
                <h4 class="mb-4">Latest Orders</h4>
                <div v-for="(item) in orderList" :key="item.id" class="d-flex flex-row border-secondary border-bottom pb-3 mb-3 align-items-center">
                    <img class="homeImg rounded mr-3" v-bind:src="item.img" alt="img">	
                    <div style="width:50%;" class="d-flex flex-column justify-content-center position-relative">
                        <h5>{{item.product}}</h5>
                        <div class="text-secondary">
                            <v-icon class="mr-2" name="clock"/>{{item.time}}
                        </div>
                        <div class="text-secondary">
                            <v-icon class="mr-3" name="female"/>{{item.name}}
                        </div>
                        <div class="position-absolute" style="bottom:0;right:0;">Total<h5 class="text-primary" style="margin:0;">{{item.price}}</h5></div>
                    </div>
                </div>
            </div>
        </div>
   </div>
</template>
<script>
export default {
  name: 'Home',
  strict: true,
  methods: {
    
  },
  data () {
    return {
      overviews: [
          {
              name: 'TOTAL_REVENUE',
              cost: '54,540',
              class: 'text-success'
          },
          {
              name: 'TOTAL_COST',
              cost: '12,660',
              class: 'text-danger'
          },
          {
              name: 'TOTAL_INCOME',
              cost: '41,880',
              class: 'text-info'
          }
      ],
      transcates: [
          {
              website: 'Facebook.com',
              total: '45,836',
              percentage: '20%',
              class: 'text-success'
          },
          {
              website: 'Google.com',
              total: '23,582',
              percentage: '12%',
              class: 'text-success'
          },
          {
              website: 'Amazon.com',
              total: '2,489',
              percentage: '15%',
              class: 'text-danger'
          },
          {
              website: 'Wordpress.com',
              total: '1,057',
              percentage: '30%',
              class: 'text-danger'
          }
      ],
      orderList:[
          {
              product: 'Striped Belted Cami Romper',
              price: '$3,200',
              img: 'https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2017/12/04/grid-img/1513712621177934845.jpg',
              name: this.$faker().name.findName(),
              time: '2018/06/13 13:42'
          },
          {
              product: 'Tied Letter Printed T Shirt',
              price: '$2,800',
              img: 'https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/01/26/thumb-img/1519935068372307092.jpg',
              name: this.$faker().name.findName(),
              time: '2018/06/13 10:45'
          },
          {
              product: 'Bra Two Piece Shorts Tracksuit',
              price: '$1,600',
              img: 'https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/04/08/thumb-img/1523130203786766573.jpg',
              name: this.$faker().name.findName(),
              time: '2018/06/13 8:26'
          }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.homeImg{
  height: 100px;
  width: 100px;
}
#home .mt-4.row div:nth-child(1),#home .mt-4.row div:nth-child(2){
    margin-right: 2em;
}
</style>
