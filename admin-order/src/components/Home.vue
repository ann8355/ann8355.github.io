<template>
    <div id="home" class="none">
        <h4>OVERVIEW</h4>
        <div class="mt-4 row" style="height: 138px;">
            <div v-for="(item,index) in overviews" :key="item.id" class="bg-white h-100 rounded d-inline-flex justify-content-center align-items-center flex-column col">
                <h6><i v-bind:class="item.icon" class="mr-2
                "></i>{{item.name}}</h6>
                <h1 class="mt-1" v-bind:class="item.class">{{overviewData[index]}}</h1>
            </div>
        </div>
        <div class="mt-3 py-4 px-4 bg-white rounded row" style="height: 406px;">
            <h4>Activity</h4>
            <div id="chartdiv" class="w-100 h-100"></div>
        </div>
        <div class="mt-3 row" style="height: 456px;">
            <div id="transcation" class="bg-white rounded mr-3 h-100 d-inline-flex py-4 flex-column col">
                <h4 class="mb-4 ml-4">Transcation Website</h4>
                <div v-for="(item) in transcates" :key="item.id" class="d-flex align-items-center border-bottom border-secondary pb-4 mb-4 mx-4 row">
                    <i v-bind:class="item.icon" class="fa-3x col"></i>
                    <h6 name="website" class="text-secondary col text-center">{{item.website}}</h6>
                    <h5 class="col text-center">{{item.total}}</h5>
                    <h6 class="col text-right" v-bind:class="item.class">
                        <i v-if="item.class == 'text-success'" class="fas fa-arrow-up mr-1"></i>
                        <i class="fas fa-arrow-down mr-1" v-else></i>
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
                            <i class="mr-2 far fa-clock"></i>{{item.time}}
                        </div>
                        <div class="text-secondary">
                            <i class="mr-3 fas fa-female"></i>{{item.name}}
                        </div>
                        <div class="position-absolute" style="bottom:0;right:0;">Total<h5 class="text-primary" style="margin:0;">{{item.price}}</h5></div>
                    </div>
                </div>
            </div>
        </div>
   </div>
</template>
<script>
import 'amcharts3'
import AmSerial from 'amcharts3/amcharts/serial'
import 'amcharts3/amcharts/themes/light'
import 'amcharts3/amcharts/plugins/export/export.css'
import 'amcharts3/amcharts/plugins/export/export.min.js'

export default {
  name: 'Home',
  created () {
    this.$store.dispatch('CHARTDATA_GET')
    window.AmCharts.makeChart("chartdiv",{
        type: "serial",// 折線圖
        theme: "light",// 主題
        pathToImages: "http://cdn.amcharts.com/lib/3/images/",// 解決svg顯示問題
        mouseWheelZoomEnabled: true,
        dataProvider: this.$store.state.chartData,
        categoryField: "date",// 指定X軸由年欄位決定
        chartCursor: {
            "pan": true,
            "valueLineEnabled": true,
            "valueLineBalloonEnabled": true,
            "cursorAlpha":1,
            "cursorColor":"#258cbb",
            "limitToGraph":"g1",
            "valueLineAlpha":0.2,
            "valueZoomable":true
        },
        valueScrollbar:{
            "oppositeAxis":false,
            "offset":50,
            "scrollbarHeight":10
        },
        // categoryAxis: {// X軸
        //     gridPosition: "start"
        // },
        // valueAxes: [{
        //     position: "top",
        //     title: "統計表標題"
        // }],
        // startDuration: 1,// 填充後的柱狀圖動態渲染時間，時間越長動畫效果越慢
        // rotate: true, //xy軸交換
        graphs: [{
            "balloonText": "<i class='fas fa-hand-holding-usd mr-1'></i>[[value]]<br><i class='far fa-calendar-alt mr-1'></i>[[category]]&nbsp;&nbsp;",
            "bullet": "round",// 點的形狀
            "title": "Revenue",
            "valueField": "revenue",
            "fillAlphas": 0// 填充內容透明度  
        }, {
            "balloonText": "<i class='fas fa-th-large mr-1'></i>[[value]]<br><i class='far fa-calendar-alt mr-1'></i>[[category]]&nbsp;&nbsp;",
            "bullet": "square",
            "title": "Cost",
            "valueField": "cost",
            "fillAlphas": 0
        }, {
            "balloonText": "<i class='fas fa-money-bill-alt mr-1'></i>[[value]]<br><i class='far fa-calendar-alt mr-1'></i>[[category]]&nbsp;&nbsp;",
            "bullet": "triangleDown",
            "title": "Income",
            "valueField": "income",
            "fillAlphas": 0
        }],
        export: {
            "enabled": true// 匯出功能
        },
        legend: {
            useGraphSettings: true// 圖例
        }
      }
    )
  },
  computed: {
    overviewData() {
        let totalRevenue = 0
        let totalCost = 0
        let totalIncome = 0
        let overviewData = []
        this.$store.state.chartData.forEach(function(element) {
            totalRevenue += element.revenue
            totalCost += element.cost
            totalIncome += element.income
        });
        overviewData.push(totalRevenue)
        overviewData.push(totalCost)
        overviewData.push(totalIncome)
        return overviewData
    }
  },
  data () {
    return {
      overviews: [
          {
              name: 'TOTAL_REVENUE',
              class: 'text-success',
              icon: 'fas fa-hand-holding-usd'
          },
          {
              name: 'TOTAL_COST',
              class: 'text-danger',
              icon: 'fas fa-th-large'
          },
          {
              name: 'TOTAL_INCOME',
              class: 'text-info',
              icon: 'fas fa-money-bill-alt'
          }
      ],
      transcates: [
          {
              website: 'Facebook.com',
              total: '45,836',
              percentage: '20%',
              class: 'text-success',
              icon: 'fab fa-facebook'
          },
          {
              website: 'Google.com',
              total: '23,582',
              percentage: '12%',
              class: 'text-success',
              icon: 'fab fa-google'
          },
          {
              website: 'Amazon.com',
              total: '2,489',
              percentage: '15%',
              class: 'text-danger',
              icon: 'fab fa-amazon'
          },
          {
              website: 'Wordpress.com',
              total: '1,057',
              percentage: '30%',
              class: 'text-danger',
              icon: 'fab fa-wordpress'
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
