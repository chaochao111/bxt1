// pages/mechanic_login/mechanic_login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    testphone: "",
    code: "",
    testcode: "",
    mechanicId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getphone: function (e) {
    this.setData({
      phone: e.detail.value
    })
    this.data.phone = this.data.phone;
  },

  getcode: function (e) {
    this.setData({
      code: e.detail.value
    })
    this.data.code = this.data.code;
  },
  // 获取验证验证接口
  sendcode: function (e) {
    var that = this;
    wx.request({
      url: 'http://localhost:8090/bxt/sendCode',
      method: 'GET',
      data: {
        phone: this.data.phone
      },
      success: function (res) {
        var list = res.data;
        if (list == null) {
          var toastText = '获取数据失败';
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000 //弹出时间
          })
        } else {
          that.setData({
            testcode: list.testcode,
            testphone: list.testphone
          })
          this.data.testcode = this.testcode;
          this.data.testphone = this.testphone;

        }
      }
    })
  },
  // 登录接口
  mechanic_login: function (e) {
    var that = this;
    var testcode = that.data.testcode;
    var code = that.data.code;
    var testphone = that.data.testphone;
    var phone = that.data.phone;
    if (phone != "") {
      if (testcode == code && testphone == phone) {
        wx.request({
          url: 'http://localhost:8090/bxt/loginByPhone',
          method: 'GET',
          data: {
            phone: that.data.phone,
          },
          success: function (res) {
            if (res.statusCode == 200) {
              that.data.mechanicId = res.data.mechanicId;
              var mechanicId = that.data.mechanicId
              console.log(mechanicId);
              wx.navigateTo({
                url: '/pages/index_mechanic/index_mechanic?mechanicId=' + mechanicId,
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { },
              })
            } else {
              wx.showModal({
                title: '验证错误',
                content: '验证码与手机号不匹配，请重新输入',
                showCancel: false
              })
            }
          }
        })
      } else {
        wx.showModal({
          title: '错误',
          content: '请重新手机号输入，该号码没有权限登录',
          showCancel: false
        })
      }
    } else {
      wx.showModal({
        title: '输入为空',
        content: '请重新输入',
        showCancel: false
      })
    }
  }
})