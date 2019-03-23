// 第一步发送ajax渲染页面
 var page=1;
$(function(){
   
    var pageSize=5;
    render()
    function render(){

        $.ajax({
            url:'/category/queryTopCategoryPaging',
            type:'get',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
             //    if (info.success) {
                    // console.log(info);
     //第五步增加页面的分页效果
        $('tbody').html( template('tp1', info) )
                    //当 发送ajax成功后然后
        // $('#paginator').bootstrapPaginator({
        //     //版本号
        //  bootstrapMajorVersion: 3,
        //  //当前页面
        //   currentPage: page,
        //   //总页面
        //  totalPages: Math.ceil(info.total / info.size),
        // //点击的时候出现的当前的页面
        //  onPageClicked: function(a, b, c, p) {
        //     page = p
        //     render()
        //   }
        //  })
            paginator(info,render)  
     
            }
         })


    }
   


//第二中功能点击按钮引入模态框
$(".addbtn").on("click",function(){

    $('#addModal').modal('show')

})
 // 第三种功能表单验证
var $form= $('form');
$form.bootstrapValidator({
    //指定谁进行校验,对象表单中的属性
    feedbackIcons: {
        valid: 'glyphicon glyphicon-thumbs-up',
        invalid: 'glyphicon glyphicon-thumbs-down',
        validating: 'glyphicon glyphicon-refresh'
      },
      fields:{
          //对categoryName进行校验
          categoryName:{
             validators:{
                 notEmpty:{
                     message:"一级分类的名称不能为空",
                 }
             } 
          }
      }
})
//第四种功能给表单注册成功事件
// 发送ajax重新渲染
$form.on('success.form.bv', function(e) {
    // 阻止浏览器的默认行为
    e.preventDefault()
    // console.log('哈哈')
    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: $form.serialize(),//参数的表单
      success: function(info) {
        //   如果成功后添加内容是从第一页开头加一直往后排,出现这样的原因是因为在后台自动有
        //增加了一个order by的界面他会降序排列
        console.log(info)
        //发送成功后要把模态框给关闭
        if (info.success) {
            //
          $('#addModal').modal('hide')
    // 然后要重置表单样式因为如果不重置表单样式会导致第二次再要输入时会一直显示在上面
        //  dom对象中的获取则是this.parentNode.dataset.id      reset本身有省略内容的功能      
          $form.data('bootstrapValidator').resetForm(true)
          // 重新渲染第一页， 因为最新增加的数据在第一页所以要返回第一页 如果表格里面是resetFrom(true)
        //   则表示的是把所有表单的里面的内容也重置了
                 
           page = 1
          render()
        }
      }
    })
  })

})
