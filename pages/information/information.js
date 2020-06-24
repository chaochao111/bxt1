// pages/information/information.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    winWidth: 0,
    winHeight: 0,
    isdisplay: true,
    isdisplay1:true,
    bxdanid:"",
    feedback: "已解决"

  },
  switchNav: function (e) {
    var page = this;
    if (this.data.currentTab == e.target.dataset.current) {
      return false;
    }
    else {
      page.setData({ currentTab: e.target.dataset.current });
    }
  },
  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },

    information_detail: function (e) {
      var detailbxdanid = e.currentTarget.dataset.detailbxdanid
      this.data.detailbxdanid = detailbxdanid;
      wx.navigateTo({
        url: '/pages/information_detail/information_detail?bxdanid=' + this.data.detailbxdanid,
      })
    },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        page.setData({ winWidth: res.windowWidth });
        page.setData({ winHeight: res.windowHeight });
      },
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
      url: 'http://localhost:8090/bxt/unfinishedUserBxdan',
      method: 'GET',
      data: {
        userId: app.globalData.openid,
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
            unfinished: list.unfinished
          })
        }
      }
    })
    wx.request({
      url: 'http://localhost:8090/bxt/finishedUserBxdan',
      method: 'GET',
      data: {
        userId: app.globalData.openid,
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
            finished: list.finished
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
  radiochange: function (e) {
    this.setData({
      feedback: e.detail.value
    })
    this.data.bxdan.feedback = this.data.feedback;
  },
  fankui: function (e) {
    this.setData({
      showModal: true,
      isdisplay: false
    })
    var bxdanid = e.target.dataset.bxdanid
    this.data.bxdanid = bxdanid;
  },
  pingjia: function (e) {
    this.setData({
      showModal1: true,
      isdisplay1: false
    })
    var bxdanid = e.target.dataset.bxdanid
    this.data.bxdanid = bxdanid;
  },
  inputassess:function(e){
    this.setData({
      assess:e.detail.value
    })
    this.data.assess=this.data.assess;
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () { },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false,
      isdisplay: true
    });
  },
  hideModal1: function () {
    this.setData({
      showModal1: false,
      isdisplay1: true
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  onCancel1: function () {
    this.hideModal1();
  },
  /**
   * 对话框确认按钮点击事件
   */
  //反馈提交按钮事件
  onConfirm: function () {
    var times = (new Date()).getTime();
    this.data.backtime = new Date(times);
    wx.request({
      url: 'http://localhost:8090/bxt/updateback',
      method: 'POST',
      data: {
        bxdanid: this.data.bxdanid,
        state: "3",
        backtime: this.data.backtime,
        feedback: this.data.feedback
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
          that.freshen();
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
          
        }
      }
    })
    this.hideModal();
  },
  //评价提交按钮
  onConfirm1: function () {
    var times = (new Date()).getTime();
    this.data.assesstime = new Date(times);
    wx.request({
      url: 'http://localhost:8090/bxt/updateassess',
      method: 'POST',
      data: {
        bxdanid:this.data.bxdanid,
        state:"4",
        assesstime: this.data.assesstime,
        assess: this.data.assess
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
          that.freshen();
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
    this.hideModal1();
  },
    freshen: function () {
    var that = this
    that.onShow();
      that.setData({
        finished: list.finished
      })
  }
})