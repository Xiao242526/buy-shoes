var picArr=[];
//存储一个数组
var page=1;
$(function(){
    //第一步渲染页面
    
    var pageSize=5;
    // 页面一进来就渲染第一页
        render()
   function render(){

       $.ajax({
           url:"/product/queryProductDetailList",
           type:"GET",
           data:{
               page:page,
               pageSize:pageSize
           },
           success:function(info){
            //    console.log(info)
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
            //    console.log(info);

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
    $('[name=brandId]').val(id)
    //手动修改一级分类校验成功是符号改变 VAID是注册成功是应该注册的
    $form.data('bootstrapValidator').updateStatus('brandId','VALID')

 })
//第六部分上传图片部分
var $file=$('#file')
 $file.fileupload({
     //图片上传成功后的回调函数也就是上传成功后显示的图片
     done:function(e,data){
        //  console.log(data.result)
         //拿到的是图片上传的地址
        // var result=data.result;
        //让图片显示到桌面上
        //给添加图片
    $('#imgbox').prepend('<img src="' + data.result.picAddr + '" width="100" height="100" alt=""> ')
       
        //只能是3张
        $('#imgbox img').eq(3).remove();
        //把上传的图片的结构存储到数组中
        picArr.unshift(data.result);
        
        if (picArr.length>3) {
            picArr.pop();
            
        }

        //判断数组的长度,如果是3,应该让picstatus校验通过
        if (picArr.length===3) {
            
            $form.data('bootstrapValidator').updateStatus('picStatus','VALID')

            
        }else{
            $form.data('bootstrapValidator').updateStatus('picStatus','INVALID')

        }




   


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
        brandId: {
          validators: {
            notEmpty: {
              message: '请选择一个二级分类'
            }
          }
        },
        //手机名
        proName: {
          validators: {
            notEmpty: {
              message: '请输入商品的的名称'
            }
          }
        },
        //手机牌
        proDesc: {
          validators: {
            notEmpty: {
              message: '请输入商品的描述'
            }
          }
        },
        num: {
            validators: {
              notEmpty: {
                message: '请输入商品的库存'
              },
              regexp:{
                regexp: /^[1-9]\d{0,4}$/,
                message: '商品库存只能是1-99999之间'

              }
            }
          },
          size: {
            validators: {
              notEmpty: {
                message: '请输入商品的尺码'
              },
              //正则表达式的检验
              regexp:{
                regexp: /^\d{2}-\d{2}$/,
                message: '尺码的格式必须是33-44'

              }
            }
          },
          oldPrice: {
            validators: {
              notEmpty: {
                message: '请输入商品的原浆'
              }
            }
          },
          price: {
            validators: {
              notEmpty: {
                message: '请输入商品的现价'
              }
            }
          },
          picStatus: {
            validators: {
              notEmpty: {
                message: '请上传3张图片'
              }
            }
          }
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
  // 注册表单校验成功的事件
$form.on('success.form.bv', function(e) {
    e.preventDefault()
  
    // 获取到了除了picArr之外所有的参数
    var params = $form.serialize()
    params += '&picArr=' + JSON.stringify(picArr)
    console.log(params)
    // 发送ajax请求
    $.ajax({
      type: 'post',
      url: '/product/addProduct',
      data: params,
      success: function(info) {
        if (info.success) {
          // 关闭模态框
          $('#addModal').modal('hide')
          // 重置表单的内容
          $form.data('bootstrapValidator').resetForm(true)
          // 重新渲染第一页
          page = 1
          render()
  
          // 重置数据
          $('.dropdown-text').text('请选择二级分类')
          picArr = []
          $('.img_box img').remove()
        }
      }
    })
  
  
  
  
  
})


})
