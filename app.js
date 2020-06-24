//app.js
App({
  globalData: {
    userInfo: null,
    openid: null
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey
        console.log(res.code)
        if (res.code) {
          console.log(res.code)
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',//微信服务器获取appid的网址不用变
            method: 'post',//必须是post方法
            data: {
              js_code: res.code,
              appid: 'wx8bac75b2acf8b9d0',//仅为实例appid
              secret: '691e0cdafea0272a5110cf9976c3e302',//仅为实例secret
              grant_type: 'authorization_code'
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded',
            },
            success: function (response) {
              console.log(response.data)
              wx.setStorageSync('app_openid', response.data.openid);
              wx.setStorageSync('sessionKey', response.data.session_key)
              //将session_key 存入本地缓存命名为SessionKey
              var openid = response.data.openid
              wx.request({
                url: "http://localhost:8090/bxt/adduser",
                data: {
                  openid:openid
                },
                method: 'POST',
                header: {
                  // "Content-Type": "json"
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                  console.log(res);
                  var app = getApp();
                  app.globalData.openid = res.data.users.openid;
                  console.log(app.globalData.openid);
                }
              })
            }
          })
        } else {
          console.log("登陆失败");
        }
      }
      // success: res => {
      //   // 发送 res.code 到后台换取 openId, sessionKey, unionId
      // }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(this.globalData.userInfo);
              console.log(123);

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  }
})