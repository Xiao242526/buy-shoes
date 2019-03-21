//实现一些公共的js的功能
//什么时候开始,什么时候停
//当ajax请求开始的时候,显示进度条
//jquery.ajax的全局事件
//jquery的ajax全局事件,会在任意一个ajax请求执行的时候触发
//6个全局事件
//ajaxStart:开始进度条
//ajaxSend:
//ajaxSuccess;
//ajaxError;
//ajaxComplete;
//ajaxStop:结束进度条
//NProgress.start();
//NProgress.done()
$(document).ajaxStart(function(){
    NProgress.start()
    // console.log('可以发送了')
})
 $(document).ajaxStop(function(){
    //  setTimout 一次使用
     setTimeout(function(){    
           
    NProgress.done()
    //  console.log('nihao')
     },5000)
 })
//  二级菜单的显示与隐藏
$('.second').prev().on('click',function(){
    // $(this).next().stop().slideToggele()
    // console.log('haha')
    $(this).next().stop().slideToggle();
})
// 菜单的显示与隐藏
//使用的是切换类名的形式
$(".main-topbar .left").click(function(){
    //切换类名
    $('.aside').toggleClass('now');
    $(".main").toggleClass('now');
    $('.main-topbar').toggleClass('now')
})
//退出功能
$(".main-topbar .right").on('click',function(){
    $("#logoutModal").modal('show')
})
//给确定按钮注册事件,注意:不要在事件中注册事件
$('.comfire').on("click",function(){
    //f发送ajax请求
    $.get('/employee/employeeLogout',function(info){
        if (info.success) {
           
            location.href="login.html"
            
        }
    })
})