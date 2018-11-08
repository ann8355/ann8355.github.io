var categoryArray = new Array();
var place = "";
var search = "";
var categoryMap = new Map();
var storeMap = new Map();//儲存被省略的...資料
var dataArray = [];//搜尋結果的資料陣列（篩選後）
var totalArray = [];//搜尋結果的資料陣列
var num = 10;//一頁幾筆資料
var windowArray = [];//儲存map的infowindow

function loadJsonTOption(url,selector,option){
  $.getJSON(
  url,
  function(data) {
  	$.each(data, function(i,item){
  		selector.append("<option value='"+item.value+"'>"+item.text+"</option>");
      categoryMap.set(item.value, item.text);
  	});
    selector.fastselect({
      onItemSelect: function(i,item) {
        if(option == "single"){
          place = item.value;
        }else{
          categoryArray.push(item.value);
        }
      } 
    });
  }
);
}
$(document).on('click', '.fstChoiceRemove', function(event){
  var value = $(this).parent().attr("data-value");
  var index = categoryArray.indexOf(value);
  categoryArray.splice(index, 1); 
});
//超過的多行文字以...取代
function overFlowText(name,description,len,selector){
    var rs;
    if(description.length>len){// 超過50個字以"..."取代
      var text = `${description.substring(0,len-1)}.....`;
      rs = text;
    }else{
      rs = description;
    }
    var obj = {
      shortData: null,
      totalData: null
    };
    var shortArray = [];
    var totalArray = [];
    if(storeMap.get(name) != null){
      obj = storeMap.get(name);
      shortArray = obj.shortData;
      totalArray = obj.totalData;
    }
    shortArray.push(rs);
    totalArray.push(description);
    obj.shortData = shortArray;
    obj.totalData = totalArray;
    storeMap.set(name,obj);
    return rs;
}
//點擊資料區塊會放大展開
$(document).on('click', 'article', function(event){
  var obj = storeMap.get($(this).find("h2").text());
  if($(this).find(".imgDiv").hasClass("resize")){
    $(this).find(".content,.imgDiv").removeClass("resize");
    $(this).find(".content p").text(obj.shortData[0]);
    $(this).find(".content .fa-calendar").next().text(obj.shortData[1]);
  }else{
    $(this).find(".content,.imgDiv").addClass("resize");
    $(this).find(".content p").text(obj.totalData[0]);
    $(this).find(".content .fa-calendar").next().text(obj.totalData[1]);
  }
});
function creatTag(data){
  if(data != null && data != undefined && data != ""){
   var width = (categoryMap.get(data).length+2).toString() +"em";
   var css = "width:"+width;
   return  `<span class='tag' style=${css}>${categoryMap.get(data)}</span>`;    
  }else{
    return "";
  }
}
function isFree(data){
  if(data != null && data != undefined && data != ""){
    return `(${data})`;
  }else{
    return "";
  }
}
function loadArticleTemp(item){
  var length;
  if($('button[name="plus"]').css("display") != "none"){//為手機的螢幕寬
    length = 26;
  }else{
    length = 74;
  }
    var temp = 
    `<article>
      <div class="imgDiv" style="background-image:url(${item.Picture1});"></div>
      <div class="content">
        <h2 style="margin:12px 0px;" class="headColor">${item.Name}</h2>
        <p style="text-indent:2em;margin:0;">${overFlowText(item.Name,item.Description,length,$(".content p"))}</p>
        <h4 style="margin:8px 0px;">
          <i class="fa fa-location-arrow fa-lg"></i>${item.Zone}
          ${creatTag(item.Class1)}${creatTag(item.Class2)}
        </h4>
        <div class="detailInfo"><i class="fa fa-phone fa-lg"></i>${item.Tel}</div>      
        <div class="detailInfo"><i class="fa fa-home fa-lg"></i>${item.Add}</div>
        <div class="detailInfo"><i class="fa fa-calendar fa-lg"></i>  <span>${overFlowText(item.Name,item.Opentime+isFree(item.Ticketinfo),46,$(".detailInfo").eq(2))}</span></div>
      </div>
    </article>`;
  return temp;
}
$(document).on('click', 'button[name="plus"]', function(event){
  $(this).attr("name","minus");
  if($(this).parent().text().trim() == "Date"){
    $("#fromDate,#toDate").hide();
  }else{
    $(this).parent().next().hide();
  }
  $(this).parent().parent().css("padding-bottom",0);
  $(this).find('i').removeClass('fa-plus').addClass('fa-minus');
});
$(document).on('click', 'button[name="minus"]', function(event){
  $(this).attr("name","plus");
  if($(this).parent().text().trim() == "Date"){
    $("#fromDate,#toDate").show();
  }else{
    $(this).parent().next().show();
  }
  $(this).parent().parent().css("padding-bottom",20);
  $(this).find('i').removeClass('fa-minus').addClass('fa-plus');
});
$(document).on('click', 'button[name="pageBtn"]', function(event){
  var page = $(this).val();
  getPageData(page);
});
$(document).on('click', '#pageStart', function(event){
  var page = $('.pageChange').val();
  getPageData(Number(page)-1);
});
$(document).on('click', '#pageEnd', function(event){
  var page = $('.pageChange').val();
  getPageData(Number(page)+1);
});
function getPageData(pageNum){//取得第幾頁的資料
  if(pageNum > 0 && pageNum < $('button[name="pageBtn"]').length+1){
    $('button[name="pageBtn"]').removeClass("pageChange");
    $('button[name="pageBtn"]').eq(pageNum-1).addClass("pageChange");
    $("#results").html("");
    for (var step = pageNum*num-num; step < pageNum*num; step++) {
      if(step < dataArray.length){
        $("#results").append(loadArticleTemp(dataArray[step]));
      }
    }
  }
}
function creatPage(array){//產生分頁
  $('.pageArea div').html("");
  var totalPages = Math.ceil(array.length/num);//共幾頁
  for (var step = 1; step < totalPages+1; step++) {
    var button = `<button name="pageBtn" class="pageBtn subtitle" value=${step}>${step}</button>`;
    $('.pageArea div').append(button);
  }
  $('.pageArea div').append('<button id="pageEnd" class="pageBtn subtitle"> <i class="fa fa-angle-double-right" style="padding-left:8px;"></i></button>');
  getPageData(1);//初始狀態為第一頁
}
function loadData(array){
  dataArray = array;
  var result = `<div class="title">Showing <p class="headColor">${dataArray.length}</p> results
                  <button id="mapBtn" title="map"><i class="fa fa-map-marker"></i></button>
                </div><div id="results"></div>`;
  $("#section2").html("").append(result);
  if(dataArray.length == 0){
    //導回首頁(查全部資料)
    $('#homeBtn').click();	
    alert("No results !");
  }else{             
    creatPage(dataArray);//產生分頁
  }   
}
function getApiResponse(text){
  if(text != ""){
    var rs = totalArray.filter(function(item, index, array){
      var zone = true;
      var type = true;
      var key = true;
      if(text.location != ""){
        zone = item.Zone == text.location;
      }
      if(text.type.length != 0){
        type = (text.type.indexOf(item.Class1) > -1) || (text.type.indexOf(item.Class2) > -1);
      }
      if(text.search != ""){
        key = (item.Name.indexOf(text.search) > -1) || (item.Zone.indexOf(text.search) > -1) || (item.Ticketinfo.indexOf(text.search) > -1);
      }
      return zone && type && key;
    });
    console.log(rs)
    loadData(rs);
  }else{
    var limit= num; //10
    var  q= text;
    var url='https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97'
  //  +"&limit="+limit
    +"&q="+q;
    $.ajax({
        url: url,
        dataType: 'json',
        success: function(data) {
            $("#section2").html("");
            totalArray = data.result.records;
            loadData(data.result.records);
        },
        error: function(data,error) {
          alert("錯誤訊息"+JSON.stringify(data)+"和"+error)
        }
    });
  }
}
function getFilterVal(){
  // var text = "";
  // search = $(".search input").val();
  // $.each(categoryArray, function(i,item){
  //   text += item +",";
  // });
  // if(place != ""){
  //   text += place +",";
  // }
  // if(search != ""){
  //   text += search +",";
  // }
  // text = text.substring(0, text.length-1); 
  var text = {
    type :categoryArray,
    location :place,
    search :$(".search input").val()
  }
  return text;
}
$('#fastSearchBtn').click(function(event) {
  text = getFilterVal();
  getApiResponse(text);
});
$('#searchBtn').click(function(event) {
  text = getFilterVal();
  getApiResponse(text);
});
function clearData(){
  $('.fstToggleBtn').text("Choose option");
  $('.fstResultItem').removeClass("fstSelected");
  $('.fstChoiceRemove').click();	
	$('.multipleSelect').fastselect();
  $('.search input').val("");
  $('#fromDate input').val("");
  $('#toDate input').val("");
  categoryArray.length=0;
  place = "";
  search = "";
  dataArray.length=0;
}
$('#homeBtn').click(function(event) {//查全部資料
  clearData();
  getApiResponse("");
});
//按enter後查詢
$(".search input").bind("keypress", {}, keypressInBox);
function keypressInBox(e) {
  var code = (e.keyCode ? e.keyCode : e.which);
  if (code == 13) { //Enter keycode 
    e.preventDefault();
    $('#fastSearchBtn').click();
  }
}
function funAddListener(marker,secretMessage){
  var infowindow = new google.maps.InfoWindow({
    content: secretMessage
  });
  windowArray.push(infowindow);
	marker.addListener('click', function() {
    windowArray.forEach(function(item){
      item.close();
    });
    infowindow.open(marker.get('map'), marker);	
  }); 
  // marker.addListener('mouseover', function() {
  //   infowindow.open(marker.get('map'), marker);
  // });
  // marker.addListener('mouseout', function() {
  //   infowindow.close();
  // });	
}
function initMap(){
  windowArray.length = 0;
  var mapProp = {
    center: new google.maps.LatLng(22.967733, 120.467093),
    zoom: 9.3,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map"), mapProp);
  //載入marker
  for(var i=0 ; i < dataArray.length ; i++){
    var obj = dataArray[i];
    var marker = new google.maps.Marker({
      position: {lat: Number(obj.Py), lng: Number(obj.Px)},
      map: map,
  //         			 animation: google.maps.Animation.DROP,
      icon: 'img/'+ obj.Class1 +'.png',
  //                   shape: shape,
      title: obj.Name
    });
    var message = `<div class="infowindow">
                    <img src="${obj.Picture1}" alt="${obj.Name}" class="infoImg">
                    <div class="info">
                      <h2>${obj.Name}</h2>${creatTag(obj.Class1)}
                      <div class="detailInfo address"><i class="fa fa-home fa-lg"></i>${obj.Add}</div>
                      <span class="direct"><a href="https://www.google.com/maps/place/${obj.Add}"> (點此規劃路徑)</a></span>
                      <div class="detailInfo"><i class="fa fa-calendar fa-lg"></i>${obj.Opentime}${isFree(obj.Ticketinfo)}</div>
                    </div>
                  </div>`;
    funAddListener(marker, message);
  }   
}	
//關閉地圖
$(document).on('click', '.close', function(event){
  $("#modal").css("animation","move 1s 1.2s 1 reverse both");
  setTimeout(()=>{
    $(".loading").remove();
  },600);
});
//打開地圖
$(document).on('click', '#mapBtn', function(event){
  $(".wrap").before(`<div class="loading">
                      <div id="modal">
                        <h1 id="modal-header">Kaohsiung Attractions Map<button type="button" class="close">&times;</button></h1>
                        <div id="map"></div>
                      </div>
                    </div>`);
  initMap();
});
$( function() {
  loadJsonTOption("mock/type.json",$(".multipleSelect"),"multiple");
  loadJsonTOption("mock/location.json",$(".singleSelect"),"single");
  getApiResponse("");//查全部資料
});