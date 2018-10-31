var count = "";
function closeWin(path,name,e) {
    var number = $(e).find("span").text();
    localStorage.setItem("id",parseInt(number));
    window.opener=null;
    window.open(path,name);
    window.close();
}
class Temp { 
    constructor(i,t,c,i1,i2,i3){ 
      this.id = i
      this.title = t
      this.content = c
      this.img1 = i1
      this.img2 = i2
      this.img3 = i3
    }
    loadData(){ 
      var title = this.title.split(" ");
      $(".rightTop div").eq(0).text(title[0]);
      if(title[1] == null){
        $(".rightTop div").eq(1).text("");
      }
      $(".leftBottom div").eq(1).text(this.id);
      $(".content .title2").text(this.title);
      $(".content p").text(this.content);
      $(".top-img").css("background-image","url("+this.img1+")");
      $(".center-img").css("background-image","url("+this.img2+")");
      $(".bottom-img").css("background-image","url("+this.img3+")");
    }
  }
  var timeline = new TimelineMax();
  function isFinish(){
    if(count.indexOf("1") > -1 && count.indexOf("2") > -1 && count.indexOf("3") > -1 && 
        count.indexOf("4") > -1 && count.indexOf("5") > -1 && count.indexOf("6") > -1 && count.indexOf("7") > -1){
      $(".loading").remove();
      timeline.to(".img-1",0.5,{
        opacity: 1,
      }).to(".img-2",0.5,{
        opacity: 1,
      },1);
    }else{
      setTimeout("isFinish()",500);
    }
  }
  window.addEventListener("scroll",(evt)=>{    
    let currentY = window.scrollY //目前滾動位置
    let pageHeight = $("html").height()- window.innerHeight //頁面高度
    let progressValue = currentY/pageHeight //0~1
    if(progressValue > 0.4){
        timeline.play();
        timeline.to(".img-3",0.5,{opacity: 1,},0.5);
        timeline.to(".img-4",0.5,{opacity: 1,},1);
        timeline.pause();
    }
    if(progressValue > 0.6){
        timeline.play();
        timeline.to(".img-5,.image-rotate",0.5,{opacity: 1,},0.5);
        timeline.pause();
    }
    if(progressValue > 0.8){
        timeline.play();
        timeline.to(".img-6",0.5,{opacity: 1,},1);
        timeline.to(".img-7",0.5,{opacity: 1,},1.5);
        timeline.pause();
    }
  });
$( function() {
    var id = localStorage.getItem("id");
    var percentage = 0;
    $.getJSON('mock/detailData.json',function(json){
        if(id != undefined && id != "NaN"){
            data = json[id - 1];
            var temp = new Temp(data.id,data.title,data.content,data.img1,data.img2,data.img3);
            temp.loadData();
            localStorage.setItem("id","NaN");
        }else{
            $(".container").append('<div class="loading"><img width="300" height="300" src="img/gif-transparent-loading-4.gif"></div>');
            $.each(json, function( index, value ) {
                var img = new Image();
                img.onload = function(){
                    if(index == 4){
                        timeline.set(".image-rotate",{
                            backgroundImage: 'url('+img.src+')'
                        });   
                    }else{
                        timeline.set(".img-"+(index+1),{
                            backgroundImage: 'url('+img.src+')'
                        });   
                    }                
                    count += index+1;
                    percentage += 14;
                    if(percentage == 98){
                        console.log(100+"%")
                    }else{
                        console.log(percentage+"%")
                    }
                    isFinish();
                }
                img.src = this.img1;   
            });
        }
    });
    console.log(id)
});