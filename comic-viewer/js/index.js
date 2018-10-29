var classMap = new Map();
var countAd = 1;
var finished = false;//圖片是否載入完成
var photoArray_block=[];
var series=[{
"name":"Pusheen",
"author":"Claire Belton",
"status":"Hot",
"blog":"www.pusheen.com",
"rate":5,
"summary":"Pusheen the cat Created by	Claire Belton and Andrew Duff Pusheen is a cartoon cat who is the subject of comic strips and sticker sets on Facebook. Pusheen was created in 2010 by Claire Belton and Andrew Duff for a comic strip on their website, Everyday Cute.",
"img":"https://vetstreet-brightspot.s3.amazonaws.com/66/30/1ae15d924ebd96176b8de4349ac6/pusheen-the-cat-335kgs8312.jpg"
},{
"name":"Disney",
"author":"Walter Elias Disney",
"status":"Ongoing",
"blog":"disneyanimation.tumblr.com",
"rate":3,
"summary":"Walter Elias Disney was an American entrepreneur, animator, voice actor and film producer. A pioneer of the American animation industry, he introduced several developments in the production of cartoons.",
"img":"https://s.aolcdn.com/hss/storage/midas/39aa47a6eba35ff3f1ddbae8a5bf2437/205551446/dims-1.jpg"
},{
"name":"Marvel",
"author":"Martin Goodman",
"status":"New",
"blog":"imagethecomicbookgeek.tumblr.com",
"rate":2,
"summary":"Marvel Comics is the common name and primary imprint of Marvel Worldwide Inc., formerly Marvel Publishing, Inc. and Marvel Comics Group, a publisher of American comic books and related media. In 2009, The Walt Disney Company acquired Marvel Entertainment, Marvel Worldwide's parent company.",
"img":"https://81f2fc6b5238972cb92a-395fccf71f85d2309bd8bf244c06b9bc.ssl.cf5.rackcdn.com/p/eabab9e3-0133-46fc-9b08-632bb6c1b1ae.jpg"
}];

function insertPhoto(num){
    var count = num*4;
    for(var i=(num*4);i<(num*4)+4;i++){
      var img = new Image();
      img.onload = function(){
        count++;
        if(count == (num*4)+4){
          isFinish(".modal-body");
        }
      }
      $("#box"+(i-((num*4)-1)).toString()).css("background-image","url("+photoArray_block[i]+")");
      img.src = photoArray_block[i];
    }
}
function loadPhoto(blog){
  var photoArray=[];
  photoArray_block.length=0;
  var apiKey = "71MMwd3Pe6fzZNk67UJKJ6mav2RzHHIKQxrMwHWtxaVitGXTrN";
  var url =
"https://api.tumblr.com/v2/blog/"+blog+"/posts?api_key="+apiKey +"&type=photo" +"&limit=40";
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'jsonp',
    crossDomain: true,
    success: function (data, textStatus, xhr) {
      var rs = data.response.posts;
      photoArray = rs.map(function(obj){
        //if(obj.photos[0].original_size.width == obj.photos[0].original_size.height){
          return obj.photos[0].original_size.url;
       // }
      });
      for(x in photoArray){
        if(photoArray[x] != undefined){
          photoArray_block.push(photoArray[x]);
        }
      }
      generateClass("1");
    },
    error: function (xhr, textStatus, errorThrown) {
      console.error(errorThrown);
    }
  });
}
setInterval(function changeAd(){
  if(countAd < 4){
    var img = new Image();
    img.onload = function(){
      $('.ad').css("background-image","url("+img.src+")");
      countAd += 1;
      finished = true;
    }
    img.src = "https://hexschool.github.io/THE_F2E_Design/week5-comic%20viewer/assets/ad-"+countAd.toString()+".png";
  }else{
    countAd = 1;
  }
} , 3000 );
function isFinish(ele){
  if(finished == true){
    $(ele+" .wrapper").css("opacity","1");
    $(ele).find(".loading").remove();
  }else{
    setTimeout("isFinish('" + ele + "')",500);
  }
}
$("#homeitem h5").click(function(){
  $("#home .wrapper").css("opacity","0").before('<div class="loading"><img src="img/loading.gif"></div>');
   var obj = series[$(this).index()];
   blog = obj.blog;
   loadPhoto(blog);
   $("#name,#modalTitle,#productSelect option:selected").text(obj.name);
   $("#author").text(obj.author);
   $("#summary").text(obj.summary);
   $("#status").text(obj.status);
   var img = new Image();
    img.onload = function(){
      $("#homephoto").css("background-image","url("+img.src+")");
      isFinish("#home");
    }
    img.src = obj.img;
   $("#rate i").attr("class","fa fa-star-o");
   $("#rate i:lt("+(obj.rate).toString()+")").attr("class","fa fa-star");
}); 
function plusPage(){
  var location = $('#scrollBox').scrollLeft();
  $('#scrollBox').scrollLeft(location+100); 
  var num = Math.ceil((location/100))+1;
  if(num<10){//頁數預設為10
    $('#scrollBox li').removeClass("pageHover");
    $('#scrollBox li').eq(num).addClass("pageHover");
    generateClass((num+1));
  }
}
function minusPage(){
  var location = $('#scrollBox').scrollLeft();
  $('#scrollBox').scrollLeft(location-100); 
  var num = Math.ceil((location/100))-1;
  if(num >= 0){//頁數預設為10
    $('#scrollBox li').removeClass("pageHover");
    $('#scrollBox li').eq(num).addClass("pageHover");
    generateClass((num+1));
  }
}
$("#pageSelect").change(function() {
  var page = $("#pageSelect option:selected").val();
  $('#scrollBox').scrollLeft(page*100 -100 );
  generateClass(page);
});
$("#productSelect").change(function() {
   $('#scrollBox').scrollLeft(0); 
   $('#scrollBox li').removeClass("pageHover");
   $('#scrollBox li').eq(0).addClass("pageHover");//頁碼倒回第一頁
   blog = $("#productSelect option:selected").val();
   loadPhoto(blog);
});
$("#scrollBox").scroll(function() {
  var location = $('#scrollBox').scrollLeft();
  $('#scrollBox li').removeClass("pageHover").css("filter","blur(1px)");
  var page = Math.ceil((location/100));
  $('#scrollBox li').eq(page).addClass("pageHover").css("filter","none");
  generateClass(page+1);
});
$("#moon").click(function(event) {
  $("header,.modal-header").removeClass("dark-bg").addClass("light-bg");
  $("footer,.modal-footer").removeClass("light-bg").addClass("dark-bg");
  $("#logo,.modal-title").removeClass("light-logo").addClass("dark-logo");
  $(".modal-body").css({"color":"white","background-color":"rgba(0,0,0,0.9)"});
  $("#lightStatus").css("border-color","white");
  $(".lightbox").css("margin-left","0%");
  var dark = $("#logo").css("color");
  $(".modal-body a,#prev,#next").hover(function() {
    $(this).css("background-color",dark);
    $(this).find('a').css("display","block");
  }, function() {
    $(this).css("background-color","transparent");
    $(this).find('a').css("display","none");
  });
});

$("#sun").click(function(event) {
  $("header,.modal-header").removeClass("light-bg").addClass("dark-bg");
  $("footer,.modal-footer").removeClass("dark-bg").addClass("light-bg");
  $("#logo,.modal-title").removeClass("dark-logo").addClass("light-logo");
  $(".modal-body").css({"color":"black","background-color":"rgba(0,0,0,0.1)"});
  $("#lightStatus").css("border-color","black");
  $(".lightbox").css("margin-left","50%");
  var dark = $("#logo").css("color");
  $(".modal-body a,#prev,#next").hover(function() {
    $(this).css("background-color",dark);
    $(this).find('a').css("display","block");
  }, function() {
    $(this).css("background-color","transparent");
    $(this).find('a').css("display","none");
  });
});

$("#bg-minus").click(function(event) {
  var opacityValue = parseFloat($(".modal-body").css('background-color').split(',')[3].replace(')', ''));
  if((opacityValue+0.1) <1.0){
    var val = (opacityValue+0.1).toString();
    $(".modal-body").css('background-color',"rgba(0,0,0,"+val+")");
  }else{
    $("#moon").click();
  }
});

$("#bg-plus").click(function(event) {
  var opacityValue = parseFloat($(".modal-body").css('background-color').split(',')[3].replace(')', ''));
  if((opacityValue-0.1) >0.0){
    var val = (opacityValue-0.1).toString();
    $(".modal-body").css('background-color',"rgba(0,0,0,"+val+")");
  }else{
    $("#sun").click();
  }
});
function generateClass(val){
  $('#pageSelect option').attr("selected",false).filter('[value="'+val.toString()+'"]').attr("selected",true);
  $(".modal-body .wrapper").css("opacity","0").before('<div class="loading"><img src="img/loading.gif"></div>');
  insertPhoto(val-1);
  var classarray = classMap.get(val.toString());
  for (x in classarray){
    var classname = classarray[x].split("_")[1];
    var id = classarray[x].split("_")[0];
    $(id).attr("class",classname);
  }
}
$(function(){
  classMap.set("1",["#photoblock_d-flex flex-column-reverse","#trapezoidal_mb-4 d-flex rotate","#photobox_my-4","#box1_block","#box2_d-none"]);
  classMap.set("2",["#photoblock_","#trapezoidal_my-4 d-flex","#photobox_mb-4","#box1_block","#box2_d-none"]);
  classMap.set("3",["#photoblock_","#trapezoidal_my-4 d-flex rotate","#photobox_mb-4","#box1_block","#box2_d-none"]);
  classMap.set("4",["#photoblock_d-flex flex-column-reverse","#trapezoidal_mb-4 d-flex","#photobox_my-4","#box1_block","#box2_d-none"]);
  classMap.set("5",["#photoblock_d-flex flex-column-reverse","#trapezoidal_mb-4 d-flex rotate","#photobox_my-4 d-flex justify-content-between","#box1_two-block","#box2_two-block"]);
  classMap.set("6",["#photoblock_","#trapezoidal_my-4 d-flex","#photobox_mb-4 d-flex justify-content-between","#box1_two-block","#box2_two-block"]);
  classMap.set("7",["#photoblock_","#trapezoidal_my-4 d-flex rotate","#photobox_mb-4 d-flex justify-content-between","#box1_two-block","#box2_two-block"]);
  classMap.set("8",["#photoblock_d-flex flex-column-reverse","#trapezoidal_mb-4 d-flex","#photobox_my-4 d-flex justify-content-between","#box1_two-block","#box2_two-block"]);
  classMap.set("9",["#photoblock_d-flex flex-column-reverse","#trapezoidal_mb-4 d-flex rotate","#photobox_my-4","#box1_block","#box2_d-none"]);
  classMap.set("10",["#photoblock_","#trapezoidal_my-4 d-flex","#photobox_mb-4","#box1_block","#box2_d-none"]);
  $("#homeitem h5:nth-child(1)").click();
  $("#sun").click();
});