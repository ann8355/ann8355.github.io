// var commentBtn = document.getElementById('comment');
// commentBtn.onclick = function(){
//   alert('請先登入會員');
// };

// var buyCount = 0;
// var cartBtns = document.querySelectorAll('.fa-cart-plus');
// cartBtns.forEach(btn => 
//     btn.addEventListener('click', () => {
//     buyCount += 1;
//     var parent = document.querySelector('.btn-group');
//     var child = parent.querySelector('span');
//     child.innerText = buyCount;
//     }
// ));

// var detailImgs = document.querySelectorAll('.middle');
// detailImgs.forEach(img => 
//     img.addEventListener('click', (e) => {
//         document.querySelector('.left').querySelector('img').src = e.target.src;
//     }
// ));

document.getElementById('gotop').onclick = () => {
    document.documentElement.scrollTop = 0;
};
// $(document).on('click', '#gotop', function(event){
//     $("HTML, BODY").animate({ scrollTop: 0}, 500);
// });

document.addEventListener('scroll', (e) => {
    if(document.documentElement.scrollTop > window.screen.height) {
        document.getElementById('gotop').style.position = 'fixed';
    } else {
        document.getElementById('gotop').style.position = 'absolute';
    }
    if(document.documentElement.scrollTop > document.querySelector('#index').clientHeight) {
        document.querySelector('#index').classList.add('fixed-top', 'headerShow');
    } else {
        document.querySelector('#index').classList.remove('fixed-top', 'headerShow');
    }
});