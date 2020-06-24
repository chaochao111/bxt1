// pages/admin_gonggao/admin_gonggao.js
var app = getApp();
var ss = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isdisplay1: true,
    noticelist: [],
    addUrl: 'http://localhost:8090/bxt/addnotice',
    notices: {
      title: "",
      content: "",
      creattime: ""
    },

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
      url: 'http://localhost:8093/bxt/findallnotice',
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
  addgonggao: function () {
    this.setData({
      showModal1: true,
      isdisplay1: false
    })
  },
  hideModal1: function () {
    this.setData({
      showModal1: false,
      isdisplay1: true
    });
  },
  onCancel1: function () {
    this.hideModal1();
  },
  onConfirm1: function (e) {
    var that = this;
    var times=(new Date()).getTime();
    this.data.notices.creattime = new Date(times);
    // this.data.notices.creattime = times;
    var formData = this.data.notices; //获取表数据
    var url = that.data.addUrl;  //默认url
    wx.request({
      url: url,
      // data: JSON.stringify(formData),
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
        } else {
          that.onShow();
        }
        wx.showToast({
          title: toastText,
          icon: '',
          duration: 3000
        });
      }
    })
    this.hideModal1();
  },
    gonggaoTitle: function (e) {
    this.setData({
      title: e.detail.value
    })
      this.data.notices.title = this.data.title;
  },
  gonggaoContent: function (e) {
    this.setData({
      content: e.detail.value
    })
    this.data.notices.content = this.data.content;

  }

})