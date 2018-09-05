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
        <!-- Modal Create  -->
<div class="modal fade" id="CreateModal" role="dialog">
    <div class="modal-dialog" style="max-width: 90vw;">
        <div class="modal-content shadow">
            <div class="modal-header text-white bg-dark px-4">
                <h4 class="modal-title">ADD NEW PRODUCT</h4>
                <button type="button" class="close text-white" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body d-flex  px-4">
                <div class="col">
                  <div id="upload" class="d-flex flex-column justify-content-center align-items-center" style="height:115px;">
                    <i class="fa fa-cloud-upload fa-3x"></i>
                    <h6>Drag an image or click here to upload…</h6>
                  </div>
                  <div id="uploadImg" class="d-flex flex-wrap mt-3">
                    <img height="126" class="col-4" src="https://images.unsplash.com/photo-1536007164800-b7f11331f35c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2fea553f92753fc4768ec28d8c619968&auto=format&fit=crop&w=1050&q=80" alt="img">
                  </div>
                </div>
                <div class="col">
                  <h6>Product Name</h6>
                  <input type="text" class="form-control" id="productName" placeholder="Enter Name" required>
                  <h6>Product Discription</h6>
                  <textarea class="form-control" id="proDiscript" rows="5" placeholder="Enter Discription" required></textarea>
                  <h6>Price</h6>
                  <div class="d-flex">
                    <div class="input-group mr-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Original</span>
                      </div>
                      <input type="text" class="form-control" id="">
                    </div>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Discount</span>
                      </div>
                      <input type="text" class="form-control" id="">
                    </div>
                  </div>
                  <h6>Specification</h6>
                  <div name="specificate" class="d-flex my-2">
                    <div class="input-group mr-2">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Size</span>
                      </div>
                      <select class="custom-select" id="inputGroupSelect01">
                        <option value="" selected>Choose Size</option>
                        <option value="1">S</option>
                        <option value="2">M</option>
                        <option value="3">L</option>
                    </select>
                    </div>
                    <div class="input-group mr-2">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Color</span>
                      </div>
                      <input type="text" class="form-control" id="">
                    </div>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Inventory</span>
                      </div>
                      <input type="text" class="form-control" id="">
                    </div>
                  </div>
                  <div name="specificate" class="d-flex my-2">
                    <div class="input-group mr-2">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Size</span>
                      </div>
                      <select class="custom-select" id="inputGroupSelect01">
                        <option value="" selected>Choose Size</option>
                        <option value="1">S</option>
                        <option value="2">M</option>
                        <option value="3">L</option>
                    </select>
                    </div>
                    <div class="input-group mr-2">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Color</span>
                      </div>
                      <input type="text" class="form-control" id="">
                    </div>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Inventory</span>
                      </div>
                      <input type="text" class="form-control" id="">
                    </div>
                  </div>
                  <button type="button" id="" class="btn btn-secondary btn-block" >ADD NEW SPECIFICATION<i class="fa fa-plus"></i></button>
              </div>
            </div>
            <div class="modal-footer">
                <button type="submit" id="commitBtn" class="btn btn-light">
                    SAVE DRAFT</button>
                <button type="button" id="cancelBtn" class="btn btn-secondary" >PUBLISH</button>
            </div>
        </div>
    </div>
</div>
<!-- Modal CreateModal -->

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
