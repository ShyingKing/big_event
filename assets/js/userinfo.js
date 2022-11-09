$(function () {
    let form = layui.form
    let layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) return layer.msg('请输入1~6位的用户名称！')
        }
    })
    initUserInfo()
    // 初始化用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) return layer.msg('获取用户信息失败！')
                // 调用form.val()渲染表单数据
                form.val('formUserInfo', res.data)
            }
        })
    }
    // 重置表单的数据
    $('#btnReset').on('click', function(e) {
        e.preventDefault()
        initUserInfo()
    })
    // 修改数据
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) return layer.msg('数据修改失败！')
                layer.msg('数据修改成功！')
                window.parent.getUserInfo()
            }
        })
    })
})