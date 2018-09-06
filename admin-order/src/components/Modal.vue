<template>
<div class="modal fade" id="CreateModal" role="dialog">
    <div class="modal-dialog" style="max-width: 90vw;">
        <div class="modal-content shadow">
            <div class="modal-header text-white bg-dark px-4">
                <h4 class="modal-title">ADD NEW PRODUCT</h4>
                <button type="button" class="close text-white" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body d-flex pt-4 px-4">
                <div class="col">
                  <div id="upload" class="d-flex flex-column justify-content-center align-items-center" style="height:115px;">
                    <i class="fas fa-cloud-upload-alt fa-3x mb-2"></i>
                    <h6>Drag an image or click here to upload…</h6>
                  </div>
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
                      <input type="text" class="form-control" required v-model="original">
                    </div>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Discount</span>
                      </div>
                      <input type="text" class="form-control" v-model="discount" required>
                    </div>
                  </div>
                  <h6>Specification</h6>
                  <div v-for="(item,index) in specificates" :key="item.id" name="specificate" class="d-flex my-2">
                    <span v-on:click="minusSpecificate(index)"><i class="fas fa-minus-circle mt-2 mr-1"></i></span>
                    <div class="input-group mr-2">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Size</span>
                      </div>
                      <select class="custom-select" v-model="item.sizeSelected">
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
                      <input type="text" class="form-control" v-model="item.inventory" required>
                    </div>
                  </div>
                  <button type="button" v-on:click="addSpecificate()" class="btn btn-secondary btn-block mt-3" >ADD NEW SPECIFICATION<i class="fa fa-plus ml-2"></i></button>
              </div>
            </div>
            <div class="modal-footer pb-4" style="padding-right:39px;">
                <button type="submit" v-on:click="save()" class="btn btn-light">SAVE DRAFT</button>
                <button type="button" v-on:click="publish()" class="btn btn-secondary" >PUBLISH</button>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
  name: 'Modal',
  strict: true,
  methods: {
    addSpecificate() {
        const obj = {
            size: ['Choose Size','S','M','L'],
            sizeSelected: 'Choose Size',
            color: '',
            inventory: ''
        }
        this.specificates.push(obj)
    },
    minusSpecificate(index) {
        this.specificates.splice(index, 1)
    }
  },
  data () {
    return {
      productName: '',
      proDiscript: '',
      original: '',
      discount: '',
      specificates: [
          {
              size: ['Choose Size','S','M','L'],
              sizeSelected: 'Choose Size',
              color: '',
              inventory: ''
          },
          {
              size: ['Choose Size','S','M','L'],
              sizeSelected: 'Choose Size',
              color: '',
              inventory: ''
          }
      ]
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
