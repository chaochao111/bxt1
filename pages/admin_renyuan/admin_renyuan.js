// pages/admin_renyuan/admin_renyuan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select: false,
    tihuoWay: '家具',
    mechaniclist: [],
    findallUrl: 'http://localhost:8090/bxt/findallmechanic',
    goodlist: [{
      "id": "1",
      "value": "家具类"
    },
    {
      "id": "2",
      "value": "电器类"
    },
    {
      "id": "3",
      "value": "门窗类"
    },
    {
      "id": "4",
      "value": "其他"
    }]
  },
  select1: function (e) {
    this.data.typid = e.detail.id;
    this.data.typname = e.detail.value;
  },

  bindShowMsg() {
    this.setData({
      select: !this.data.select
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
    var that = this;
    wx.request({
      url: 'http://localhost:8090/bxt/findallmechanic',
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
            mechaniclist: list.mechanics
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
  delrenyuan: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (sm) {
        if (sm.confirm) {
          wx.request({
            url: 'http://localhost:8090/bxt/delmechanic',
            data: { id: e.target.dataset.id },
            method: 'GET',
            success: function (res) {
              var result = res.statusCode;
              var toastText = "删除成功";
              if (result != 200) {
                toastText = "删除失败";
              } else {
                that.data.mechaniclist.splice(e.target.dataset.index, 1);
                that.setData({
                  mechaniclist: that.data.mechaniclist
                });
              }
              wx.showToast({
                title: toastText,
                icon: '',
                duration: 2000
              });
            }
          })
        }
      }
    })
  },
  addrenyuan: function () {
    wx.navigateTo({
      url: '/pages/admin_mechanicadd/admin_mechanicadd',
    })
  },
  shaixuan:function(e){
    var that = this;
    wx.request({
      url: 'http://localhost:8090/bxt/findMechanicBytypid',
      data: { typid: this.data.typid },
      method: 'GET',
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
            mechaniclist: list.mechanics
          });
        }
      }
    })
  },
  freshen: function () {
    var that = this
    // that.onShow();
    that.setData({
      mechaniclist: list.mechanics
    });
  },
})