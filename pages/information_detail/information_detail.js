// pages/information_detail/information_detail.js
var app = getApp();
var ss = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bxdanid:""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.bxdanid);
    this.setData({
      bxdanid: options.bxdanid
    })
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
      url: 'http://localhost:8090/bxt/bxdandetail',
      method: 'GET',
      data: { bxdanid: that.data.bxdanid },
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
          list.bxdan['createtime'] = ss.formatTime(list.bxdan['createtime'], 'Y-M-D h:m')
          that.setData({
            bxdandetail: list.bxdan
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
})