class Circle { //類別名稱
    constructor(d,s,w){ //建構子
      this.data = d
      this.selector = s
      this.width = w
    }
    create(){ //方法名稱
        $("#"+this.selector).find("span").remove();
        $("#"+this.selector).css({
            top:$(window).height/2,
            left:$(window).width/2,
            width: this.width,
            height: this.width
        });
        var oBox=document.getElementById(this.selector);
        var R=document.getElementById(this.selector).offsetWidth/2;
        var N=this.data.length;
        for(var i=0; i<N; i++){
            $("#"+this.selector).append(`<span id=${i+1} style="background-image: 
            url(img/${this.data[i].name}.png);transform: scale(${this.data[i].scale});
            "title=${this.data[i].name}></span>`);
        }
        var aSpan=oBox.children;
        for(var i=0; i<aSpan.length; i++){
            var a=360/N*i;
            this.startMove(aSpan[i],a);
        }
    }
    startMove(obj,iTarget){
        var oBox=document.getElementById(this.selector);
        var R=document.getElementById(this.selector).offsetWidth/2;
        obj.a=obj.a || 0;
        clearInterval(obj.timer);
            var count=Math.floor(1000/30);
            var start=obj.a;
            var dis=iTarget-start;
            var n=0;
            obj.timer=setInterval(function(){
            n++;
            var c=1-n/count;
            var cur=start+dis*(1-Math.pow(c,3));
            var x=R+Math.sin(cur*Math.PI/180)*R;
            var y=R-Math.cos(cur*Math.PI/180)*R;
            obj.style.left=x+'px';
            obj.style.top=y+'px';
            obj.a=cur; //更新角度
            if(n==count){
                clearInterval(obj.timer);
            }
        },30);
    }
}
  
  