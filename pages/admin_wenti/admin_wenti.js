// pages/admin_wenti/admin_wenti.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isdisplay1: true,
    helplist:[],
    addUrl: 'http://localhost:8090/bxt/addhelp',
    helps:{
      name:"",
      content: "",
      istrue:0  
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
  //删除问题弹框
  delwenti: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (sm) {
        if (sm.confirm) {
          wx.request({
            url: 'http://localhost:8090/bxt/delhelp',
            data: { id: e.target.dataset.id },
            method: 'GET',
            success: function (res) {
              var result = res.statusCode;
              var toastText = "删除成功";
              if (result != 200) {
                toastText = "删除失败";
              } else {
                that.data.helplist.splice(e.target.dataset.index, 1);
                that.setData({
                  helplist: that.data.helplist
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
//新增问题弹窗
  addwenti: function () {
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
    var formData = this.data.helps; //获取表数据
    var url = that.data.addUrl;  //默认url
    wx.request({
      url: url,
      // data: JSON.stringify(formData),
      data:formData,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        var result = res.statusCode;
        var toastText = "操作成功";
        if (result != 200) {
          toastText = "操作失败！";
        }else{
          that.onShow();
          that.setData({
            helplist: that.data.helplist
          });
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
  wentiName: function (e) {
    this.setData({
      name: e.detail.value
    })
    this.data.helps.name = this.data.name;
  },
  wentiContent:function(e){
    this.setData({
      content:e.detail.value
    })
    this.data.helps.content = this.data.content;

  }
})