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
                        <td scope="row">
                            <input type="checkbox" v-bind:value="index" v-model="checked">
                            <span v-on:click="editModal(index)"><i class="fas fa-edit text-primary fa-lg ml-2" data-toggle="modal" data-target="#CreateModal" title="edit"></i></span>
                            <span v-on:click="deleteItem(item.productName)"><i class="fas fa-trash-alt text-danger fa-lg ml-2" title="delete"></i></span>
                        </td>
                        <td width="250">
                            {{item.productName}}
                            <div><img class="productImg mr-2" v-bind:src="item.imgSrc[0]" v-bind:alt="item.productName"></div>
                        </td>
                        <td>${{item.original}}</td>
                        <td>${{item.discounts}}</td>
                        <td colspan="3" style="padding:0px;">
                            <div class="d-flex" v-for="(item2) in item.specificates" :key="item2.id">
                                <p class="col">{{item2.sizeSelected}}</p>
                                <p class="col">{{item2.color}}</p>
                                <p class="col">{{item2.inventory}}</p>
                            </div>
                        </td>
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
// const sizeMap = new Map()
//     sizeMap.set(1, "S")
//     sizeMap.set(2, "M")
//     sizeMap.set(3, "L")
const btnMap = new Map()
    btnMap.set(1,['btn-success', 'Published','1'])
    btnMap.set(2,['btn-secondary','Unpublished','2'])

export default {
  name: 'Product',
  computed: {
    tableData() {
        let dataArray = this.$store.state.contents
        if(this.filterOption == '3' || this.filterOption == '4'){
            const status = btnMap.get(parseInt(this.filterOption)-2)
            dataArray = dataArray.filter(function(item, index, array){
                // return item.status.toString() == status.toString()
                return JSON.stringify(item.status) == JSON.stringify(status) // 必須將陣列轉換成字串(Array是物件，==或===操作符只能比較兩個物件是否是同一個物件引用)
            })
             
        }
        if(this.keyword != ''){
            const keyword = this.keyword
            dataArray = dataArray.filter(function(item, index, array){
                return item.productName.indexOf(keyword) > -1 || item.original.toString().indexOf(keyword) > -1 || item.discounts.toString().indexOf(keyword) > -1 
            })
        }
        return dataArray
    }
  },
  methods: {
    deleteItem(name){
        this.$store.commit('deleteItem', name)
        this.$store.dispatch('CONTENT_DELETE',this.$store.state.contents)
    },
    changeStatus(id,index){
        const btnArray = btnMap.get(id);
        this.$store.commit('updateItem', {item: this.tableData[index], status: btnArray})
        this.$store.dispatch('CONTENT_UPDATE',this.$store.state.contents)
    },
    filterStatus(id){
       if(id == '1'){
           this.checked = true
       }else if(id == '2'){
           this.checked = false
       }else{
           this.filterOption = id
       }
    },
    editModal(index){
        this.$bus.$emit('editModal', this.tableData[index])// 傳送事件（事件名稱,參數）
    }
  },
  created () {
    this.$store.dispatch('CONTENTS_READ')
// let datalist = [];
// for(let i=0 ;i<8;i++){
//     let price = this.$faker().commerce.price();
//     let status = this.$faker().random.number({min:1, max:2});
//     let specificates = new Array(3)
//     for(let j=0 ;j<specificates.length;j++){
//         let size = this.$faker().random.number({min:1, max:3});
//         specificates[j] = {
//             sizeSelected: sizeMap.get(size),
//             color: this.$faker().commerce.color(),
//             inventory: parseInt(this.$faker().finance.amount())
//         }
//     }
//     let data = {
//         productName: this.$faker().commerce.product(),
//         proDiscript: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione quia quam, eaque voluptatem totam ea.',
//         original: parseInt(price),
//         discounts: Math.round(parseInt(price)*0.8),
//         imgSrc: [],
//         specificates: specificates,
//         status: btnMap.get(status)
//     }
//     datalist.push(data)
// }
  },
  data () {
    return {
      columns: ['','Product','Original','Discount','Size','Color','Inventory','Status'],
      dropdowns: ['Select All','Unselect All','Published','Unpublished','Show All'],
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
  height: 100px;
  width: 100px;
}
.fa-edit,.fa-trash-alt{
  cursor: pointer;
}
#productList td p{
  border-bottom: 1px solid #dee2e6;
  margin: 0;
  padding: 0;
  height: 50px;
  line-height: 50px;
}
#productList td div:last-child p{
  border-bottom: 1px solid transparent;
}
#productList thead th:nth-child(5),#productList th:nth-child(6),#productList th:nth-child(7){
    width: 12%;
    padding: 12px 0px;
}
</style>
