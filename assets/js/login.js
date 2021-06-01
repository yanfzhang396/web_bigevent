$(function () {
  // 自定义校验规则
  layui.form.verify({
    // 自定义的校验规则（验证两个密码框的值是否相等：如果相等则校验通过；否则校验失败！）
    rePwd: function (val) {
      // 获取到密码框的值
      const pwd = $('.reg-box [name="password"]').val().trim()
      if (pwd !== val) {
        // 两个密码框的值不一致
        return '输入的两次密码不一致！'
      }
      // 如果校验通过，不需要做任何处理
    },
    // 校验密码长度的验证规则
    pwd: [/^[\S]{6,12}$/, '密码的长度为6-12个字符，且不能包含空格！']
  })

  // 点击了去注册的链接
  $('#link-reg').on('click', function () {
    // 展示注册盒子
    $('.reg-box').show()
    // 隐藏登录盒子
    $('.login-box').hide()
  })

  // 点击了去登录的链接
  $('#link-login').on('click', function () {
    // 展示登录盒子
    $('.login-box').show()
    // 隐藏注册盒子
    $('.reg-box').hide()
  })

  // 为注册的表单绑定 submit 事件
  $('.reg-box form').on('submit', function (e) {
    // 1. 阻止表单的默认提交
    e.preventDefault()

    // 2. 发送 Ajax 请求
    $.ajax({
      type: 'POST',
      url: '/api/reguser',
      // data: $(this).serialize(),
      data: {
        username: $('.reg-box [name="username"]').val().trim(),
        password: $('.reg-box [name="password"]').val().trim()
      },
      success: function (res) {
        if (res.status === 0) {
          // 注册成功!
          layer.msg('注册成功,请登录!')
          // 模拟"去登录"的点击行为
          $('#link-login').click()
        } else {
          // 注册失败!
          layer.msg(res.message)
        }
      }
    })
  })
  // 为登录表单绑定 submit 事件
  $('.login-box form').on('submit', function (e) {
    // 阻止表单的默认提交行为
    e.preventDefault()
    // 发起 Ajax 的登录请求
    $.post('/api/login', $(this).serialize(), function (res) {
      if (res.status === 0) {
        // 登录成功
        layer.msg('登录成功!')
        // 把得到的 token 的值,存储到 localStorage 中
        localStorage.setItem('token', res.token)
        // 跳转到 index.html 页面
        location.href = 'index.html'
      } else {
        // 登录失败
        layer.msg('登录失败!')  
      }
    })
  })
})
