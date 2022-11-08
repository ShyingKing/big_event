let i = 2
$('body').html(`请先登录,3s后自动跳转`)
let time1 = setInterval(function () {
    if (i === 0) clearInterval(time1)
    $('body').html(`请先登录,${i}s后自动跳转`)
    i--
}, 1000)
setTimeout(() => {
    location.href = '/login.html'
}, 3000);