var data;
var datalist=["Java","Css","Js","Python","Db"];
var drawData;
var drawTitle;
var editData;
var editTitle;

function placeTool(){
  $(this).clone().appendTo("#draw");
}
$( "#trash" ).droppable({//移置垃圾桶刪除
  accept: ".toolActive",
  over: function( event, ui ) {
    ui.draggable.addClass("small");
  },
  drop: function( event, ui ) {
    ui.draggable.fadeOut(function() {
      var denominator = ui.draggable.parent().children().length - 1;//分母
      if(ui.draggable.find(".done").length == 1){
        var molecular = ui.draggable.parent().parent().find(".complete").length - 1;//分子
      }else{
        var molecular = ui.draggable.parent().parent().find(".complete").length;//分子
      }  
      ui.draggable.parent().parent().find(".life").attr("data-tooltip",molecular+'/'+denominator);
      var percentage = 100-(parseInt(molecular)/parseInt(denominator)*100);
      ui.draggable.parent().parent().find(".lifeVal").animate({
        width: percentage.toString()+"%",
      }, 500 );
      if(parseInt(molecular) == parseInt(denominator)){//得到寶物
        var obj = ui.draggable.parent().parent().find(".game");
        obj.removeClass("upDown");
        ui.draggable.parent().parent().find(".game,.life").addClass("resize");
        setTimeout(function(){
          obj.attr("class","doneAll");
        },1500);
      }
      ui.draggable.remove();
      
    });   
    if(ui.draggable.parent().find(".toolActive").length-1 == 0){
      ui.draggable.parent().parent().remove();
    }else if(ui.draggable.parent().find(".toolActive").length-1 == 1){
      ui.draggable.parent().sortable({
        cancel: ""
      });
    }
  }
});
function checkMove(obj){
  if(obj.children().length == 1){
    $(".scroll").sortable({
       items: ".toolActive",//可排序（移動）的元素
       cursor: "move",
       start: function( event, ui ) {
         ui.item.addClass("small");
         $(".wrap").css("z-index","50");
       },
       stop: function( event, ui ) {
         ui.item.removeClass("small");
         $(".wrap").css("z-index","auto");
       },
       placeholder: "dragPlace"
     });
  }else{
    obj.sortable({
       items: ".arrow",//可排序（移動）的元素
       cancel: ".disable"
     });
  }
}
dialog = $( "#dialog-form" ).dialog({
      autoOpen: false,
      height: 520,
      width: 350,
      modal: true,
      buttons: {
        "Confirm": function(){
         var name = $(this).find('#name').val();
         var type = $(this).find('#type').val();
         var date = $(this).find('#deadlines').val();
         var denominator = $('[name='+type+'scl]').children().length + 1;//分母
         var molecular = $('[name='+type+'scl]').find(".complete").length;//分子
         var obj = $(this).data('obj');
         var types = $("#typeList option").map(function () {
          return this.value.toLowerCase();
         });
         if($.inArray( type.toLowerCase(), types) < 0){
          $('#typeList').append("<option value="+type+">");
         }
         if($("#draw").find('[name='+type+'].typeBlock').length == 0){
          $("#draw").append('<div name='+type+' class="typeBlock draggable" style="background-color: #F8BCA7;opacity: 1;">'
            +'<div class="enemy"><div class="gamename">'+type+'</div><div class="game upDown"></div><div class="life" data-tooltip='+molecular+'/'+denominator+'><span class="lifeVal"></span></div></div>'
            +'<div name='+type+'scl class="scroll" style="background-color: hsl('+Math.random()*361+',25%,80%) ;"></div></div>');  
          obj.clone().attr("name",name).attr("data-date",date).addClass("toolActive").addClass("disable").addClass("show").appendTo('[name='+type+'scl]');
         }else{
            $('[name='+type+'scl]').parent().find(".life").attr("data-tooltip",molecular+'/'+denominator);
            obj.clone().attr("name",name).attr("data-date",date).addClass("toolActive").addClass("arrow").addClass("move").appendTo('[name='+type+'scl]');
            if(parseInt(molecular) != parseInt(denominator)){//復原成小精靈
              var percentage = 100-(parseInt(molecular)/parseInt(denominator)*100);
              $('[name='+type+'scl]').parent().find(".lifeVal").animate({
                width: percentage.toString()+"%",
              }, 500 );
              $('[name='+type+'scl]').parent().find(".doneAll").attr("class","game").addClass("upDown");
              $('[name='+type+'scl]').parent().find(".life").removeClass("resize");
            }
         }  
         checkMove($('[name='+type+'scl]'));  
        if($("#draw").find('.typeBlock').length >5){
          $("#draw").css("height","");
        }
         dialog.dialog( "close" );
        },
        Cancel: function() {
          dialog.dialog( "close" );
        }
      },
      close: function() {
        dialog.find( "form" )[0].reset();
      }
});
$(document).on("dragenter", '.scroll div:nth-child(1)', function() {//警告禁止移動第一個元素
  alertify.error("Can't move the first element, if you haven't remove the remaining elements.");
});
$(document).on("click", '#toolblock [name ="dragtool"]', function() {
  dialog.data('obj', $(this)).dialog( "open" );
});
$(document).on("click", "#save", function() {
  data = $("#draw").html();
  var title = $("#title").val();
  localStorage.setItem("data",data);
  localStorage.setItem("title",title);
  alert("success!");
});
$(document).on("click", "#clear", function() {
  $("#draw").html("");
  $("#title").val("");
  localStorage.removeItem("data");
  localStorage.removeItem("title");
  $("#draw").css("height","900px");
});
$(document).on("click", "#export", function() {//截圖
  $("#menu").click();
  var node = document.getElementById("drawArea");
  $("#help").before("<h1 class='titleName' style='display: inline-block;'>"+$("#title").val()+"</h1>");//解決截圖後字體縮小問題
  $("#title").hide();
	setTimeout(function(){
    domtoimage.toPng(node).then(function (dataUrl) {
      alertify.success("Downloading...");
      var myNode = node;
      var image = new Image();
      image.src = dataUrl;
      var link = document.createElement('a');
      link.download = $("#title").val()+'.jpeg';
      link.href = dataUrl;
      link.click();
      $("header h1").remove();//解決截圖後字體縮小問題
      $("#title").show();
    }).catch(function (error) {
      console.error('oops, something went wrong!', error);
    });
  },300);
//   html2canvas(document.getElementById("draw"), {
//   onrendered: function(canvas) {
//     var image = canvas.toDataURL("image/png",1).replace("image/png", "image/octet-stream"); //結果會是被Base64編碼後的圖片，但是要觸發下載必須先把型態改成octet-stream(用來騙瀏覽器而已，它還是png格式)
//     // window.location.href = image;
//     var link = document.createElement('a');
//     link.download = $("#title").val()+'.jpeg';
//     link.href = image;
//     link.click();
//   },
//     allowTaint: false,
//     logging: true,
//     useCORS: true
// });
});
$('.scroll').sortable({
  items: ".arrow",//可排序（移動）的元素
  cancel: "",
  cursor: "move",
  start: function( event, ui ) {
    ui.item.addClass("small");
  },
  stop: function( event, ui ) {
    ui.item.removeClass("small");
  },
  placeholder: "dragPlace"
});
$( '.draggabled,#draw').sortable();
$( '.draggabled,#draw' ).disableSelection();
$( '.scroll' ).disableSelection();
$(document).on("dblclick", ".gamename", function() {
  var text = $(this).text();
  $(this).text("");
  $(this).append("<input type='text' style='width:100%;' data-val="+text+">");
});
$(document).on("keydown", ".gamename input", function(event) {
  if (event.keyCode == 13) {   //13為 enter 的鍵盤碼
    var text = $(this).attr("data-val");
    if($(this).val() == ""){
      $(this).parent().text(text);
    }else{
      console.log($(this).attr("class"));
      console.log($(this).parent().attr("class"));
      console.log($(this).parent().parent().attr("class"));
      $(this).parent().text($(this).val());
    }

    $(this).remove();
  }
});
$(document).on("dblclick", ".toolActive img", function() {
  var tooltip = $(this).parent().parent().parent().find(".life").attr("data-tooltip");
  var denominator = tooltip.split("/")[1];//分母
  var molecular = tooltip.split("/")[0];//分子
  var percentage = 100-((parseInt(molecular)+1)/parseInt(denominator)*100);
  var obj = $(this).parent().parent().parent().find(".game");
  $(this).toggleClass("complete");
  $(this).parent().append("<span class='done'>DONE</span>");
  $(this).parent().parent().parent().find(".life").attr("data-tooltip",parseInt(molecular)+1+'/'+denominator);
  $(this).parent().parent().parent().find(".lifeVal").animate({
    width: percentage.toString()+"%",
  }, 500 );
  if(parseInt(molecular)+1 == parseInt(denominator)){//得到寶物
    obj.removeClass("upDown");
    $(this).parent().parent().parent().find(".game,.life").addClass("resize");
    setTimeout(function(){
      obj.attr("class","doneAll");
    },1500);
  }
});
$(document).on("dblclick", ".toolActive span", function() {
  var tooltip =  $(this).parent().parent().parent().find(".life").attr("data-tooltip");
  var denominator = tooltip.split("/")[1];//分母
  var molecular = tooltip.split("/")[0];//分子
  var percentage = 100-((parseInt(molecular)-1)/parseInt(denominator)*100);
  $(this).parent().find("img").toggleClass("complete");
  $(this).parent().parent().parent().find(".life").attr("data-tooltip",parseInt(molecular)-1+'/'+denominator);
  $(this).parent().parent().parent().find(".lifeVal").animate({
    width: percentage.toString()+"%",
  }, 500 );
  if(parseInt(molecular)-1 != parseInt(denominator)){//復原成小精靈
    $(this).parent().parent().parent().find(".doneAll").attr("class","game").addClass("upDown");
    $(this).parent().parent().parent().find(".life").removeClass("resize");
  }
  $(this).remove();
});
$(document).on("click", '#menu', function() {
  if($(".skillblock").css("display") == "none"){
      $(".wrap").css("margin-left","20vw");
      $(".wrap").css("width","80vw");
      $(".skillblock").show("slide", { direction: "left" });
  }else{ 
      $(".skillblock").hide("slide", { direction: "left" });
      setTimeout(function(){
        $(".wrap").css("margin-left","0");
        $(".wrap").css("width","100vw");
      },300);
  }
});
$(document).on("click", "#teachBlock a", function() {
  var step = parseInt($(this).attr("name"));
  var next = step+1;
  if(next<6){
    $("#teach").attr("data-step","Step "+next.toString()+" :");
    $("#teachBlock span").css("opacity","0");
    $('span[name='+next.toString()+']').css("opacity","1");
    $("#teach").css({"top":"8%","bottom":"auto"});
    if(next == 5){
      $("#teach").css({"top":"auto","bottom":"8%"});
      $(this).attr("href","#teach");
      $(".typeBlock:nth-child(3)").removeClass("show");
      $("footer").addClass("show").css("animation-delay","0ms");
    }else if(next == 2){
      $(".skillblock").removeClass("show");
      $("#title").addClass("show").css("animation-delay","0ms");
      $(".typeBlock:nth-child(3)").addClass("show").css("animation-delay","0ms"); 
    }else if(next == 3){
      $("#title").removeClass("show");
      $(".skillblock").addClass("show").css("animation-delay","0ms");
      $(".skillblock .tool:nth-child(n+2)").css("opacity","0.2");
    }else if(next == 4){
      $(this).attr("href","#teach");
      $(".skillblock .tool:nth-child(n+2)").css("opacity","1");
      $(".skillblock").removeClass("show");
      $('[name="OOCSS"] img').dblclick();
    }
    $(this).attr("name",next.toString());
  }else{
    if($("#checkShow").prop("checked")){
      localStorage.setItem("default",true);
    }else{
      localStorage.removeItem("default");
    }
    $("footer").removeClass("show");
    $(this).attr("href","#");
    $(this).parent().parent().hide();
    $("#draw").html(editData);
    $("#title").val(editTitle);
    $(".skillblock,#menu,#help,#title,.typeBlock,footer").css("opacity","1");
    $("#title").focus();//=autofocus
  }
});
$("#help").click(function(){
  editData = $("#draw").html();
  editTitle = $("#title").val();
  $("#clear").click();
  $("#draw").html(drawData);
  $("#title").val(drawTitle);
  $(".skillblock,#menu,#help,#title,.typeBlock,footer").css("opacity","0.2");
  $(".skillblock").addClass("show");
  $('#teach').css("animation-delay","800ms").addClass("show").show();
  $("#teachBlock span,#teachBlock,#teachCat").show();
  $("#teachBlock a").attr("name","0").click();
  for(var i=0;i<$(".typeBlock").length;i++){
    checkMove($(".typeBlock").eq(i).find('.scroll'));  
  }
});
$( function() {
  drawTitle = "Ann's Front-End Road Map";
  drawData = $("#draw").html();
  $("#clear").click();
  for (var i=0; i<datalist.length; i++) {
    $('#typeList').append("<option value="+datalist[i]+">");
  }
  $("#teachBlock span,#teachBlock,#teachCat").hide();
  if(localStorage.getItem("default") == null){
    $("#help").click();
  }
  data = localStorage.getItem("data");
  var title = localStorage.getItem("title");
  if(data != null){
    $("#draw").html(data);
    $("#title").val(title);
  }
});