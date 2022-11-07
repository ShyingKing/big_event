$(function () {
    // 点击去注册链接
    $('#link_login').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击去登录链接
    $('#link_reg').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 从layui中获取form对象
    let form = layui.form
    let layer = layui.layer
    // 通过form.verify()定义验证规则
    form.verify({
        // 自定义一个叫 pwd 的校验规则
        pwd: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致
        repwd: function(value) {
            // 通过形参拿到的是重复密码框的值
            // 还需要拿到密码框的值
            let pwd = $('.reg-box [name=password]').val()
            if(pwd !== value) return '两次密码不一致！'
        }
    })

    // 监听注册表单提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        const data = {username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val()}
        $.post('/api/reguser', data, 
        function(res) {
            if(res.status !== 0) return layer.msg(res.message)
            layer.msg('注册成功')
            // 模拟点击行为
             $('#link_reg').click()

        })
    })

    // 监听登陆表单提交事件
    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单数据
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) return layer.msg('登录失败') 
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/index.html' 
            }
        })
    })
})
