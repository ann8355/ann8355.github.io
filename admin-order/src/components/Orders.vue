<template>
    <div>
        <div class="mb-3 px-3">
            <input name="selectBox" type="checkbox">
            <div class="btn-group" role="group">
                <button id="btnGroupDrop1" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                <div id ="dropdown-menu1" class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    <button v-for="(item,index) in dropdowns" :key="item.id" class="dropdown-item" v-bind:value="index">{{item}}</button>
                </div>
            </div>
            <div class="btn-group" role="group" style="float:right;">
                <button id="btnGroupDrop2" class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="float:right;">EDIT SECTION</button>
                <div id ="dropdown-menu2" class="dropdown-menu" aria-labelledby="btnGroupDrop2">
                    <div v-for="(item,index) in columns" :key="item.id" class="dropdown-item"><input class="mr-2" type="checkbox" v-bind:value="index">{{item}}</div>
                </div>
            </div>
        </div>
        <div id="block" class="table-responsive" style="overflow:auto;">
            <table id="order" class="table table-hover table-light">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col"></th>
                        <th v-for="(item) in columns" :key="item.id" scope="col">{{item}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in tableData" :key="item.id">
                        <td scope="row"><input type="checkbox" v-bind:value="index"></td>
                        <td>{{item.id}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.product}}</td>
                        <td>${{item.price}}</td>
                        <td>{{item.addtime}}</td>
                        <td>{{item.checkout}}</td>
                        <td>{{item.address}}</td>
                        <td>{{item.phone}}</td>
                        <td>{{item.email}}</td>
                        <td>{{item.status}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Orders',
  computed: {
    tableData(){
		let datalist = [];
        for(let i=0 ;i<20;i++){
            let data = {
                id: i+1,
                name: this.$faker().name.findName(),
                product: this.$faker().commerce.productName(),
                price: this.$faker().commerce.price().split('.')[0],
                addtime: this.$faker().date.past().toString(),
                checkout: this.$faker().date.past().toString(),
                address: this.$faker().address.streetAddress(),
                phone: this.$faker().phone.phoneNumberFormat(),
                email: this.$faker().internet.email(),
                status: this.$faker().random.number({min:1, max:4})
            }
            datalist.push(data)
        }
        return datalist
    }
  },
  data () {
    return {
      dropdowns: ['Select All','Unselect All','Paid','Unpaid','Shipping','Done'],
      columns: ['Order ID','Customer','Product List','Total','Add to Cart','Check-out','Address','Phone','Email','Status']
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .dropdown-menu{
        z-index: 1100!important;
    }
</style>
