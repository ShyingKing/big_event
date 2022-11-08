// 每次调用$.get, $.post, $.ajax 时都会调用这个函数
//  在这个函数中，我们能拿到Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    options.url = 'http://127.0.0.1:3007' + options.url

    if (options.url.indexOf('/my')) {
        // 同一为有权限的接口， 设置header
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete = function(res) {
        if (res.responseJSON !== 0 && res.responseJSON.message === '身份认证失败！') {
            location.href = '/relogin.html'
            localStoragerem.oveItem('token')
        }
    }
    
})
