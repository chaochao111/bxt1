// pages/my_information/my_information.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

    myinfo: {
    }
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
      url: 'http://localhost:8090/bxt/finduser',
      method: 'GET',
      data: { openid: app.globalData.openid },
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
            myinfo: list.user
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
  //监听输入事件
  formusernum: function (e) {
    this.setData({
      usernum: e.detail.value
    })
    this.data.myinfo.usernum = this.data.usernum;
  },
  formusername: function (e) {
    this.setData({
      username: e.detail.value
    })
    this.data.myinfo.username = this.data.username;
  },
  formusergrade: function (e) {
    this.setData({
      usergrade: e.detail.value
    })
    this.data.myinfo.usergrade = this.data.usergrade;
  },
  userbuildingname: function (e) {
    this.setData({
      buildingname: e.detail.value
    })
    this.data.myinfo.buildingname = this.data.buildingname;
    this.data.myinfo.buildingid = this.data.buildingname;
  },
  formuserroom: function (e) {
    this.setData({
      room: e.detail.value
    })
    this.data.myinfo.room = this.data.room;
  },
  formuserphone: function (e) {
    this.setData({
      phone: e.detail.value
    })
    this.data.myinfo.phone = this.data.phone;
  },
  formuseremail: function (e) {
    this.setData({
      useremail: e.detail.value
    })
    this.data.myinfo.useremail = this.data.useremail;
  },
  
  sumit:function(e){
    var that = this;
    var formData = this.data.myinfo; //获取表数据
    var url = 'http://localhost:8090/bxt/updateuser';//默认url
    wx.request({
      url: url,
      data: formData,
      method: 'POST',
      header: {
        // "Content-Type": "json"
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        var result = res.statusCode;
        var toastText = "操作成功";
        if (result != 200) {
          toastText = "操作失败！";
        }
        wx.showToast({
          title: toastText,
          icon: '',
          duration: 3000
        });
      }
    })
  }

})