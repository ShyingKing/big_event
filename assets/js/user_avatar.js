$(function () {
    var layer = layui.layer

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 为上传按钮绑定事件
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })

    // 更新上传文件
    $('#file').on('change', function (e) {
        // 获取用户上传的头像
        let fileList = e.target.files
        if (fileList === 0) return layer.msg('您还没有上传图片！')
        // 将文件转化为路径
        let file = fileList[0]
        let imgURL = URL.createObjectURL(file)
        // 重新初始化剪裁区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    // 为确认按钮绑定点击事件
    $('#btnUpload').on('click', function () {
        // 1. 要拿到用户裁剪之后的头像
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // 2. 调用接口，把头像上传到服务器
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avator: dataURL
            },
            success: function (res) {
                if (res.status !== 0) return layer.msg('头像上传失败！')
                layer.msg('头像上传成功！')
                window.parent.getUserInfo()
            }
        })
    })
})

