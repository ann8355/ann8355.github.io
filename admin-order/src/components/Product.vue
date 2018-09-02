<template>
    <div>
        <div class="mb-3 px-3">
            <input name="selectBox" type="checkbox">
            <div class="btn-group" role="group">
                <button id="proBtnGroupDrop" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                <div id ="proDropdown-menu" class="dropdown-menu" aria-labelledby="proBtnGroupDrop">
                <button class="dropdown-item" value=1>Select All</button>
                <button class="dropdown-item" value=2>Unselect All</button>
                <button class="dropdown-item" value=7>Published</button>
                <button class="dropdown-item" value=8>Unpublished</button>
                </div>
            </div>
            <button type="button" class="btn btn-dark float-right">ADD NEW PRODUCT <i class="fa fa-plus"></i></button>
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
                        <td scope="row"><input type="checkbox" v-bind:value="index"></td>
                        <td width="250">
                            <div><img class="productImg" src="https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2017/12/29/thumb-img/1515204260445565983.jpg" v-bind:alt="item.productName">Knitted Gathered Top</div>
                        </td>
                        <td>${{item.original}}</td>
                        <td>${{item.discount}}</td>
                        <td>{{item.size}}</td>
                        <td>{{item.color}}</td>
                        <td>{{item.inventory}}</td>
                        <td>{{item.status}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Product',
  computed: {
    tableData(){
		let datalist = [];
        for(let i=0 ;i<20;i++){
            let price = this.$faker().commerce.price();
            let data = {
                productName: this.$faker().commerce.product(),
                original: parseInt(price),
                discount: Math.round(parseInt(price)*0.8),
                size: this.$faker().random.number({min:1, max:3}),
                color: this.$faker().commerce.color(),
                inventory: parseInt(this.$faker().finance.amount()),
                status: this.$faker().random.number({min:5, max:6})
            }
            datalist.push(data)
        }
        return datalist
    }
  },
  data () {
    return {
      columns: ['','Product','Original','Discount','Size','Color','Inventory','Status']
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
