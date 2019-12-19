$(function () {
    //发送ajax请求
    getData();
    function getData() {
        $.get({
            url: BigNew.category_list,
            success: function (res) {
                // console.log(res);
                let htmlStr = template('categoryList', res);
                // console.log(htmlStr);
                $('tbody').html(htmlStr);
            }
        })
    }

    //当点击取消按钮的时候，将表单中的数据全部重置
    $('#btn-cancel').on('click', function () {
        $('form')[0].reset();
    })


    //当模态框在显示的时候，我们需要知道是哪一个按钮被点击了
    $('#myModal').on('show.bs.modal', function (e) {
        //e.relatedTarget获取到的就是触发这个模态框显示的dom元素
        let dom = e.relatedTarget;

        //判断到底是谁触发了这个模态框显示
        if (dom == $('#xinzengfenlei')[0]) {
            $('#exampleModalLabel').text('新增文章分类')
            $('#btn-confirm').text('新增').addClass('btn-success').removeClass('btn-primary');
            //将表单中的数据全部重置，而reset()重置这个方法是原生对象的。
            $('form')[0].reset();
            $('#btn-confirm').on('click', function () {
                let name = $('#recipient-name').val()
                let slug = $('#message-text').val()
                if (name == '' || slug == '') {
                    alert('请填写数据')
                    return;
                }
                $.post({
                    url: BigNew.category_add,
                    data: {
                        name: name,
                        slug: slug
                    },
                    success: function (res) {
                        if (res.code == 201) {
                            $('#myModal').modal('hide')
                            getData();
                        }
                    }
                })
            })

        } else {
            $('#exampleModalLabel').text('编辑文章分类')
            $('#btn-confirm').text('编辑').addClass('btn-primary').removeClass('btn-success');
            //当弹出编辑的模态框的时候，需要得到一个文章类别id，根据这个id，发送ajax请求获得具体的文章类别信息
            let cateId = $(dom).attr('data-id');
            // console.log(cateId);
            $.get({
                url: BigNew.category_search,
                data: {
                    id: cateId
                },
                success: function (res) {
                    console.log(res);
                    if (res.code == 200) {
                        $('#recipient-name').val(res.data[0].name)
                        $('#message-text').val(res.data[0].slug)
                        $('#cateid').val(res.data[0].id)
                    }
                }
            })
            $('#btn-confirm').on('click', function () {
                let name = $('#recipient-name').val()
                let slug = $('#message-text').val()
                let id = $('#cateid').val()
                $.post({
                    url: BigNew.category_edit,
                    data: {
                        id: id,
                        name: name,
                        slug: slug
                    },
                    success: function (res) {
                        // console.log(res);
                        if (res.code == 200) {
                            $('#myModal').modal('hide')
                            getData();
                        }
                    }
                })
            })

        }

        // 任务： 只对btn-confirm注册一次点击事件，然后判断是新增还是编辑，然后做对应的处理？？？






    })



    //给删除注册一个点击事件
    // 因为这个删除是动态生成的，我们不能直接给他注册点击事件，需要使用委托

    $('tbody').on('click', '#btn-delete', function () {
        let deleteId = $(this).attr('data-id');
        // console.log(deleteId);
        let ans = confirm('你确定要删除吗？');
        // console.log(ans);
        if (ans) {
            $.post({
                url: BigNew.category_delete,
                data: {
                    id: deleteId
                },
                success: function (res) {
                    if(res.code == 204) {
                        getData();
                    }
                }
            })
        }
    })



})

