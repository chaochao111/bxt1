// pages/index_mechanic/index_mechanic.js
var app = getApp();
var ss = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    winWidth: 0,
    winHeight: 0,
    mechanicId:""
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
  //点击切换页面
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
  //点击开始维修按钮
  start_weixiu:function(e){
    var that=this
    var bxdanid=e.target.dataset.bxdanid;
    var times = (new Date()).getTime();
    this.data.starttime = new Date(times);
    var starttime=this.data.starttime;
    wx.showModal({
      title: '提示',
      content: '确定开始维修吗？',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          wx.request({
            url: 'http://localhost:8090/bxt/updatestart',
            method: 'POST',
            data: {
              bxdanid: bxdanid,
              state: "1",
              starttime: starttime
            },
            success: function (res) {
              console.log(res);
              var result = res.statusCode;
              var toastText = "操作成功";
              if (result != 200) {
                toastText = "操作失败！";
              } else {
                that.freshen();
              }
              wx.showToast({
                title: toastText,
                icon: '',
                duration: 3000
              });
            },
            fail:function(){
              wx.showToast({
                title: '开始失败',
                icon: '', 
                duration: 2000
              })
            }
          })
          onShow();
        } else {//这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })
    that.getfindAllBuildingByMechanicId();
  },
  end_weixiu: function (e) {
    var that = this;
    var bxdanid = e.target.dataset.bxdanid;
    var times = (new Date()).getTime();
    this.data.endtime = new Date(times);
    var endtime = this.data.endtime;
    wx.showModal({
      title: '提示',
      content: '确定维修完成吗？',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          console.log('用户点击确定')
          wx.request({
            url: 'http://localhost:8090/bxt/updateend',
            method: 'POST',
            data: {
              bxdanid: bxdanid,
              state: "2",
              endtime: endtime
            },
            success: function (res) {
              console.log(res);
              var result = res.statusCode;
              var toastText = "操作成功";
              if (result != 200) {
                toastText = "操作失败！";
              } else {
                that.freshen();
              }
              wx.showToast({
                title: toastText,
                icon: '',
                duration: 3000
              });
            },
            fail: function () {
              wx.showToast({
                title: '完成失败',
                icon: '',
                duration: 2000
              })
            }
          })
        } else {//这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.mechanicId);
    this.setData({
      mechanicId: options.mechanicId
    })
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
    var taht=this;
    taht.getfindAllBuildingByMechanicId();
    taht.getfindAllBuildingByMechanicId1();
    taht.getfindAllBuildingByMechanicId2();
  },
  getfindAllBuildingByMechanicId:function(){
    var that = this;
    var mechanicId = that.data.mechanicId
    wx.request({
      url: 'http://localhost:8090/bxt/findAllBuildingByMechanicId',
      method: 'GET',
      data: {
        mechanicId: mechanicId,
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
          for (var i = 0; i < list.unrepaired.length; i++) {
            list.unrepaired[i]['createtime'] = ss.formatTime(list.unrepaired[i]['createtime'], 'Y-M-D h:m')
            console.log(list.unrepaired[i]['createtime']);
          }
          that.setData({
            unrepaired: list.unrepaired
          })
        }
      }
    })
  },
  getfindAllBuildingByMechanicId1: function () {
    var that = this;
    var mechanicId = that.data.mechanicId
    wx.request({
      url: 'http://localhost:8090/bxt/findAllBuildingByMechanicId1',
      method: 'GET',
      data: {
        mechanicId: mechanicId,
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
            repaireding: list.repaireding
          })
        }
      }
    })
  },
  getfindAllBuildingByMechanicId2: function () {
    var that = this;
    var mechanicId = that.data.mechanicId
    wx.request({
      url: 'http://localhost:8090/bxt/findAllBuildingByMechanicId2',
      method: 'GET',
      data: {
        mechanicId: mechanicId,
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
            repaireded: list.repaireded
          })
        }
      }
    })
  },
  freshen:function(){
    var that=this
    that.onShow();
    that.setData({
      unrepaired: list.unrepaired
    });
    that.setData({
      repaireding: list.repaireding
    })
    that.setData({
      repaireded: list.repaireded
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