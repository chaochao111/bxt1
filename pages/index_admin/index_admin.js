// pages/index_admin/index_admin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isdisplay:true,
  },
  renyuanguanli:function(){
    wx.navigateTo({
      url: '/pages/admin_renyuan/admin_renyuan',
    })
  },
  quyuguanli: function () {
    wx.navigateTo({
      url: '/pages/admin_quyu/admin_quyu',
    })
  },
  xinxiguanli: function () {
    wx.navigateTo({
      url: '/pages/admin_xinxi/admin_xinxi',
    })
  },
  wentiguanli: function () {
    wx.navigateTo({
      url: '/pages/admin_wenti/admin_wenti',
    })
  },
  gonggaogunali: function () {
    wx.navigateTo({
      url: '/pages/admin_gonggao/admin_gonggao',
    })
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
})