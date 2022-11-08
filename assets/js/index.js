$(function () {
    getUserInfo()
    $('#btnLogout').on('click', function (index) {
        layer.confirm('是否确定要退出?', { icon: 3, title: '提示' }, function (index) {
            // 清楚本地的token
            localStorage.removeItem('token')
            location.href = '/login.html'
            // 关闭弹出框
            lay.close(index)
        })

    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if(res.status === 0)
            // 调用 renderAvator 渲染用户头像
            renderAvator(res.data)
        },
        complete: function (res) {
            if (res.responseJSON !== 0 && res.responseJSON.message === '身份认证失败！') {
                location.href = '/relogin.html'
                localStoragerem.oveItem('token')
            }
        }
    })
}

function renderAvator(user) {
    let name = user.nickname || user.username
    $('#welcome').html(`欢迎  ${name}`)
    // 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.userinfo img').attr('src', user.user_pic)
        $('.userinfo .text-avator').hide()
    } else {
        // 渲染文字头像
        let first = name[0].toUpperCase()
        $('.userinfo .text-avator').html(first).show()
        $('.userinfo img').hide()
    }

}