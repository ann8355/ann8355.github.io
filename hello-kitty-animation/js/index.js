setInterval( function(){
  $("[class^='hello-kitty-bowknot-']").css("backgroundColor",`rgba(${parseInt(Math.random()*255)},${parseInt(Math.random()*255)},${parseInt(Math.random()*255)},1)`)
} ,3500)

var timeline = new TimelineMax()
timeline.staggerFrom($("[class^='hello-kitty-left-moustache']"),3,{
    transform: "rotate(0deg)",
    ease: Elastic.easeOut.config(1, 0.3)
  }, 0.6).set($(".hello-kitty-wrap"),{ 
    transform: "rotate(5deg)"
  }).to($(".hello-kitty-wrap"),2.5,{
    transform: "rotate(-5deg)",
    ease: Power0.easeNone,
    yoyoEase: Power0.easeNone,
    yoyo: true,
    repeat:-1
  })
TweenMax.staggerFrom($("[class^='hello-kitty-right-moustache']"),3,{
    transform: "rotate(0deg)",
    ease: Elastic.easeOut.config(1, 0.3)
}, 0.6)