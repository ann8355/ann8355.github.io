<template>
  <div id="content" class="container-fluid px-5" style="margin-top: 90px;">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Content'
}
</script>

<style>
  body{
    background-color: #F2F2F2;
    font-size: 16px;
  }
  button{
    cursor:pointer;
    background-color:transparent;
    border-style: none;
    outline:none!important; /*點擊時的藍色邊框*/
  }
  .dropdown-item:hover, .dropdown-item.active{
    background-color: #000000;
    color: #fff;
  }
  tbody tr:hover{
    background-color: #ffffe6!important;
  }
  i{
   font-family: fontawesome;
  }
  thead th{
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    z-index: 10;
  }
</style>
