// pages/my_help/my_help.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    helplist: [],
    
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
      url: 'http://localhost:8090/bxt/findAllHelp',
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
          that.setData({
            helplist: list.helps
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
  showHide(e) {

    var contentFor = this.data.helplist;

    for (var i = 0; i < contentFor.length; i++) {
      　　if (e.currentTarget.dataset.changeid == contentFor[i].id) {
          var printPrice = "helplist[" + i + "].istrue";
          if (this.data.helplist[i].istrue==1) {
          　　　　　　this.setData({
            　　　　　　　　[printPrice]: 0
          　　　　　　});
        　　　　} else {
          　　　　　　this.setData({
            　　　　　　　　[printPrice]: 1
          　　　　　　});
        　　　　}
      　　} else {
          var printPrice1 = "helplist[" + i + "].istrue";
        　　　　　　this.setData({
          　　　　　　　　[printPrice1]: 0
        　　　　　　});
      　　　　}
    　　}
  }
})