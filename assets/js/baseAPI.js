$.ajaxPrefilter(function (options) {
  // 统一设置请求根路径
  if (options.url.indexOf('http') === -1) {
    // console.log(options.url)
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    // options.url = 'http://www.liulongbin.top:3007' + options.url
  }

  // 统一设置有权限接口的 headers 请求头
  const tokenStr = localStorage.getItem('token')
  if (options.url.indexOf('/my/') !== -1 && tokenStr) {
    options.headers = {
      Authorization: tokenStr
    }
  }

  // 监听请求完成时的回调函数
  options.complete = function (res) {
    if (res.responseJSON.message === '身份认证失败！') {
      // 身份认证失败
      // 清空本地存储 & 强制用户跳转到登录页
      localStorage.clear()
      location.href = 'login.html'
    }
  }
})
