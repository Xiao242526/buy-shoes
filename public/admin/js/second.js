
var page=1;
$(function(){
    //第一步渲染页面
    
    var pageSize=5;
    // 页面一进来就渲染第一页
        render()
   function render(){

       $.ajax({
           url:"/category/querySecondCategoryPaging",
           type:"GET",
           data:{
               page:page,
               pageSize:pageSize
           },
           success:function(info){
               console.log(info)
               $('tbody').html(template("tp1",info))
    //    第二部进行页面分页功能
               paginator(info,render)
           }
       })
   }

//第三步点击添加按钮让模态框显示出来
//1.点击二级分类的功能
//2.显示模态框
//3.准百添加二级分类的表单
//4.表单校验功能
//5.表单校验通过,发送ajax请求
//6重新渲染
$(".addbtn").on('click',function(){
    $("#addModal").modal("show")
    
    //第四步通过点击添加按钮是把所有的一级分类通过动态把页面都显示出来
       $.ajax({
           type:"get",
           url:'/category/querySecondCategoryPaging',
           data:{
            //    因为这里不做分页因为都显示在这里
               page:1,
               pasiSize:100
           },
           success:function(info){
               console.log(info);

            $(".dropdown-menu").html(template('tp2',info))
           }
       })
})
//   第五部一级分类选择功能因为是动态创建出来的所以需要使用事件委托事件

 $(".dropdown-menu").on('click','li',function(){
     //获取点击li的下标方便下面获取选择
     var id =$(this).data('id');
    //  console.log(id)
    //修改按钮的内容
    $(".btn-text").text($(this).children().text());
    //动态获取name=categoryid的value
    $('[name=categoryId]').val(id)
    //手动修改一级分类校验成功是符号改变 VAID是注册成功是应该注册的
    $form.data('bootstrapValidator').updateStatus('categoryId','VALID')

 })
//第六部分上传图片部分
var $file=$('#file')
 $file.fileupload({
     //图片上传成功后的回调函数也就是上传成功后显示的图片
     done:function(e,data){
         console.log(data)
         //拿到的是图片上传的地址
        var result=data.result.picAddr;
        //让图片显示到桌面上
        $('#imgbox img').attr('src',result);
        $('[name=brandLogo]').val(result);
        $form.data('bootstrapValidator').updateStatus('brandLogo','VALID')


   //图片都弄好了,开始提交在提交是发现提交的数据与后台不一致,需要进行该变
   //后台提交时需要使用道德是1brandName品牌名称.2categoryId 所属分类Id 3.brandLogo品牌logo的id
    
   //第七部获取数据与后台交接的参数,参数必须与后台一致
    //分别是brandName,categoryid,brandLogo的



   


     }
 })
  //第八步进行表单校验
var $form=$('form');
$form.bootstrapValidator({
    //指定不校验的类型,默认对禁用的,隐藏,不可见的不做校验
    excluded:[],
    //指定对谁进行校验,对表单中的name属性
    fields: {  
        // 对categoryName进行校验
        categoryId: {
          validators: {
            notEmpty: {
              message: '请选择一个一级分类'
            }
          }
        },
        //手机名
        brandName: {
          validators: {
            notEmpty: {
              message: '请输入二级分类的名称'
            }
          }
        },
        //手机牌
        brandLogo: {
          validators: {
            notEmpty: {
              message: '请上传二级分类的图片'
            }
          }
        },
      },
      //后面的图标
      feedbackIcons: {
        valid: 'glyphicon glyphicon-thumbs-up',
        invalid: 'glyphicon glyphicon-thumbs-down',
        validating: 'glyphicon glyphicon-refresh'
      }
    })
   //校验了,但是在一级表单选择好校验失败了图片也校验失败了在校验的时候
   //原因:隐藏的值是通过代码来改动的获取的值,而表单没有隐藏的则是通过
   //手动的给输的内容并并注册了一个监听事件修改的,通过代码获取的值表单不知道
   //所以显示失败,所以需要手动的给予修改状态
  
  $form.on('success.form.bv',function(e){
      //防止跳转
      e.preventDefault();
      //发送ajax请求
      $.ajax({
          type:'post',
          url:'/category/addSecondCategory',
          data:$form.serialize(),
          success:function(info){
              //如果成功
              if (info.success) {
                  //模态框就隐藏
                  $("#addModal").modal('hide');
                  //重置表单样式
                  $form.data('bootstrapValidator').resetForm(true);
                  //重新渲染第一页
                  page=1;
                  render();
               //重置下拉框的文字与图片
               $(".dropdown-text").text('请选择一级分类');
               $('#imgbox img').attr('src','images/none.png')
                  
              }

          }
      })
     

  })
  
  
  
  
})



