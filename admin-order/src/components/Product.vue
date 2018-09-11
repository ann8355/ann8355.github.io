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
    btnMap.set(1, ['btn-success', 'Published','1'])
    btnMap.set(2, ['btn-secondary','Unpublished','2'])

export default {
  name: 'Product',
  strict: true,
  computed: {
    tableData() {
        let dataArray = [];
        if(this.filterOption == '5'){
            dataArray = this.$store.state.contents
        }else if(this.filterOption == '3' || this.filterOption == '4'){
            const status = btnMap.get(parseInt(this.filterOption)-2)
            dataArray = this.$store.state.contents.filter(function(item, index, array){
                return item.status == status   
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
    },
    editModal(index){
        let obj = this.tableData[index]
        this.$bus.$emit('editModal', obj)// 傳送事件（事件名稱,參數）
    }
  },
  mounted () {
    this.$store.dispatch('CONTENTS_READ')
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
.fa-edit{
  cursor: pointer;
}
#productList td p{
  border-bottom: 1px solid #dee2e6;
  margin: 0;
  padding: 0;
  height: 50px;
  line-height: 50px;
}
#productList td div:nth-child(3) p{
  border-bottom: 1px solid transparent;
}
#productList thead th:nth-child(5),#productList th:nth-child(6),#productList th:nth-child(7){
    width: 12%;
    padding: 12px 0px;
}
</style>
