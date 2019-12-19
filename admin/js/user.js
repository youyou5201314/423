$(function () {
    //发送ajax请求获取到用户数据
    $.get({
        url: BigNew.user_detail,
        success: function (res) {
            // console.log(res);
            // $('input.username').val(res.data.username);
            // $('input.nickname').val(res.data.nickname);
            // $('input.email').val(res.data.email);
            // $('input.password').val(res.data.password)
            for (var key in res.data) {
                $('input.' + key).val(res.data[key]);
                // console.log(key+"-------------"+res.data[key]);
            }
            $('img.user_pic').attr('src', res.data.userPic);
        }
    })

    //给文件域注册一个change事件，当选择图片之后，在图片标签中展示我们 选择的图片
    //用来处理用户选择图片的时候，有一个预览效果
    $('#exampleInputFile').on('change', function (e) {
        // console.log('文件域选择了文件');
        // console.log(this);
        // console.dir(this.files[0]);
        //图片对象
        let imgFile = this.files[0];
        let url = URL.createObjectURL(imgFile);
        // console.log(url);
        $('img.user_pic').attr('src', url);
    })

    //修改按钮注册点击事件
    $('.btn-edit').on('click', function (e) {
        //阻止默认行为
        e.preventDefault();

        //获取表单数据
        var form = $('#form')[0];
        var userdata = new FormData(form);
        // console.log(data);
        //发送ajax请求
        $.ajax({
            type: 'post',
            url: BigNew.user_edit,
            data: userdata,
            //阻止编译
            processData: false,
            //不需要设置请求的类型
            contentType: false,
            success: function (res) {
                // console.log(res);
                if (res.code == 200) {
                    //刷新一下当前这样用户页面
                    // window.location.reload();
                    //在子页面刷新父页面
                    // parent.window.location.reload();

                    $.ajax({
                        type: 'get',
                        url: window.BigNew.user_info,
                        success: function (res) {
                            console.log(res);
                            //获取服务器返回的数据，使用这些数据去渲染页面的内容
                            parent.$('.user_info img').attr('src', res.data.userPic);
                            parent.$('.user_info span').html('欢迎&nbsp;&nbsp;' + res.data.nickname + '');
                            parent.$('.user_center_link>img').attr('src', res.data.userPic);
                        }
                    })
                }
            }
        })
    })

})
