// pages/admin_quyu/admin_quyu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isdisplay1: true,
    buildinglist: [],
    addUrl: 'http://localhost:8090/bxt/addbuilding',
    buildings: {
      buildingcode: "",
      buildingsex: "",
      detailaddress: "",
      buildingname:"",
    },
    isHideLoadMore: true,
    isHideNoMore: true,
    isClear: true, //用来判断是否清除原列表数组数据，刷新要清空数组数据，上拉加载不需要清空数组而是page++之后访问到的数组concat进原数组
    pageNum: 1,
    totalPage: 0,
    list: [],
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
  getList:function(){
    var that = this;
    wx.request({
      url: 'http://localhost:8090/bxt/findallbuilding',
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
            buildinglist: list.buildings
          })
        }
      }
    }),
      setTimeout(function () {
        wx.hideLoading()
      }, 200)

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    //判断双击点击时间点
    that.setData({
      pageNum: 1,
      isHideNoMore: true,
      isClear: true,
    })
    wx.showLoading({
      title: '加载中',
    })
    that.getList()
  },
  onPullDownRefresh: function () {
    let that = this;
    that.setData({
      loadingimg: false,
      isHideNoMore: true,
      pageNum: 1,
      isClear: true
    })
    wx.showLoading({
      title: '加载中',
    })
    that.getList()
    setTimeout(function () {
      wx.stopPullDownRefresh()
      that.setData({
        loadingimg: true
      })
    }, 1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;

    that.setData({
      isHideLoadMore: false,
      isHideNoMore: true,
      isClear: false,
    })

    if (that.data.pageNum >= that.data.totalPage) {
      setTimeout(() => {
        this.setData({
          isHideLoadMore: true,
          isHideNoMore: false,
        })
      }, 0)
      return;
    }

    that.data.pageNum++;
    that.getList();

    setTimeout(() => {
      this.setData({
        isHideLoadMore: true,
      })
    }, 1000)
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
  //删除区域弹框
  delquyu: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (sm) {
        if (sm.confirm) {
          wx.request({
            url: 'http://localhost:8090/bxt/delbuilding',
            data: { buildingid: e.target.dataset.id },
            method: 'GET',
            success: function (res) {
              var result = res.statusCode;
              var toastText = "删除成功";
              if (result != 200) {
                toastText = "删除失败";
              } else {
                that.data.buildinglist.splice(e.target.dataset.index, 1);
                that.setData({
                  buildinglist: that.data.buildinglist
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
  addquyu: function () {
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
    var self = this;
    this.setData({
      mechanicname: '',
      mechanicnum: '',
      mechanicphone: '',
      typname: '',
    })
  },
  onConfirm1: function (e) {
    var that = this;
    var formData = this.data.buildings; //获取表数据
    var url = that.data.addUrl;  //默认url
    wx.request({
      url: url,
      data: formData,
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
            buildinglist: that.data.buildinglist
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
  buildingCode: function (e) {
    this.setData({
      buildingcode: e.detail.value
    })
    this.data.buildings.buildingcode = this.data.buildingcode;
    this.data.buildings.buildingname = this.data.buildingcode;
  },
  buildingSex: function (e) {
    this.setData({
      buildingsex: e.detail.value
    })
    this.data.buildings.buildingsex = this.data.buildingsex;

  },
  detailAddress: function (e) {
    this.setData({
      detailaddress: e.detail.value
    })
    this.data.buildings.detailaddress = this.data.detailaddress;
  }
})