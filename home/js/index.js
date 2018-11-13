$( function() {
    var timeline = new TimelineMax();
    var timeline2 = new TimelineMax();
    timeline2.add(TweenMax.to(".bgTxt h1", 2, {text:"CHEN PEI-AN"}))
    .to($(".bgTxt"),0.5,{top: "20%"},"+=0.6")
    .add(TweenMax.to(".bgTxt h5", 3, {text:"< Front-End Developer />"})).addLabel("detail")
    .to($(".bgTxt h5,.bgTxt h1"),0.5,{transform: "translateY(-13em)"},"+=1")
    .add(TweenMax.to(".bgTxt h6", 5, {
        text:"\> Birthdate: 1994/ 05/ 05<br>\> Email: s8900771@gmail.com<br>\> Phone: 0952817089<br>\> Address: Taipei, Taiwan",
        ease: Power0.easeOut,delay:1.5}),"detail")
    .to($("header,#arrow"),0.5,{opacity: 1},"+=0.5");

    timeline.to($(".bg"),1,{
        opacity: 1,
        ease: Power0.easeOut
    }).to($(".bg"),0.7,{
        backgroundPosition: "-25vw 0",
        ease: Power0.easeOut
    },"+=0.5").addLabel("effect").to($(".code"),1,{
        right: 0,
        display: "block",
        ease: Power0.easeOut
    },"+=1").add(TweenMax.to($(".bg"),1,{
        backgroundColor: "rgba(68, 44, 46, 0.7)",
        ease: Power0.easeOut
    }),"effect").addLabel("end").to($(".bg"),0.1,{
        filter: "opacity(80%) blur(2px)"
    }).add(timeline2,"end");
});
