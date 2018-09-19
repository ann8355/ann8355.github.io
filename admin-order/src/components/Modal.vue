<template>
<div class="modal fade" id="CreateModal" role="dialog" data-backdrop="static">
    <div class="modal-dialog" style="max-width: 90vw;">
        <div class="modal-content shadow">
            <div class="modal-header text-white bg-dark px-4">
                <h4 class="modal-title">ADD NEW PRODUCT</h4>
                <button type="button" class="close text-white" data-dismiss="modal" v-on:click="clear()">&times;</button>
            </div>
          <form ref="productForm" v-on:submit.prevent>
            <div class="modal-body d-flex pt-4 px-4">
                <div class="col">
                  <div id="upload" @click="$refs.files.click()" class="d-flex flex-column justify-content-center align-items-center" style="height:115px;">
                    <i class="fas fa-cloud-upload-alt fa-3x mb-2"></i>
                    <h6>Click here to upload images</h6>
                  </div>
                  <input ref="files" @change="previewFiles" multiple class="d-none" type="file" accept="image/*">
                  <div id="uploadImg" class="d-flex flex-wrap mt-3">
                    <img v-for="(item) in content.imgSrc" :key="item.id" height="126" class="col-4" v-bind:src="item" alt="img">
                  </div>
                </div>
                <div id="productDetail" class="col">
                  <h6>Product Name</h6>
                  <input v-bind:readonly="action == 'update'" type="text" class="form-control mb-2" v-model="content.productName" placeholder="Enter Name" required>
                  <h6>Product Discription</h6>
                  <textarea class="form-control mb-2" v-model="content.proDiscript" rows="5" placeholder="Enter Discription" required></textarea>
                  <h6>Price</h6>
                  <div id="priceDiv" class="d-flex mb-2">
                    <div class="input-group mr-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Original</span>
                      </div>
                      <input type="number" class="form-control" required v-model.number="content.original">
                    </div>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Discount</span>
                      </div>
                      <input type="number" class="form-control" v-model.number="discount" required>
                    </div>
                  </div>
                  <h6>Specification</h6>
                  <div v-for="(item,index) in content.specificates" :key="item.id" name="specificate" class="d-flex my-2">
                    <span v-on:click="minusSpecificate(index)"><i class="fas fa-minus-circle mt-2 mr-1"></i></span>
                    <div class="input-group mr-2">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Size</span>
                      </div>
                      <select class="custom-select" v-model="item.sizeSelected" required>
                        <option v-for="(item2) in size" :key="item2.id" v-bind:value="item2">{{item2}}</option>
                      </select>
                    </div>
                    <div class="input-group mr-2">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Color</span>
                      </div>
                      <input type="text" class="form-control" v-model="item.color" required>
                    </div>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Inventory</span>
                      </div>
                      <input type="number" class="form-control" v-model.number="item.inventory" required>
                    </div>
                  </div>
                  <button type="button" v-on:click="addSpecificate()" class="btn btn-secondary btn-block mt-3" >ADD NEW SPECIFICATION<i class="fa fa-plus ml-2"></i></button>
                </div>
            </div>
            <div class="modal-footer pb-4" style="padding-right:39px;">
                <button type="submit" ref="saveDraft" v-on:click="save('saveDraft',JSON.stringify(content))" class="btn btn-light">SAVE DRAFT</button>
                <button type="submit" ref="publish" v-on:click="save('publish',JSON.stringify(content))" class="btn btn-secondary">PUBLISH</button>
            </div>
          </form>
        </div>
    </div>
</div>
</template>
<script>
export default {
  name: 'Modal',
  created () {
    this.$bus.$on('editModal', obj => {// 接收事件
      this.$store.commit('setObj', obj)
      this.content = JSON.parse(JSON.stringify(this.$store.state.obj))// ?
      this.action = 'update'
    })
    this.content = JSON.parse(JSON.stringify(this.$store.state.obj))
  },
  computed: {
    discount: {
      get () {
        this.content.discounts = Math.round(this.content.original*0.8)
        return Math.round(this.content.original*0.8)
      },
      set (value) {
        this.content.discounts = value
      }
    }
  },
  methods: {
    addSpecificate() {
      let obj =  {
          sizeSelected: '',
          color: '',
          inventory: null
      }
      this.content.specificates.push(obj)
    },
    minusSpecificate(index) {
      this.content.specificates.splice(index, 1)
    },
    clear(){
      this.action = ''
      this.content.productName = ''
      this.content.proDiscript = ''
      this.content.original = null
      this.content.discounts = null
      this.file = []
      this.content.imgSrc = []
      this.content.status = null
      this.content.specificates = [
        {
          sizeSelected: '',
          color: '',
          inventory: null
        },
        {
          sizeSelected: '',
          color: '',
          inventory: null
        }
      ]
    },
    save(name,contentObj) {// 為何無法直接得到this.content的值（但在tempelate可以得到content.屬性值或JSON.stringify(content)？
      let content = JSON.parse(contentObj)
      let id;
      let status;
      if(name == 'saveDraft'){
        id = this.$refs.saveDraft
        status = ['btn-secondary','Unpublished','2']
      }else if(name == 'publish'){
        id = this.$refs.publish
        status = ['btn-success', 'Published','1']
      }
      id.removeAttribute("data-dismiss")
      if (this.$refs.productForm.checkValidity()) {
        if(this.action == 'update'){
          this.$store.commit('updateItem', {item: content, status: status})
          this.$store.dispatch('CONTENT_UPDATE',this.$store.state.contents)//myJson的做法,參數傳全部資料的array,而不是更新的物件
        }else{
          this.$store.commit('createItem', {item: content, status: status})
          this.$store.dispatch('CONTENT_CREATE',this.$store.state.contents)//myJson的做法,參數傳全部資料的array,而不是更新的物件
        }
        console.log(this.file)
        id.setAttribute("data-dismiss", "modal")
        this.clear()
      }
    },
    previewFiles() {
      let imgArray = []
      let fileList = Array.prototype.slice.call(this.$refs.files.files)
      this.file = fileList
      fileList.forEach(function(item, index, array){
        // let name = item.name;//檔案名稱
        // let type = item.type;//檔案類型
        // let size = item.size;//檔案大小
        let reader = new FileReader();
        reader.readAsDataURL(item);//轉換成圖片url  
        reader.onload = function(e){
            let fileContent = e.target.result;
            imgArray.push(fileContent)
        }              
      })
      this.content.imgSrc = imgArray
      this.$refs.files.value = ''
    }
  },
  data () {
    return {
      file: [],
      action: '',
      size: ['','S','M','L'],
      content: null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#upload{
  background-color: #EBEBEB;
  color: #757575;
  cursor: pointer;
}
.fa-minus-circle{
  cursor: pointer;
}
#uploadImg,#productDetail{
  overflow:auto;
}
#productDetail{
  max-height:160vh;
}
#uploadImg{
  max-height: calc(160vh - 115px);
}
#uploadImg img{
  padding: 0px 8px 8px 0px;
}
#uploadImg img:nth-child(3n){
  padding-right: 0;
}
@media(max-width: 700px){
  #priceDiv{
    flex-direction: column;
  }
  #priceDiv .input-group{
    margin-bottom: 8px;
  }
  #uploadImg img{
    max-width: 100%;
    padding: 0px 0px 8px 0px;
  }
}
@media(max-width: 940px){
  [name="specificate"]{
    flex-direction: column;
  }
  [name="specificate"] .input-group{
    margin-bottom: 8px;
  }
}
</style>
