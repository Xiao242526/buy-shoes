$(function () {
    $('#form').bootstrapValidator({
        // 表示的是图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
               
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength: {
                        min: 3,
                        max: 6,
                        message: '用户名长度必须在3到6位之间'
                    },
                   //表单校验效果就是用来回调作用的如果没有回调作用是不会有任何效果的
                   callback:{
                       message:'用户名错误'
                   }
                },
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '邮箱不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '用户名长度必须在6到12位之间'
                    },
                    callback:{
                        message:'密码错误'
                    }
                }
            }
        }
    })
})
// 给表单注册校验成功的事件
$("#form").on('success.form.bv', function (e) {
   //阻止浏览器默认的行为
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
        url:"/employee/employeeLogin",
        type:'post',
        data:$("#form").serialize(),
        success:function(info){
            // console.log(info)
            //非常重要======表单发送ajax请求后失败的情况
            if (info.error===1000) {
                // alert('账号有问题')
                //调用updateStatus 失败的状态把username改为失败状态
                //参数1:修改哪个字段
                //参数2:修改的状态大部分使用的是INVALID失败的状态参数
                //参数3指定显示哪个错误信息使用的是回调函数 callback
                $("#form").data('bootstrapValidator')
                .updateStatus('username','INVALID','callback')
               
                
            }else if (info.error===1001) {
                //密码错误
                $("#form").data('bootstrapValidator')
                .updateStatus('username','INVALID','callback')
               
                
                // alert('密码有误')
            }else if (info.success) {
                location.href="index.html"
                
            }
                
            

            

        }

    })
})

// 表单重置功能
$('[type=reset]').on('click',function(){
    //调用表单的插件的resetForm方法
    $("#form").data('bootstrapValidator').resetForm(true);
})