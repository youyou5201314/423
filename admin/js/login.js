 //使用jQuery，写一个入口函数
 $(function () {
    $('.input_sub').on('click', function (e) {
      //按钮是一个submit按钮，有一个默认提交行为，我们不需要，要阻止
      e.preventDefault();
      //获取用户名和密码
      let userName = $('.input_txt').val().trim();
      let userpwd = $('.input_pass').val().trim();
      //做非空判断
      if (userName == '' || userpwd == '') {
        $('.modal-body').text('你傻啊，用户名和密码能为空吗？');
        $('#myModal').modal();
        return;
      }
      //发送ajax请求
      $.ajax({
        type: 'post',
        // url: 'http://localhost:8080/api/v1/admin/user/login',
        url: window.BigNew.user_login,
        data: {
          username: userName,
          password: userpwd
        },
        dataType: 'json',
        success: function (res) {
          $('.modal-body').text(res.msg);
          $('#myModal').modal();
          // console.log(res);
          if (res.code == 200) {
            //登录成功  本地存储
            window.localStorage.setItem('token',res.token)
            //登录成功，跳转到首页
            // window.location.href = './index.html'
            $('#myModal').on('hidden.bs.modal', function (e) {
              // console.log('我已经被隐藏了，你可以 干活');
              window.location.href = './index.html';
            })
          }
        }
      })

    })


  })