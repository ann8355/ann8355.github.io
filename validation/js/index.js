var fileArray=[];
var count = 1;
// function customValidity(id){
//   if($(id).val().length == 0){
//     $(id).next().attr("data-tooltip","NOT NULL");//必填資訊
//   }else{
//     var require = $(id).next().attr("data-require");
//     $(id).next().attr("data-tooltip",require); 
//   }
// } 
$("#cvv").on('input', function(){
  if($("#cvv").val().length > 3 || ($("#cvv").val().length < 3 && $("#cvv").val().length > 0)){ 
    document.getElementById("cvv").setCustomValidity('invalid');
  }else{
    document.getElementById("cvv").setCustomValidity('');//通過驗證
  }
});
$(document).on('input', 'input', function(){
  //customValidity($(this));
  if($(this).val() != ""){
    $(this).removeClass("required");
  }else if($(this).next().next().attr("data-require") == "required"){
    $(this).addClass("required");
  }
  if($("#password").val() != $("#comfirmPwd").val()){ 
    document.getElementById("comfirmPwd").setCustomValidity('invalid');
  }else{
    document.getElementById("comfirmPwd").setCustomValidity('');//通過驗證
  }
  if($(this).parent().parent().parent()[0].checkValidity() && !$(this).parent().parent().parent().find("input").hasClass("required")){ 
    $(this).parent().parent().parent().find('[type="button"]').attr("disabled",false);
  }else{
    $(this).parent().parent().parent().find('[type="button"]').attr("disabled",true);
  }
});
$(document).on('click', '#profile div', function(event){
  $(this).remove();
  delete fileArray[parseInt($(this).attr("data-index"))];
});
function changePage(){
  TweenMax.killAll();// 刪掉所有正在執行的TweenMax動畫
  TweenMax.set("#progressbar i", {scale: 1}); // 並還原回原本的狀態(避免上下頁未執行完動畫的bug)
  $("#form1,#form2,#form3,#form4,#form5").css("height","0"); 
  $("#progressbar i:gt("+(count-1)+")").attr("class","fa fa-circle-o"); 
  $("#progressbar li:gt("+(count-1)+")").removeClass("active");
  $("#progressbar i").eq(count-1).attr("class","fa fa-dot-circle-o");
  if(count > 1){
    TweenMax.to("#progressbar i:eq("+(count-2)+")", 0.6, {scaleX:"2",scaleY:"2",ease: Bounce.easeOut,
    onComplete: function() {
      $("#progressbar i").eq(count-2).attr("class","fa fa-check-circle");
      $("#progressbar li").eq(count-1).addClass("active"); 
      TweenMax.to("#progressbar i:eq("+(count-2)+")", 0.6, {scaleX:"1",scaleY:"1"});
    }});
  }
  for(var i=1; i<6; i++){
    if(count == 5){
      $("#form5").css("height","400px"); 
      TweenMax.to("#form5 h1", 2.8, {text:"Congratulations",delay:0.5,
      onComplete: function() {
        var number = {seconds: 5};
        TweenMax.to("#form5 h4,#smile,#direct", 0.8, {opacity:1});
        var tl = new TimelineMax({repeat:5});
        tl.to("#smile", 0.6, {y: -50, ease: Power4.easeOut});
        tl.to("#smile", 0.4, {y: 0, ease: SteppedEase.config(12)});
        TweenMax.to(number, 5, {seconds: 0,
          ease: Power0.easeNone,
          onUpdate: function() {
            $("#direct span").html(Math.ceil(number.seconds));
          },
          onComplete: function() {
            //導回起始頁並清空資料
            count = 1;
            location.reload();
            // $("#profile").html("");
            // $("form input").val("");
          }
        });        
      }});
    }else if(count == i){
      TweenMax.to("#form"+i.toString(), 1.5, {height:"650px", ease: Power2.easeOut,delay:1});
    }
  }
}
$(document).on('click', '[type="button"]', function(event){
  if(count == 4){
    // submit至後端
    // $('form').submit();
    console.log("送出成功!");
  }
  count++;
  location.hash = count;
  changePage();
});
$(document).on('click', '#brand', function(event){
  if($(this).hasClass("fa-cc-visa")){
    $(this).removeClass("fa-cc-visa").addClass("fa-cc-mastercard");
    $("#cardnumber").attr("pattern","^(5[1-5][0-9]{14})*$");
  }else{
    $(this).removeClass("fa-cc-mastercard").addClass("fa-cc-visa");
    $("#cardnumber").attr("pattern","^(4[0-9]{12}(?:[0-9]{3})?)*$");
  }
});
$("#photo").click(function(event) {
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    $('[type="file"]').click();
  }else{
    alert('The File APIs are not fully supported in this browser.');
  }	
});
$("#twzipcode").on('change', function(){
  var val = $(this).find("option:selected").text();
  $("#adrsdetail").val(val);
});

//指令碼輸入框自動依每4字元分割
// $('#cardnumber').keyup(function() {
//     var val = $(this).val();
//     val = val.replace(/\s+/g,"");//去掉所有空白
//     val = val.replace(/(\w{4})/g, "$1 ");//每4個字元空一格
//     if(val.substring(val.length-1, val.length) == " "){
//     	$(this).val( val.substring(0, val.length-1) );
//     }else{
//     	$(this).val( val );
//     }
// });	
$("#twzipcode").twzipcode({
  zipcodeIntoDistrict: true, // 郵遞區號自動顯示在地區
  css: ["col-6 form-control", "col-6 form-control"], // 自訂 "城市"、"地區" class 名稱 
  countyName: "city", // 自訂城市 select 標籤的 name 值
  districtName: "town" // 自訂地區 select 標籤的 name 值
});
$('#file').change(function(event) {
  fileArray.length = 0;
  $("#profile").html("");
  var files = document.getElementById('file').files;
 // fileArray = Array.prototype.slice.call(files);//無法直接刪除files,須先複製一份array
  if(files.length >3){
    $("#warnpic").removeClass("d-none");
    $("#warnpic span").text("EXEED 3 PHOTOS");
    $('#file').val("");
    $("#picBtn").attr("disabled",true);
  }else{
    $("#picBtn").attr("disabled",true);
    $("#warnpic").addClass("d-none");
    for (var i = 0; i < files.length; i++){
      var index = 0;
      var file = files[i];
      var name = file.name;//檔案名稱
      var type = file.type;//檔案類型
      var size = file.size;//檔案大小
      var reader = new FileReader();
      reader.readAsDataURL(file);//轉換成圖片url
      // reader.readAsText(file,"UTF-8");//轉換成檔案內容文字,預設編碼是UTF-8(word需存成txt檔)
      reader.onload = function(e){
        var fileContent = e.target.result;
        var image = new Image();      
        image.onload=function(){//要在 image.src = 之前cached
          var width = image.width;
          var height = image.height;
          if(width >800 || height>800){
            $("#warnpic").removeClass("d-none");
            $("#warnpic span").text(name).append("<p>IS OVER THE MAXIMUM SIZE</p>");
            // $("#warnpic span").text("ONE FILE IS OVER THE MAXIMUM SIZE");
          }else{
            fileArray.push(file);
            $("#profile").append('<div class="col-4 mr-3 mb-4" data-index='+index+' style="background-image:url('+fileContent+');"></div>');
            index++;
            $("#picBtn").attr("disabled",false);
          }
        }; 
        image.src= fileContent;  
      };
    }
  }
});
$('#picBtn').click(function(event) {
  //ajax上傳圖片
  // $.each(fileArray, function( index, value ) {
  //   if(value != null){
  //     console.log(value);
  //   }
  // });
});
// 改變router位置
function checkLocation(){
  console.log(location.hash)
  count = location.hash.replace("#","");
  changePage();
}
window.onpopstate = function() {
  checkLocation();
};
$(function(){
  location.hash = count;
  changePage();
});