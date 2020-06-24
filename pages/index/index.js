// pages/index/index.js
var app=getApp();
var ss = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticelist: [],
    areaname: "public"

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
    var that = this;
    wx.request({
      url: 'http://localhost:8090/bxt/findallnotice',
      method: 'GET',
      data: {},
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
          for (var i = 0; i < list.notices.length; i++) {
            list.notices[i]['creattime'] = ss.formatTime(list.notices[i]['creattime'], 'Y-M-D h:m')
            console.log(list.notices[i]['creattime']);
          }
          that.setData({
            noticelist: list.notices
          })
        }
      }
    })
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
  index_public: function () {
    wx.switchTab({
      // url: '../pageB/pageB?used_id=' + that.data.used_id + '&used_name=' + that.data.used_name,
      url: '/pages/repair/repair?areaname'+ this.data.areaname,
    })
  },
  index_personal: function () {
    wx.switchTab({
      url: '/pages/repair/repair',
    })
  },
  index_mechanic: function () {
    wx.navigateTo({
      url: '/pages/mechanic_login/mechanic_login',
      // url: '/pages/index_mechanic/index_mechanic',
    })
  },
  index_admin: function () {
    wx.navigateTo({
      url: '/pages/admin_login/admin_login',
      // url: '/pages/index_admin/index_admin',
    })
  }
})