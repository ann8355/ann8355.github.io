var updateFPS = 30//波動速度
var showMouse = true
var time = 0
var bgColor ="black"
var sceneColor = "#6E4F8B"//#00B7C1
var bobColor ="yellow"
var eyeColor ="white"
var eyeballColor ="#17A9D0"
var blushColor ="red"
var blushCC ="rgba(255, 0, 0, 0.5)"
var mouthColor = "#cc0000"
var blobColor = "rgba(174,172,12,0.5)"
var textColor = "rgba(0, 183, 193,0.7)"//rgba(0, 153, 255,0.6)
var freq = 0.07
var amp = 8
var player = document.getElementById('music')

class Vec2{
  constructor(x,y){
    this.x = x || 0
    this.y = y || 0
  }
  set(x,y){
    this.x =x
    this.y =y
  }
  move(x,y){
    this.x+=x
    this.y+=y
  }
  sub(v){
    return new Vec2(this.x-v.x,this.y-v.y)
  }
  clone(){
    return new Vec2(this.x,this.y)
  }
}

var canvas = document.getElementById("mycanvas")
var ctx = canvas.getContext("2d")
ctx.rect= function(v,w,h,fillColor){//矩形
  ctx.beginPath()
  ctx.fillStyle = fillColor
  ctx.strokeStyle = bgColor
  ctx.lineWidth = 3
  ctx.fill()
  ctx.fillRect(v.x,v.y,w,h) 
  ctx.strokeRect(v.x,v.y,w,h) 
}
ctx.circle= function(v,r,fillColor,strokeColor,lineWidth,startDeg,endDeg){
  ctx.beginPath()
  this.arc(v.x,v.y,r,startDeg || 0,endDeg || Math.PI*2)
  ctx.lineWidth = lineWidth
  ctx.fillStyle = fillColor
  ctx.fill()
  ctx.strokeStyle = strokeColor
  ctx.stroke()
}
ctx.ParamEllipse = function (v, a, b, strokeColor, fillColor)//橢圓
{
   var step = (a > b) ? 1 / a : 1 / b;
   ctx.beginPath();
   for (var i = 0; i < Math.PI; i += step){//半圓
     ctx.lineTo(v.x + a * Math.cos(i), v.y + b * Math.sin(i));
   }
   // ctx.closePath();
   ctx.lineWidth = 8
   ctx.strokeStyle = strokeColor
   ctx.stroke()
   ctx.fillStyle = fillColor
   ctx.fill()
}

function initCanvas(){
  ww = canvas.width = window.innerWidth
  wh = canvas.height = window.innerHeight
  if(ww/2 > (wh/1.5)*0.89){
    bobWidth = (wh/1.5)*0.89
    bobHeight = wh/1.5
  }else{
    bobWidth = ww/2
    bobHeight = (ww/2)/0.89
  }
  start = new Vec2((ww-bobWidth)/2,(wh-bobHeight)/2)
  move = {mouth: 0.5,//0.5~1.3 嘴巴高度
          leftEye: 1,//-1.5~1.5 眼球左右位置
          rightEye: 1,//1.5~-1.5
          eyeBrowPos: null, //睫毛上下的位置start.y+bobHeight/7
          eye: bobWidth/6 //眼球睜閉的大小
         }
  moveAnimation()
}
initCanvas()

function moveAnimation(){
  timeline = new TimelineMax({
	  onComplete: function(){
      setTimeout( function(){
        timeline.set(move,{ 
          eye: 0,
          eyeBrowPos: start.y+bobHeight/2.2
        })
        timeline.restart()
      } ,500)
    } 
  })
  timeline.to(move,1,{
    leftEye: 1.5,
    rightEye: -1.5,
    ease: Power4.easeOut
  },3).to(move,1,{
    leftEye: -1.5,
    rightEye: 1.5,
    ease: Power4.easeOut
  },5).to(move,2,{
    leftEye: 1,
    rightEye: 1,
    ease: Power4.easeOut
  },7)
}
function update(){
  time++
  //如果在人物上，滑鼠變可點案
    if(mousePos.sub(start).x > 0 && mousePos.sub(start).x < bobWidth && mousePos.sub(start).y > 0 && mousePos.sub(start).y < bobHeight){
      document.getElementById("mycanvas").style.cursor = "pointer"
      //嘴巴張開
      TweenMax.to(move,0.5,{mouth: 1.3})
      timeline.pause()
    }else{
      document.getElementById("mycanvas").style.cursor = "initial"
      //嘴巴閉合
      TweenMax.to(move,0.3,{mouth: 0.5})
      timeline.play()
      player.pause()
    }
}
function draw(){
	var img = new Image()  
	img.onload = function(){
    ctx.fillStyle = sceneColor
    ctx.fillRect(0,0,ww,wh)  //清空背景  
    ctx.globalCompositeOperation = 'multiply'
    ctx.drawImage(img,0,0,ww,wh)
    ctx.globalCompositeOperation ="source-over"
     //文字 
    let lineheight = 45
    let x = ww*0.75
    let y = wh*0.85
    ctx.font = "32pt hoge,impact"
    ctx.fillStyle = textColor
    ctx.fillText("SpongeBob",x,y)//SpongeBob by CHEN PEI-AN
    ctx.fillText("by",x+130,y+lineheight)
    ctx.fillText("CHEN PEI-AN",x+50,y+lineheight*2.2)
    ctx.beginPath()
    //身體波浪
    let degTime = time/20
    for(var i=0;i<bobWidth;i++){
      let deg = i*freq+degTime
      ctx.lineTo(i+start.x,amp*Math.cos(deg)+start.y)
    }
     for(var i=0;i<bobHeight;i++){
      let deg = i*freq+degTime    
      ctx.lineTo(-amp*Math.cos(deg)+start.x+bobWidth ,i+start.y)
    }
    for(var i=0;i<bobWidth;i++){
      let deg = i*freq+degTime
      ctx.lineTo((start.x+bobWidth)-i,amp*Math.cos(deg)+start.y+bobHeight)
    }
     for(var i=0;i<bobHeight;i++){
      let deg = i*freq+degTime  
      ctx.lineTo(-amp*Math.cos(deg)+start.x ,(start.y+bobHeight)-i)
    }
    ctx.fillStyle = bobColor
    ctx.fill()
    //斑點
    var blobs = [{x:6,y:10,r:bobWidth/19},{x:11,y:5,r:bobWidth/32},{x:1.2,y:11,r:bobWidth/23},{x:5,y:1.15,r:bobWidth/12},{x:20,y:1.6,r:bobWidth/17},{x:1.3,y:1.5,r:bobWidth/11},{x:1.4,y:1.25,r:bobWidth/26}]
    for(var i=0; i<blobs.length; i++){
      ctx.circle(new Vec2(start.x+bobWidth/blobs[i].x+i*5,start.y+bobHeight/blobs[i].y+i*5),blobs[i].r,blobColor,blobColor,1)
    }
    //嘴巴
    var eyeStart = new Vec2(start.x+bobWidth/3,start.y+bobHeight/3)
    let white_r = bobWidth/6;
    let mouthSize = white_r*2.2
    ctx.ParamEllipse(new Vec2(eyeStart.x+white_r,eyeStart.y+bobHeight/10),mouthSize,mouthSize*move.mouth,bgColor,mouthColor)
    ctx.ParamEllipse(new Vec2(eyeStart.x+white_r,eyeStart.y+bobHeight/10),mouthSize,mouthSize/2,bgColor,bobColor)
    //眉毛
    let eyebrow_w = bobWidth/48
    let eyebrow_h = bobHeight/18
    var eyebrows = [{x:3,y:8},{x:3.8,y:7.5},{x:2.5,y:7},{x:1.54,y:8},{x:1.4,y:7.5},{x:1.7,y:7}]
    for(var i=0; i<eyebrows.length; i++){
      if(move.eye != 0){
        move.eyeBrowPos = start.y+bobHeight/eyebrows[i].y
      }
      ctx.rect(new Vec2(start.x+bobWidth/eyebrows[i].x,move.eyeBrowPos),eyebrow_w,eyebrow_h,bgColor)
    } 
    //眼睛(黃色) 閉眼
    ctx.ParamEllipse(new Vec2(eyeStart.x,eyeStart.y),white_r*0.9,white_r*0.9,bgColor,bobColor)
    ctx.ParamEllipse(new Vec2(eyeStart.x+white_r*2,eyeStart.y),white_r*0.9,white_r*0.9,bgColor,bobColor)
    //眼睛(白色)
    ctx.circle(new Vec2(eyeStart.x,eyeStart.y),move.eye,eyeColor,bgColor,5)
    ctx.circle(new Vec2(eyeStart.x+white_r*2,eyeStart.y),move.eye,eyeColor,bgColor,5) 
    //眼睛(藍色)
    let blue_r = move.eye/3;
    ctx.circle(new Vec2(eyeStart.x+blue_r*move.leftEye,eyeStart.y),blue_r,eyeballColor,bgColor,3)
    ctx.circle(new Vec2(eyeStart.x+white_r*2-blue_r*move.rightEye,eyeStart.y),blue_r,eyeballColor,bgColor,3)
    //眼睛(黑色)
    let black_r = blue_r/2;
    ctx.circle(new Vec2(eyeStart.x+blue_r*move.leftEye,eyeStart.y),black_r,bgColor,bgColor,1)
    ctx.circle(new Vec2(eyeStart.x+white_r*2-blue_r*move.rightEye,eyeStart.y),black_r,bgColor,bgColor,1)
    //鼻子
    let noseSize = bobWidth/15;
    ctx.circle(new Vec2(eyeStart.x+white_r,eyeStart.y+bobHeight/9),noseSize,bobColor,bgColor,4,Math.PI*0.9,Math.PI*2.4)
    //牙齒
    let teethSize = blue_r*1.2
    ctx.rect(new Vec2(eyeStart.x+white_r*1.2,eyeStart.y+bobHeight/3.7),teethSize,teethSize,eyeColor)
    ctx.rect(new Vec2(eyeStart.x+white_r*0.5,eyeStart.y+bobHeight/3.7),teethSize,teethSize,eyeColor)
    //腮紅(邊框)
    let blushSize = bobWidth/13; 
    ctx.circle(new Vec2(eyeStart.x-white_r*1.1,eyeStart.y+bobHeight/9),blushSize,bobColor,blushColor,4,Math.PI*0.6,Math.PI*2.2)
    ctx.circle(new Vec2(eyeStart.x+white_r*3.1,eyeStart.y+bobHeight/9),blushSize,bobColor,blushColor,4,Math.PI*0.8,Math.PI*2.4)
    //腮紅(圓圈)
    let blushCircle = blushSize/8;
    var array = [{x:0.9,y:11},{x:1.1,y:8},{x:1.3,y:11},{x:-3.3,y:11},{x:-2.9,y:11},{x:-3.1,y:8}]
    for(var i=0; i<array.length; i++){
      ctx.circle(new Vec2(eyeStart.x-white_r*array[i].x,eyeStart.y+bobHeight/array[i].y),blushCircle,blushCC,blushCC,1)//1.1,9
    }
  }  
	img.src = 'https://backgroundcheckall.com/wp-content/uploads/2017/12/spongebob-ocean-background-4.jpg' 
  requestAnimationFrame(draw)
}
function loaded(){
  initCanvas()
  requestAnimationFrame(draw)
  setInterval(update,1000/updateFPS)
}
window.addEventListener("load",loaded)
window.addEventListener("resize",initCanvas)

//滑鼠事件跟紀錄
var mousePos = new Vec2(0,0)
// var mousePosDown = new Vec2(0,0)
// var mousePosUp = new Vec2(0,0)

window.addEventListener("mousemove",mousemove)
// window.addEventListener("mouseup",mouseup)
window.addEventListener("mousedown",mousedown)
function mousemove(evt){
  mousePos.set(evt.offsetX,evt.offsetY)
}
// function mouseup(evt){
//   mousePos.set(evt.offsetX,evt.offsetY)
//   mousePosUp = mousePos.clone()
  
// }
function mousedown(evt){
  player.currentTime = 0
  player.play()
}