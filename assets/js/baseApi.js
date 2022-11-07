// 每次调用$.get, $.post, $.ajax 时都会调用这个函数
//  在这个函数中，我们能拿到Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    options.url = 'http://127.0.0.1:3007' + options.url
})