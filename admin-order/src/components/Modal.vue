<template>
<div class="modal fade" id="CreateModal" role="dialog">
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
                  <input ref="files" @change="previewFiles" multiple class="d-none" type="file" accept="image/*" required>
                  <div id="uploadImg" class="d-flex flex-wrap mt-3">
                    <!-- <img height="126" class="col-4" src="https://images.unsplash.com/photo-1536007164800-b7f11331f35c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2fea553f92753fc4768ec28d8c619968&auto=format&fit=crop&w=1050&q=80" alt="img"> -->
                  </div>
                </div>
                <div id="productDetail" class="col">
                  <h6>Product Name</h6>
                  <input type="text" class="form-control mb-2" v-model="productName" placeholder="Enter Name" required>
                  <h6>Product Discription</h6>
                  <textarea class="form-control mb-2" v-model="proDiscript" rows="5" placeholder="Enter Discription" required></textarea>
                  <h6>Price</h6>
                  <div id="priceDiv" class="d-flex mb-2">
                    <div class="input-group mr-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Original</span>
                      </div>
                      <input type="number" class="form-control" required v-model.number="original">
                    </div>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Discount</span>
                      </div>
                      <input type="number" class="form-control" v-model.number="discount" required>
                    </div>
                  </div>
                  <h6>Specification</h6>
                  <div v-for="(item,index) in specificates" :key="item.id" name="specificate" class="d-flex my-2">
                    <span v-on:click="minusSpecificate(index)"><i class="fas fa-minus-circle mt-2 mr-1"></i></span>
                    <div class="input-group mr-2">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Size</span>
                      </div>
                      <select class="custom-select" v-model="item.sizeSelected" required>
                        <option v-for="(item2) in item.size" :key="item2.id" v-bind:value="item2">{{item2}}</option>
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
                <button type="submit" ref="saveDraft" v-on:click="save('saveDraft')" class="btn btn-light">SAVE DRAFT</button>
                <button type="submit" ref="publish" v-on:click="save('publish')" class="btn btn-secondary">PUBLISH</button>
            </div>
          </form>
        </div>
    </div>
</div>
</template>
<script>
export default {
  name: 'Modal',
  strict: true,
  computed: {
    discount: {
      get () {
        this.discounts = Math.round(this.original*0.8)
        return Math.round(this.original*0.8)
      },
      set (value) {
        this.discounts = value
      }
    }
  },
  methods: {
    addSpecificate() {
      let obj =  {
          size: ['','S','M','L'],
          sizeSelected: '',
          color: '',
          inventory: null
      }
      this.specificates.push(obj)
    },
    minusSpecificate(index) {
      this.specificates.splice(index, 1)
    },
    clear(){
      this.productName = ''
      this.proDiscript = ''
      this.original = null
      this.discounts = null
      this.file = []
      this.status = null
      this.specificates = [
        {
          size: ['','S','M','L'],
          sizeSelected: '',
          color: '',
          inventory: null
        },
        {
          size: ['','S','M','L'],
          sizeSelected: '',
          color: '',
          inventory: null
        }
      ]
    },
    save(name) {
      let id;
      if(name == 'saveDraft'){
        id = this.$refs.saveDraft
        this.status = ['btn-secondary','Unpublished','2']
      }else if(name == 'publish'){
        id = this.$refs.publish
        this.status = ['btn-success', 'Published','1']
      }
      id.removeAttribute("data-dismiss")
      if (this.$refs.productForm.checkValidity()) {
        console.log(this.productName)
        console.log(this.proDiscript)
        console.log(this.original)
        console.log(this.discounts)
        console.log(this.specificates)
        console.log(this.status)
        console.log(this.file)
        id.setAttribute("data-dismiss", "modal")
      }
      this.clear()
    },
    previewFiles() {
      this.file = this.$refs.files.files
    }
  },
  data () {
    return {
      productName: '',
      proDiscript: '',
      original: null,
      discounts: null,
      file: [],
      status: null,
      specificates: [
        {
          size: ['','S','M','L'],
          sizeSelected: '',
          color: '',
          inventory: null
        },
        {
          size: ['','S','M','L'],
          sizeSelected: '',
          color: '',
          inventory: null
        }
      ]
    }
  }
}
// $('#file').change(function(event) {
//   fileArray.length = 0;
//   $("#profile").html("");
//   var files = document.getElementById('file').files;
//  // fileArray = Array.prototype.slice.call(files);//無法直接刪除files,須先複製一份array
//   if(files.length >3){
//     $("#warnpic").removeClass("d-none");
//     $("#warnpic span").text("EXEED 3 PHOTOS");
//     $('#file').val("");
//     $("#picBtn").attr("disabled",true);
//   }else{
//     $("#picBtn").attr("disabled",true);
//     $("#warnpic").addClass("d-none");
//     for (var i = 0; i < files.length; i++){
//       var index = 0;
//       var file = files[i];
//       var name = file.name;//檔案名稱
//       var type = file.type;//檔案類型
//       var size = file.size;//檔案大小
//       var reader = new FileReader();
//       reader.readAsDataURL(file);//轉換成圖片url
//       // reader.readAsText(file,"UTF-8");//轉換成檔案內容文字,預設編碼是UTF-8(word需存成txt檔)
//       reader.onload = function(e){
//         var fileContent = e.target.result;
//         var image = new Image();      
//         image.onload=function(){//要在 image.src = 之前cached
//           var width = image.width;
//           var height = image.height;
//           if(width >800 || height>800){
//             $("#warnpic").removeClass("d-none");
//             $("#warnpic span").text(name).append("<p>IS OVER THE MAXIMUM SIZE</p>");
//             // $("#warnpic span").text("ONE FILE IS OVER THE MAXIMUM SIZE");
//           }else{
//             fileArray.push(file);
//             $("#profile").append('<div class="col-4 mr-3 mb-4" data-index='+index+' style="background-image:url('+fileContent+');"></div>');
//             index++;
//             $("#picBtn").attr("disabled",false);
//           }
//         }; 
//         image.src= fileContent;  
//       };
//     }
//   }
// });
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
