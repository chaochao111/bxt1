// pages/admin_mechanicadd/admin_mechanicadd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addUrl:"http://localhost:8090/bxt/addmechanic",
    mechanics1: {
      mechanicsex:"女"
    },
    
    buildinglist: [],
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
  select: function (e) {
    this.setData({
      buildingname: e.detail.value
    })
    this.setData({
      buildingid: e.detail.id
    })
    this.data.mechanics1.mechanicbuildingname = e.detail.value;
    this.data.mechanics1.mechanicbuildingid = e.detail.id;
  },
  select1: function (e) {
    this.data.mechanics1.typid = e.detail.id;
    this.data.mechanics1.typname = e.detail.value;
  },

  // 性别单选框
  radiochange: function (e) {
    this.setData({
      mechanicsex: e.detail.value
    })
    this.data.mechanics1.mechanicsex = this.data.mechanicsex;
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
    var that=this;
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
          var list = list.buildings;
          var arr = [];
          for (var i = 0; i < list.length; i++) {
            var arrItem = {
              id: '',
              value: ''
            };
            arrItem.id = list[i].buildingid;
            arrItem.value = list[i].buildingname;
            arr.push(arrItem)
          }
          console.log(arr, '111111---------------11111')
          that.setData({
            buildinglist: arr
          })
          // that.data.buildinglist.value = list.buildings.buildingcode;
          // // that.data.bxdan.areaname = "private";
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
  frommechanicName: function(e) {
    this.setData({
      mechanicname: e.detail.value
    })
    this.data.mechanics1.mechanicname = this.data.mechanicname;
  },
  formmechanicNum: function (e) {
    this.setData({
      mechanicnum: e.detail.value
    })
    this.data.mechanics1.mechanicnum = this.data.mechanicnum;
  },
  formmechanicphone: function (e) {
    this.setData({
      mechanicphone: e.detail.value
    })
    this.data.mechanics1.mechanicphone = this.data.mechanicphone;
  },
  formTypname: function (e) {
    this.setData({
      typname: e.detail.value
    })
    this.data.mechanics1.typname = this.data.typname;
  },
  sumit:function(e){
    var that = this;
    var formData = this.data.mechanics1; //获取表数据
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
        }
        wx.showToast({
          title: toastText,
          icon: '',
          duration: 3000
        });
      }
    })

  },
  cancel:function(e){
    var self = this;
    var pages = getCurrentPages();
    if (pages.length == 1) {
      if (self.data.circleId && self.data.circleId > 0) {
        wx.redirectTo({
          url: "pages/admin_renyuan/admin_renyuan",
        });
      }
    } else {
      wx.navigateBack({ changed: true });//返回上一页
    }
  },
  reset: function (e) {
    var self = this;
    this.setData({
      mechanicname:'',
      mechanicnum:'',
      mechanicphone:'',
      typname:'',
    })
  },
})