<template>
    <div>
        <div class="mb-3 px-3">
            <input name="selectBox" type="checkbox" v-model="checked">
            <div class="btn-group" role="group">
                <button id="proBtnGroupDrop" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                <div id ="proDropdown-menu" class="dropdown-menu" aria-labelledby="proBtnGroupDrop">
                    <button v-on:click="filterStatus(index+1)" v-for="(item,index) in dropdowns" :key="item.id" class="dropdown-item" v-bind:value="index+1">{{item}}</button>
                </div>
            </div>
            <input v-model="keyword" type="text" style="border-radius: 0.25rem;" placeholder="Enter Keyword">
            <button type="button" class="btn btn-dark float-right" data-toggle="modal" data-target="#CreateModal">ADD NEW PRODUCT <i class="fa fa-plus"></i></button>
        </div>
        <div class="table-responsive" style="overflow:auto;">
            <table id="productList" class="table table-hover table-light">
                <thead class="thead-dark">
                    <tr>
                        <th v-for="(item) in columns" :key="item.id" scope="col">{{item}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in tableData" :key="item.id">
                        <td scope="row"><input type="checkbox" v-bind:value="index" v-model="checked"></td>
                        <td width="250">
                            <div><img class="productImg" src="https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2017/12/29/thumb-img/1515204260445565983.jpg" v-bind:alt="item.productName">{{item.productName}}</div>
                        </td>
                        <td>${{item.original}}</td>
                        <td>${{item.discount}}</td>
                        <td>{{item.size}}</td>
                        <td>{{item.color}}</td>
                        <td>{{item.inventory}}</td>
                        <td>
                            <div class="btn-group" role="group">
                                <button name="status" type="button" v-bind:class="item.status[0]" class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-bind:value="item.status[2]">
                                {{item.status[1]}}
                                </button>
                                <div name="dropdown-pro" class="dropdown-menu" aria-labelledby="statusPro">
                                    <button v-on:click="changeStatus(index2-1,index)" v-if="index2 > 1 && index2 < 4" v-for="(item,index2) in dropdowns" :key="item.id" class="dropdown-item" v-bind:value="index2-1">{{item}}</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
const sizeMap = new Map()
    sizeMap.set(1, "S")
    sizeMap.set(2, "M")
    sizeMap.set(3, "L")
const btnMap = new Map()
    btnMap.set(1, ['btn-success', 'Published','1'])
    btnMap.set(2, ['btn-secondary','Unpublished','2'])

export default {
  name: 'Product',
  strict: true,
  computed: {
    tableData() {
        let dataArray = [];
        if(this.filterOption == '5'){
            dataArray = this.contents
        }else if(this.filterOption == '3' || this.filterOption == '4'){
            const status = btnMap.get(parseInt(this.filterOption)-2)
            dataArray = this.contents.filter(function(item, index, array){
                return item.status == status   
            })
        }
        if(this.keyword != ''){
            const keyword = this.keyword
            dataArray = dataArray.filter(function(item, index, array){
                return item.color.indexOf(keyword) > -1 || item.productName.indexOf(keyword) > -1 || item.inventory.toString().indexOf(keyword) > -1
                || item.original.toString().indexOf(keyword) > -1 || item.discount.toString().indexOf(keyword) > -1 || item.size.indexOf(keyword) > -1
            })
        }
        return dataArray
    }
  },
  methods: {
    changeStatus(id,index){
        const btnArray = btnMap.get(id);
        let obj = this.tableData[index]
        obj.status = btnArray
        this.tableData.splice(index, 1, obj)
    },
    filterStatus(id){
       if(id == '1'){
           this.checked = true
       }else if(id == '2'){
           this.checked = false
       }else{
           this.filterOption = id
       }
    }
  },
  mounted() {
    let datalist = [];
    for(let i=0 ;i<20;i++){
        let price = this.$faker().commerce.price();
        let size = this.$faker().random.number({min:1, max:3});
        let status = this.$faker().random.number({min:1, max:2});
        let data = {
            productName: this.$faker().commerce.product(),
            original: parseInt(price),
            discount: Math.round(parseInt(price)*0.8),
            size: sizeMap.get(size),
            color: this.$faker().commerce.color(),
            inventory: parseInt(this.$faker().finance.amount()),
            status: btnMap.get(status)
        }
        datalist.push(data)
    }
    // axios.get('http://localhost:3000/method').then((res) => {
    //   this.contents = res.data
    this.contents = datalist
    // })
  },
  data () {
    return {
      columns: ['','Product','Original','Discount','Size','Color','Inventory','Status'],
      dropdowns: ['Select All','Unselect All','Published','Unpublished','Show All'],
      contents: [],
      filterOption: '5',
      checked: false,
      keyword: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.productImg{
  height: 50px;
  width: 50px;
}
</style>
