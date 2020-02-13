window.addEventListener('load', function() {
    // 获取元素
    // 鼠标经过显示左右按钮
    var arrow_r = document.querySelector('.arrow-r');
    var arrow_l = document.querySelector('.arrow-l');
    var focus = document.querySelector('.focus');
    focus.addEventListener('mouseenter', function() {
        arrow_r.style.display = 'block';
        arrow_l.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseleave', function() {
            arrow_l.style.display = 'none';
            arrow_r.style.display = 'none';
            timer = setInterval(function() {
                // 手动调佣点击事件
                arrow_r.click();
            }, 2000);
        })
        // 生成小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        // 创建li时顺便添加data-index自定义属性
        li.setAttribute('data-index', i);
        ol.appendChild(li);
        //li的排他思想，生成li的同时就可以绑定时间
        li.addEventListener('click', function() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            //点击小圆圈时,ul滑动对应的数值
            var index = this.getAttribute('data-index');
            num = index;
            circle = index;
            var target = index * focus.offsetWidth;
            animate(ul, -target);
        })
    }
    // 把ol里面的第一个小li设置为类名current
    ol.children[0].className = 'current';
    // 克隆第一张图片
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //给右侧按钮添加图片滚动事件
    var num = 0;
    var circle = 0;
    var flag = true;
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false;
            // 无缝滚动
            // 如果num等于了图片的总数，就快速没有动画的跳到第一张图片，再做下一轮播放动画
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focus.offsetWidth, function() {
                flag = true;
            });
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    });
    // 左侧按钮添加事件
    arrow_l.addEventListener('click', function() {
        // 无缝滚动
        // 如果num等于了图片的总数，就快速没有动画的跳到第一张图片，再做下一轮播放动画
        // 关闭节流阀
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focus.offsetWidth + 'px';
            }
            num--;
            animate(ul, -num * focus.offsetWidth, function() {
                flag = true;
            });
            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            circleChange();
        }
    });

    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    //自动播放功能
    var timer = setInterval(function() {
        // 手动调佣点击事件
        arrow_r.click();
    }, 2000);
})