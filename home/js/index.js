var timeline = new TimelineMax();
var timeline2 = new TimelineMax({
	onComplete: function(){
        // $("#about").show();
        // $("body").css("overflow-y","auto");
    }
});
var menuTl = new TimelineMax();
var scrollTl = new TimelineMax();

function checkScroll(selector,timelineMax){
    var height = $("header").outerHeight();
    if($(".bgTxt").css("height") == "300px"){//mobile size
        height = height*3;
    }
    if ($(window).scrollTop()+height >= $("#"+selector).offset().top) {
        $("header ol a,#menu ol a").removeClass("active");
        $("header a[name='"+selector+"'],#menu a[name='"+selector+"']").addClass("active");
        timelineMax.play();
    }
}
window.addEventListener("scroll",(evt)=>{
    checkScroll("home",timeline2);
    checkScroll("about",scrollTl);
    checkScroll("skill",scrollTl);

});
$(document).on('click', 'header ol a,#menu ol a', function(event){
    $(".close").click();
    var name = $(this).attr("name");
    var height = $("header").outerHeight();
    if($(".bgTxt").css("height") == "300px"){//mobile size
        height = height*3;
    }
    $("HTML, BODY").animate({ scrollTop: $("#"+name).offset().top - height+1}, 500);
    switch(name){
        case "home":
            timeline.seek("home");
        break;
        case "about":
            scrollTl.restart();
        break;
        // default:
    }
});
$(document).on('click', '#arrow', function(event){
    $("header a[name='about'],#menu a[name='about']").click();
});
$(document).on('click', '#menuBar', function(event){
    menuTl.play();
});
$(document).on('click', '.close', function(event){
    menuTl.reverse();
});
$( function() {
    // $("#about").hide();
    $("header a[name='home'],#menu a[name='home']").addClass("active");

    scrollTl.to($("#about span.title"),1.5,{
        width: "7.5em"
    },0.5).from($("#myPhoto,#about span i"),0.7,{
        opacity: 0,
    }).from($("#about p,#about button"),1.5,{
        opacity: 0,
        transform: "translateY(20px)",
        ease: Power0.easeOut
    });
    scrollTl.pause();
    menuTl.to($("#menu"),0.5,{
        top: 0
    });
    menuTl.pause();

    timeline2.add(TweenMax.to(".bgTxt h1", 2, {text:"CHEN PEI-AN", delay:0.5}))
    .to($(".bgTxt"),0.5,{top: "20%"},"+=0.6")
    .add(TweenMax.to(".bgTxt h5", 3, {text:"< Front-End Developer/>"})).addLabel("detail")
    .to($(".bgTxt h5,.bgTxt h1"),0.5,{transform: "translateY(-13em)"},"+=1")
    .add(TweenMax.to(".bgTxt h6", 5, {
        text:"> Birthdate: 1994/ 05/ 05<br>> Email: s8900771@gmail.com<br>> Phone: 0952817089<br>> Address: Taipei, Taiwan<span></span>",
        ease: Power0.easeOut,delay:1.5}),"detail")
    .to($(".bgTxt img"),1.5,{opacity: 1,ease: RoughEase.ease.config({ template:  Power0.easeNone, strength: 1, points: 20, taper: "none", randomize:  true, clamp: false})})
    .to($("header,#arrow"),0.5,{opacity: 1});

    var bp = "-25vw 0";
    if($(".bgTxt").css("height") == "300px"){//mobile size
        bp = "-135vw 0";
    }
    timeline.to($(".bg"),1,{
        opacity: 1,
        ease: Power0.easeOut
    }).to($(".bg"),0.7,{
        backgroundPosition: bp,
        ease: Power1.easeOut
    },"+=0.5").addLabel("effect").to($(".code"),1,{
        right: 0,
        display: "block",
        ease: Power1.easeOut
    },"+=1").add(TweenMax.to($(".bg"),1,{
        backgroundColor: "rgba(68, 44, 46, 0.6)",
        ease: Power0.easeOut
    }),"effect").addLabel("end").to($(".bg"),0.1,{
        filter: "opacity(80%) blur(1px)"
    }).addLabel("home").add(timeline2,"end");
});
