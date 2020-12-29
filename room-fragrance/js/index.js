(function() {
    var buyCount = 0;
    var cartBtns = document.querySelectorAll('.fa-cart-plus');
    cartBtns.forEach(btn => 
        btn.addEventListener('click', () => {
        buyCount += 1;
        var parent = document.querySelector('.btn-group');
        var child = parent.querySelector('span');
        child.innerText = buyCount;
        }
    ));
    
    if(document.querySelector('.spaces')) {
        let spaces = document.querySelector('.spaces').querySelectorAll('li');
        spaces.forEach(space => {
            space.addEventListener('click', function() {
                console.log(this)
                document.documentElement.scrollTop = document.querySelector('.spaces').clientHeight + 100;
            });
        });
    }
      
    var detailImgs = document.querySelectorAll('.middle');
    detailImgs.forEach(img => 
        img.addEventListener('click', (e) => {
            document.querySelector('.left').querySelector('img').src = e.target.src;
        }
    ));

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

    let flag = false; // 是否有選擇優惠商品
    if(document.getElementById('special')) {
        let products = document.getElementById('special').querySelectorAll('li');
        products.forEach(product => {
            product.addEventListener('click', function() {
                for (var product of products) {
                    product.classList.remove('choose');
                }
                if(!flag) {
                    let apply = document.querySelector('.apply .price');
                    let node = document.createElement('h2');
                    let textnode = document.createTextNode('$1024'); 
                    node.appendChild(textnode);  
                    node.style.color = '#65ba69';
                    document.querySelector('.apply').prepend(node);// add '<h2>$1024</h2>'
                    apply.style.textDecorationLine = 'line-through';
                    apply.style.textDecorationColor = '#65ba69';
                }
                this.classList.add('choose');
                flag = true;
            }
        )});
    }
})();