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