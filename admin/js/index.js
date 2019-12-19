
$(function () {
    //一进入到index页面就应该发送ajax请求获取用户 信息
    $.ajax({
        type: 'get',
        // url: "http://localhost:8080/api/v1/admin/user/info",
        url: window.BigNew.user_info,
        // dataType: 'json' //将返回的json格式的字符串转换成一个对象
        // 设置请求头，在请求头中带上token
        // headers: {
        //     'Authorization': window.localStorage.getItem('token')
        // },
        success: function (res) {
            // console.log(res);
            //获取服务器返回的数据，使用这些数据去渲染页面的内容
            $('.user_info img').attr('src', res.data.userPic);
            $('.user_info span').html('欢迎&nbsp;&nbsp;' + res.data.nickname + '');
            $('.user_center_link>img').attr('src', res.data.userPic);
        }
    })


    //退出处理
    // 1.获取到退出的元素，注册点击事件
    // 2.点击这个退出的时候，回到登录页面，将token清除
    $('.logout').on('click', function () {
        //清除的token
        window.localStorage.removeItem('token')
        //退出当前页面返回到登录页
        window.location.href = './login.html';
    })



    $('div.level01').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');

        if ($(this).index() == 1) {
            $('ul.level02').slideToggle();
            //a标签模拟点击事件需要使用原生DOM元素调用click()方法;jquery对象无法调用,所以在这里我们获取到的a标签的jQuery对象要转换为原生的对象去调用click()这个方法
            $('ul.level02 li:eq(0) a')[0].click();

            //点击这个div的时候，让其后面的箭头符号进行旋转，我们是通过添加一个类名的方式来处理
            $(this).find('b').toggleClass('rotate0');
        }
    })


    $('ul.level02 li').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
    })

    //ajax的原生的方式
    // let  xhr  = new XMLHttpRequest();
    // xhr.open('get','http://localhost:8080/api/v1/admin/user/info');
    // xhr.setRequestHeader('Authorization', window.localStorage.getItem('token'))
    // xhr.onreadystatechange = function() {
    //     if(xhr.status == 200 && xhr.readyState == 4) {
    //         let data = JSON.parse(xhr.responseText);
    //         console.log(data);
    //     }
    // }
    // xhr.send()






})
