$(function() {
    var flag = true; //添加节流阀
    // 页面滚动到推荐部分就显示导航栏
    function toggleTool() {
        if ($(this).scrollTop() >= $(".recommend").offset().top) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();
        }
    }
    toggleTool();
    $(window).scroll(function() {
        toggleTool();
        // 滚动到推荐页面，相应的电梯li就会添加current类
        if (flag) {
            $(".floor .w").each(function(index, domele) {
                if ($(document).scrollTop() >= $(domele).offset().top) {
                    $(".fixedtool li").eq(index).addClass("current").siblings().removeClass("current");
                }
            });
        }
    });
    // 给电梯添加点击事件
    $(".fixedtool li").click(function() {
        flag = false;
        // 相应的小li添加current类
        $(this).addClass("current").siblings().removeClass("current");
        // 页面滑动到相应的推荐页面
        var index = $(this).index();
        var current = $(".floor .w").eq(index).offset().top;
        $("html, body").stop().animate({
            scrollTop: current
        }, function() {
            flag = true;
        });
    });
})