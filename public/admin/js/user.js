$(function(){
    
    //封装函数方便重新渲染
    // 刚开始是必须得渲染
    //申明变量
    var id,isDelete;
     var page =1;
    var pageSize=5//一页上面的条数是多少默认的
    
    
    render(1)//表示一进来就得渲染一遍
    
   function render(){
   //第1步  ===发送ajax请求
    $.ajax({
        url: "/user/queryUser",
        type:'get',
        data:{
            page:page,
            pageSize:pageSize
        },
        success:function(info){
            // console.log(info)
            //在模板引擎中可以直接访问info对象的属性
            var htmlstr=template("tp1",info)
            $('.content tbody').html(htmlstr);


            // ========================================
         //第二步==>分页的功能而且不能乱写必须是在发送ajax请求后再能进行分页
        /**步骤1.引入了分页的js文件
         * 步骤2.准备一个ul,给了一个id(一定要给ul);
         * 步骤3.初始话分页 bootstrapPaginator
         * 步骤4.指定一些要使用的参数
         *   bootstrapMajorVersion:3 版本号
         *  currentPage 当前页
         * totalPage 计算出来的设计的总页面
         * onPageClicked 通过第四个page参数就可以获取到第几页了
         * 
         */
        // 注意#paginator这个类名你怎么操作他都没有反映因为在他自身封装的函数的内部已经把所有的类名
        // 给干掉所以要给ul单独多加一个盒子
          $('#paginator').bootstrapPaginator({
              //引入版本号
              bootstrapMajorVersion: 3,
              //设置当前页面
              currentPage: page,
               // 设置总页数，应该计算出来
               //info.size表示的是每页有多少条
               //info.total表示的是总共有多少条
               totalPages: Math.ceil(info.total / info.size),
               // 当分页的按钮被点击的时候就执行了
            //    a ==>event事件对象 b==>originevent是原始事件 c==>type类型是类型 newpage==> page是当前点击的页数
            // 在这里面的page不能等于page因为他是函数里面有page局部变量只能改变已经有的改变不了外面已经有的所以参数page可以写任何数
            // p相当形参,page才是实参
               onPageClicked: function(a, b, c, p) {
                  page = p

                //  第三步封装Ajax发送请求 =========================
                //     // 重新发送ajax请求因为得到数据后渲染的不同的页面,
                // 因为重新渲染发送ajax是重复的动作所以要封装ajax函数
                  
                // 特别注意的是这边是递归的,为什么不会吊死,因为这边需要点击的时候才能调用所以不会
                
                render()

                //   $.ajax({
                //     url: "/user/queryUser",
                //     type:'get',
                //     data:{
                //         page:page,
                //         pageSize:pageSize
                //     },
                //     success:function(info){
                //         // console.log(info)
                //         //在模板引擎中可以直接访问info对象的属性
                //         var htmlstr=template("tp1",info)
                //         $('.content tbody').html(htmlstr);
            
                  }
               
          })
        }
    })



   }
  

// ===================第四部分按钮的操作部分

//2.通过事件委托给按钮注册点击事件
//2.1给启用和禁用注册点击事件
//2.2弹出模态框
//2.3给确定注册点击事件
//2.4发送ajax请求,启用获取禁用用户

//因为在点启用的时候你是知道你要点那个的按钮,所以我们可通过启用的按钮
//获取id方便禁用的使用使用,所以要在点击模态框出来后顺便把id值给存储起来

 $(".content tbody").on("click",'.btn',function(){
   // console.log("呵呵")
   // 弹出模态框
    $("#userModal").modal('show');
    
  //获取到用户的id以及启用禁用的状态
   id=$(this).parent().data('id');
    //  console.log(id)
    // 获取禁用的状态判断是否是
   //isDelete 由于这类名在下面函数中是访问不到的所以可以在全局中设置一个变量方便接收

   //1.var isDelete =$(this).text()==='启用'?1:0;
  isDelete =$(this).hasClass('btn-success') ? 1:0;
    
})
// //4给确定按钮注册点击事件
$(".update").on('click',function(){ 
    // console.log('wo')
    $.ajax({
        type:'post',
        url: '/user/updateUser',
        data: {
          id: id,
          isDelete: isDelete,
        },
        success:function(info){
            if (info.success) {
                //关闭模态框
                $("#userModal").modal('hide')
                //重新渲染
                render()             
            }
            // 分页的功能不许在ajax的数据请求回来治好后,

        }
    })

})

})