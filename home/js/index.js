var timeline = new TimelineMax();
var timeline2 = new TimelineMax();

$(document).on('click', 'header ol:nth-child(1)', function(event){
    timeline.seek("replay");
});
$(document).on('click', 'header ol a', function(event){
    $("header ol a").removeClass("active");
});
$( function() {
    timeline2.add(TweenMax.to(".bgTxt h1", 2, {text:"CHEN PEI-AN", delay:0.5}))
    .to($(".bgTxt"),0.5,{top: "20%"},"+=0.6")
    .add(TweenMax.to(".bgTxt h5", 3, {text:"< Front-End Developer/>"})).addLabel("detail")
    .to($(".bgTxt h5,.bgTxt h1"),0.5,{transform: "translateY(-13em)"},"+=1")
    .add(TweenMax.to(".bgTxt h6", 5, {
        text:"> Birthdate: 1994/ 05/ 05<br>> Email: s8900771@gmail.com<br>> Phone: 0952817089<br>> Address: Taipei, Taiwan<span></span>",
        ease: Power0.easeOut,delay:1.5}),"detail")
    .to($(".bgTxt img"),1.5,{opacity: 1,ease: RoughEase.ease.config({ template:  Power0.easeNone, strength: 1, points: 20, taper: "none", randomize:  true, clamp: false})})
    .to($("header,#arrow"),0.5,{opacity: 1});

    // timeline.to($(".bg"),1,{
    //     opacity: 1,
    //     ease: Power0.easeOut
    // }).to($(".bg"),0.7,{
    //     backgroundPosition: "-25vw 0",
    //     ease: Power1.easeOut
    // },"+=0.5").addLabel("effect").to($(".code"),1,{
    //     right: 0,
    //     display: "block",
    //     ease: Power1.easeOut
    // },"+=1").add(TweenMax.to($(".bg"),1,{
    //     backgroundColor: "rgba(68, 44, 46, 0.7)",
    //     ease: Power0.easeOut
    // }),"effect").addLabel("end").to($(".bg"),0.1,{
    //     filter: "opacity(80%) blur(1px)"
    // }).addLabel("replay").add(timeline2,"end");
    
    timeline.to($(".bg"),1,{
        opacity: 1,
        ease: Power0.easeOut
    }).to($(".bg"),0.7,{
        backgroundPosition: "-135vw 0",
        ease: Power1.easeOut
    },"+=0.5").addLabel("effect").to($(".code"),1,{
        bottom: 0,
        display: "block",
        ease: Power1.easeOut
    },"+=1").add(TweenMax.to($(".bg"),1,{
        backgroundColor: "rgba(68, 44, 46, 0.7)",
        ease: Power0.easeOut
    }),"effect").addLabel("end").to($(".bg"),0.1,{
        filter: "opacity(80%) blur(1px)"
    }).addLabel("replay").add(timeline2,"end");
    $('header ol:nth-child(1) a').addClass("active");
});
