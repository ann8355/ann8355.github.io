var timeline = new TimelineMax();
var timeline2 = new TimelineMax();
var menuTl = new TimelineMax();
var aboutTl = new TimelineMax();
var experienceTl = new TimelineMax();
var workTl = new TimelineMax();
var contactTl = new TimelineMax();
var skillData = [];

function loadSkillData(){
    $.getJSON("mock/skillData.json", function(data) {
        skillData = data;
    });
}
function loadExperienceData(){
    $.getJSON("mock/experienceData.json", function(array) {
        experienceLength = array.length;
        array.forEach(function(ele){
            var block = `<li>
                            <i class="${ele.iconClass}" style="background-color:${ele.color};"></i>
                            <h3 class="detailTitle">${ele.year}</h2>
                            ${ele.description != ""?`<div class="card">${ele.description}</div>`: ``}
                        </li>`;
            $("#experience ul").append(block);
        });
        experienceTl.from($("#experience .title"),1.5,{
            width: 0
        },0.5).staggerFrom($("#experience li"),1.2,{
            height: 0,
            display: "none"
        },1.3);
        experienceTl.pause();
    });
}
function loadTag(obj){
    var tag = "";
    obj.forEach(function(element) {
        tag += `<span class="tag">${element}</span>`;
    });
    return tag;
}
function loadWorkData(){
    $.getJSON("mock/workData.json", function(datas) {
        datas.forEach(function(data){
            var temp = `<div class="card">
                    <img src="img/${data.url}.PNG" alt=${data.name}>
                    <div class="subTitle workBlock">
                    <i class="fa fa-info-circle info" data-content=${data.description}></i>
                    <h3>${data.name}</h3>
                    <div>
                        <button onclick="window.open('${data.url == `admin-order`? `/${data.url}/dists/index.html`:`/${data.url}/index.html`}');">
                            <i class="fas fa-link"></i>作品連結
                        </button>
                        <button onclick="window.open('https://github.com/ann8355/ann8355.github.io/tree/master/${data.url}');"><i class="fa fa-code"></i>程式碼</button>
                    </div>
                    <div class="tagBlock">
                        <i class="fa fa-tags"></i>${loadTag(data.skills)}
                    </div>
                  </div>
                </div>`;
            if (data.description) {
                $("#projects").append(temp);
            }
        });
        workTl.from($("#work .title"),1.5,{
            width: 0
        },0.5).staggerFrom($("#work .card"),1,{
            scale: 0
        },0.5);
        workTl.pause();
    });
}
$(document).on('click', '#box span', function(event){
    var n = skillData.length;
    var angle = 360/n;
    var count = $(this).attr("id");
    var current = count*angle;
    var data = skillData[count-1];
    var circleTl = new TimelineMax({onComplete: function(){
        $("#skill .detailTitle").text(data.name);
        $("#skill article").text(data.description);
    }});
    var rotatePos = 110;
    if($(".bgTxt").css("height") == "300px"){//mobile size
        rotatePos = 200;
    }
    $("#box span").css("filter","none");
    $(this).css("filter","sepia(1)");
    circleTl.set($(this),{
        scale: data.scale
    }).set($("#box span,#box span:hover"),{
        rotation: -(rotatePos - current)
    }).to($("#box"),1,{
        rotation: rotatePos - current,
        ease: Power0.easeOut
    });
});
function checkScroll(selector,timelineMax){
    var height = $("header").outerHeight();
    if($(window).scrollTop()+height > ($(document).outerHeight()- $(window).outerHeight())){
        $("header ol a,#menu ol a").removeClass("active");
        $("header a[name='contact'],#menu a[name='contact']").addClass("active");
        contactTl.restart();
    }else if ($(window).scrollTop()+height >= $("#"+selector).offset().top && 
    $(window).scrollTop()+height <= $("#"+selector).offset().top+$("#"+selector).outerHeight()) {
        $("header ol a,#menu ol a").removeClass("active");
        $("header a[name='"+selector+"'],#menu a[name='"+selector+"']").addClass("active");
        if(selector == "skill"){
            var c = new Circle(skillData,"box","500px");
            c.create();
            experienceTl.pause();
        }else{
            timelineMax.play();
        }
    }
}
window.addEventListener("scroll",(evt)=>{
    checkScroll("home",timeline2);
    checkScroll("about",aboutTl);
    checkScroll("experience",experienceTl);
    checkScroll("skill");
    checkScroll("work",workTl);
    if($(window).scrollTop() > $("#home").offset().top){
        $(".top").show();
    }else{
        $(".top").hide();
    }
});
$(document).on('click', '.top', function(event){
    $("HTML, BODY").animate({ scrollTop: 0}, 500);
});
$(document).on('click', 'header ol a,#menu ol a', function(event){
    $(".close").click();
    var name = $(this).attr("name");
    var height = $("header").outerHeight();
    $("HTML, BODY").animate({ scrollTop: $("#"+name).offset().top - height+1}, 500);
    switch(name){
        case "home":
            timeline.seek("home");
        break;
        case "about":
            aboutTl.restart();
        break;
        case "experience":
            experienceTl.restart();
        break;
        case "work":
            workTl.restart();
        break;
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
    loadSkillData();
    loadExperienceData();
    loadWorkData();
    $("header a[name='home'],#menu a[name='home']").addClass("active");

    aboutTl.from($("#about span.title"),1.5,{
        width: 0
    },0.5).from($("#myPhoto,#about span i"),0.7,{
        opacity: 0,
    }).from($("#about p,#about button"),1,{
        opacity: 0,
        transform: "translateY(20px)",
        ease: Power0.easeOut
    });
    aboutTl.pause();
    contactTl.from($("#contact div"),1.5,{
        opacity: 0,
        ease: Power0.easeOut
    },0.2);
    contactTl.pause();
    menuTl.to($("#menu"),0.5,{
        top: 0,
        display: "block"
    });
    menuTl.pause();

    timeline2.add(TweenMax.to(".bgTxt h1", 2, {text:"CHEN PEI-AN", delay:0.5}))
    .to($(".bgTxt"),0.5,{top: "20%"},"+=0.6")
    .add(TweenMax.to(".bgTxt h5", 3, {text:"< Front-End Developer/>"})).addLabel("detail")
    .to($(".bgTxt h5,.bgTxt h1"),0.5,{transform: "translateY(-13em)"},"+=1")
    .add(TweenMax.to(".bgTxt h6", 5, {
        text:"> Birthdate: 1994/ 05/ 05<br>> Hobbies: music, coding<br>> Email: s8900771@gmail.com<br>> Phone: 0952817089<br>> Address: Taipei, Taiwan<span></span>",
        ease: Power0.easeOut,delay:1.5}),"detail")
    .to($(".bgTxt img"),1.5,{opacity: 1,ease: RoughEase.ease.config({ template:  Power0.easeNone, strength: 1, points: 20, taper: "none", randomize:  true, clamp: false})})
    .to($("#arrow"),0.5,{opacity: 1});

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
    }),"effect").add(TweenMax.to($("header"),0.5,{opacity: 1,delay:1}),"effect")
    .addLabel("end").to($(".bg"),0.1,{
        filter: "opacity(80%) blur(1px)"
    }).addLabel("home").add(timeline2,"end");
});
