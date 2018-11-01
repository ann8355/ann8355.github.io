var count = "";
var id;
var timeline = new TimelineMax();
var timeline2 = new TimelineMax();
var property = {
    opacity: 1,
    // scaleX:"1",
    // scaleY:"1",
    // transformOrigin: "50% 50%"
};
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
      TweenMax.to($(".container"),1,{
        opacity: 1
      });
      timeline2.from($(".top-img"),0.5,{
        scaleX:"0.8",
        scaleY:"0.8",
        transformOrigin: "50% 50%"
      },1).from($(".rightTop div:eq(0)"),0.5,{
        x:"50px"
      },"+=0.5").from($(".rightTop div:eq(1)"),0.5,{
        y:"50px"
      }).from($(".content"),0.5,{
        x:"100px"
      },"+=0.5").from($(".center-img"),0.5,{
        scaleX:"0.7",
        scaleY:"0.7",
        transformOrigin: "50% 50%"
      },"+=0.5").from($(".bottom-img"),0.5,{
        scaleX:"0.9",
        scaleY:"0.9",
        transformOrigin: "50% 50%"
      },"+=0.5");
    }
  }
  function isFinish(){
    if(count.indexOf("1") > -1 && count.indexOf("2") > -1 && count.indexOf("3") > -1 && 
        count.indexOf("4") > -1 && count.indexOf("5") > -1 && count.indexOf("6") > -1 && count.indexOf("7") > -1){
      $(".loading").remove();
      timeline.to(".img-1",0.5,property).to(".img-2",0.5,property,1);
    }else{
      setTimeout("isFinish()",500);
    }
  }
  window.addEventListener("scroll",(evt)=>{    
    let currentY = window.scrollY //目前滾動位置
    let pageHeight = $("html").height()- window.innerHeight //頁面高度
    let progressValue = currentY/pageHeight //0~1
    if(id != undefined && id != "NaN"){
        timeline2.progress(progressValue);
    }else{
        if(progressValue > 0.35){
            var timeline3 = new TimelineMax();
            timeline3.to(".img-3",0.5,property).to(".img-4",0.5,property,"+=0.5");
        }
        if(progressValue > 0.55){
            var timeline4 = new TimelineMax();
            timeline4.to(".img-5,.image-rotate",0.5,property,"+=0.5");
        }
        if(progressValue > 0.75){
            var timeline5 = new TimelineMax();
            timeline5.to(".img-6",0.5,property,"+=0.5").to(".img-7",0.5,property,"+=0.5");
        }
    }
  });
$( function() {
    id = localStorage.getItem("id");
    var percentage = 0;
    $.getJSON('mock/detailData.json',function(json){
        if(id != undefined && id != "NaN"){
            data = json[id - 1];
            var temp = new Temp(data.id,data.title,data.content,data.img1,data.img2,data.img3);
            temp.loadData();
            localStorage.setItem("id","NaN");
        }else{
            $(".container").append(`<div class="loading">
                                        <ul class="progress">
                                            <ol></ol>
                                            <ol></ol>
                                            <ol></ol>
                                            <ol></ol>
                                            <ol></ol>
                                            <ol></ol>
                                            <ol></ol>
                                        </ul>
                                        <img width="300" height="300" src="img/gif-transparent-loading-4.gif">
                                    </div>`);
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
                    percentage++;
                    $(".progress ol").eq(percentage-1).css("background-color","black");
                    isFinish();
                }
                img.src = this.img1;   
            });
        }
    });
});