<template>
    <div>
        <div class="mb-3 px-3">
            <input name="selectBox" type="checkbox" v-model="checked">
            <div class="btn-group" role="group">
                <button id="btnGroupDrop1" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                <div id ="dropdown-menu1" class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    <button v-on:click="filterStatus(index+1)" v-for="(item,index) in dropdowns" :key="item.id" class="dropdown-item" v-bind:value="index+1">{{item}}</button>
                </div>
            </div>
            <input v-model="keyword" type="text" style="border-radius: 0.25rem;" placeholder="Enter Keyword">
            <div class="btn-group d-flex align-items-center" role="group" style="float:right;">
                <button id="btnGroupDrop2" class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="float:right;">EDIT SECTION</button>
                <div id ="dropdown-menu2" class="dropdown-menu" aria-labelledby="btnGroupDrop2">
                    <div v-for="(item,index) in columns" :key="item.id" class="dropdown-item">
                        <input v-model="showColumn[index]" class="mr-2" type="checkbox" v-bind:value="index">{{item}}
                    </div>
                </div>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="totalPage"><i class="fas fa-list-ul"></i></label>
                    </div>
                    <select v-model="totalPages" class="custom-select" id="totalPage">
                        <option value="5" selected>5</option>
                        <option value="10">10</option>
                        <option value="">All</option>
                    </select>
                </div>   
            </div>
        </div>
        <div id="block" class="table-responsive" style="overflow:auto;">
            <table id="order" class="table table-hover table-light">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col"></th>
                        <th v-on:click="sort(index)" v-show="showColumn[index]" v-for="(item,index) in columns" :key="item.id" scope="col">
                            {{item}}<i v-if="index == 2" class="fas fa-sort ml-2 text-warning"></i>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in tableData" :key="item.id">
                        <td scope="row">
                            <input type="checkbox" v-bind:value="index" v-model="checked">
                        </td>
                        <td v-show="showColumn[0]">{{item.id}}</td>
                        <td v-show="showColumn[1]">{{item.name}}</td>
                        <td v-show="showColumn[2]">{{item.product}}</td>
                        <td v-show="showColumn[3]">${{item.price}}</td>
                        <td v-show="showColumn[4]">{{item.addtime}}</td>
                        <td v-show="showColumn[5]">{{item.checkout}}</td>
                        <td v-show="showColumn[6]">{{item.address}}</td>
                        <td v-show="showColumn[7]">{{item.phone}}</td>
                        <td v-show="showColumn[8]">{{item.email}}</td>
                        <td v-show="showColumn[9]">
                            <div class="btn-group" role="group">
                                <button name="status" type="button" v-bind:class="item.status[0]" class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-bind:value="item.status[2]">
                                {{item.status[1]}}
                                </button>
                                <div name="dropdown-menu3" class="dropdown-menu" aria-labelledby="statusBtn2">
                                    <button v-on:click="changeStatus(index2-1,index)" v-if="index2 > 1" v-for="(item,index2) in dropdowns" :key="item.id" class="dropdown-item" v-bind:value="index2-1">{{item}}</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                <li class="page-item">
                    <span class="page-link" aria-label="Previous" @click="prevPage">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                    </span>
                </li>
                <li class="page-item" v-for="(item,index) in pages" :key="item.id"><span class="page-link" @click="changePage(index+1)">{{index+1}}</span></li>
                <li class="page-item">
                    <span class="page-link" aria-label="Next" @click="nextPage">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next</span>
                    </span>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script>
const btnMap = new Map()
    btnMap.set(1, ['btn-success', 'Paid', '1'])
    btnMap.set(2, ['btn-secondary','Unpaid', '2'])
    btnMap.set(3, ['btn-warning','Shipping', '3'])
    btnMap.set(4, ['btn-info','Done', '4'])

export default {
  name: 'Orders',
  strict: true,
  computed: {
    tableData() {
        let dataArray = [];
        if(this.filterOption == '7'){
            dataArray = this.contents
        }else if(parseInt(this.filterOption) > parseInt('2') && parseInt(this.filterOption) < parseInt('7')){
            const status = btnMap.get(parseInt(this.filterOption)-2)
            dataArray = this.contents.filter(function(item, index, array){
                return item.status == status   
            })
        }
        if(this.keyword != ''){
            const keyword = this.keyword
            dataArray = dataArray.filter(function(item, index, array){
                return item.name.indexOf(keyword) > -1 || item.product.indexOf(keyword) > -1 || item.price.indexOf(keyword) > -1
                || item.addtime.indexOf(keyword) > -1 || item.checkout.indexOf(keyword) > -1 || item.address.indexOf(keyword) > -1
                || item.phone.indexOf(keyword) > -1 || item.email.indexOf(keyword) > -1
            })
        }
        if(this.totalPages != ""){
            this.pages = Math.ceil(dataArray.length/this.totalPages)
        }else{
            this.pages = 1
        }
        return dataArray
    }
  },
  methods: {
    changePage(id){
        this.thisPage = id
    },
    prevPage(){
        let page = this.thisPage
        if(page - 1 > 0){
            this.thisPage = page - 1
        }
    },
    nextPage(){
        let page = this.thisPage
        if(page + 1 <= this.pages){
            this.thisPage = page + 1
        }
    },
    changeStatus(id,index){
        const btnArray = btnMap.get(id);
        let obj = this.contents[index]
        obj.status = btnArray
        this.contents.splice(index, 1, obj)
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
    sort(index){
        if(index == 2){
            let sortable = this.sortable;
            if(sortable == 'asc'){
                this.contents.sort(function(a, b) {
                    var productA = a.product.toUpperCase(); // ignore upper and lowercase
                    var productB = b.product.toUpperCase(); 
                    if (productA < productB) {
                        return -1;
                    }
                    if (productA > productB) {
                        return 1;
                    }  
                    return 0; // equal
                });
                this.sortable = 'desc'
            }else{
                this.contents.sort(function(a, b) {
                    var productA = a.product.toUpperCase(); // ignore upper and lowercase
                    var productB = b.product.toUpperCase(); 
                    if (productA < productB) {
                        return 1;
                    }
                    if (productA > productB) {
                        return -1;
                    }  
                    return 0; // equal
                });
                this.sortable = 'asc'
            }
        }
    }
  },
  mounted() {
    let datalist = [];
    for(let i=0 ;i<20;i++){
        let status = this.$faker().random.number({min:1, max:4})
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
      dropdowns: ['Select All','Unselect All','Paid','Unpaid','Shipping','Done','Show All'],
      columns: ['ID','Customer','Product List','Total','Add to Cart','Check-out','Address','Phone','Email','Status'],
      contents: [],
      filterOption: '7',
      checked: false,
      keyword: '',
      showColumn: [true,true,true,true,true,true,true,true,true,true],
      sortable: 'asc',
      totalPages: '5',
      thisPage: '1',
      pages: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .dropdown-menu{
        z-index: 1100!important;
    }
    #order th:nth-child(4){
        cursor: pointer;
        width: 12%;
    }
    .page-link,.custom-select,.input-group-text {
        background-color: #FDFDFE;
        color: #000;
        border: 1px solid #000;
    }
    .page-link:hover,.page-link:focus,.input-group-text{
        background-color: #202529;
        color: #fff;
    }
</style>
