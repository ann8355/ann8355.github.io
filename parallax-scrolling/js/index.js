// var circle = document.querySelector('#circle');
// // Chrome, Safari 和 Opera 代码
// circle.addEventListener("webkitAnimationEnd", function(){

// }); //动画结束时事件
// circle.addEventListener("animationend", function(){

// });
function showQes2(){
  $("#div_block_2").fadeOut(function() {
    $("#div_block_22").css("left","30vw").fadeIn(800);
    $(".div_block_1 .rightBlock").removeClass("rightDir").addClass("leftDir").css("animation-delay","800ms");
  });
}
function showQes3(){
   $("#div_block_22").fadeOut(function() {
    $("#div_block_23 h1").css("color","black");
    $("#div_block_23").css({
      "background-color":"#FF3C82",
      "left":"-40vw"}).show().animate({left: '0'}, {duration: 800});
    $(".div_block_1 .rightBlock").removeClass("leftDir").addClass("rightDir").css("animation-delay","800ms");
  });
}
function showQes4(){
  $(".div_block_1,#div_block_23").fadeOut( "slow", function() {
    $(".div_block_3").show().animate({right: '0'}, {duration: 1000});
  });
}
$(document).on('click', '[name="qry_1"]', function(event){
  showQes2();
});
$(document).on('click', '[name="qry_2"]', function(event){
  showQes3();
});
$(document).on('click', '[name="qry_3"]', function(event){
  showQes4();
});
var timer;

$(window).scroll(function(){
  window.clearTimeout(timer); 
  timer = window.setTimeout(function() {//避免重複執行
    var last=$("body").height()-$(window).height()
    if($(window).scrollTop()>=last){//滑動至底時執行
      if($("#div_block_2").css("opacity") != "0"){
         showQes2();
      }else if($("#div_block_22").css("display") != "none"){
         showQes3();    
      }else if($("#div_block_23").css("display") != "none"){        
         showQes4();
      }
      document.body.scrollIntoView(); //＝scrollTop(0)
    }
    else if($(window).scrollTop() ==0){//滑動至頂時執行
      if($(".div_block_3").css("display") != "none"){
          
      }else if($("#div_block_23").css("display") != "none"){        
         
      } 
    }
  }, 100);
});
$(function(){
  // $("body").animate({opacity: '1'}, {duration: 1000});
});