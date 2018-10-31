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
$( function() {
    var id = localStorage.getItem("id");
    $.getJSON('mock/detailData.json',function(json){
        if(id != "NaN"){
            var data = json[id - 1];
            var temp = new Temp(data.id,data.title,data.content,data.img1,data.img2,data.img3);
            temp.loadData();
            localStorage.setItem("id","NaN");
        }else{
            $.each(json, function( index, value ) {
                var img = new Image();
                img.onload = function(){
                    $(".img-"+(index+1)).css("opacity","1");
                }
                img.src = this.img1;
                $(".img-"+(index+1)).css("background-image","url("+this.img1+")");
            });
        }
    });
    console.log(id)
});