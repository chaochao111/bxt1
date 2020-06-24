// pages/repair/repair.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addUrl: "http://localhost:8090/bxt/addBxdan",
    bxdan: {
    },
    buildingid:"",
    buildingname:"",
    typid:"",
    images: [],
    imglist: '',
    img1: '',
    buildinglist: [],
    newNum:"",
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
    this.data.bxdan.buildingname = e.detail.value;
    this.data.bxdan.buildingid = e.detail.id;
    console.log(this.data.bxdan.buildingname);
  },
  select1: function (e) {
    // this.setData({
    //   typid: e.detail.id
    // })
    this.data.bxdan.typid = e.detail.id;
    console.log(this.data.bxdan.typid);
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
          that.data.buildingname = that.data.bxdan.buildingname;
          that.setData({
            newNum: that.data.buildingname
          })
          that.data.bxdan = that.data.myinfo;
          that.data.bxdan.areaname = "私人区域";
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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
  // 区域单选框
  radiochange: function (e) {
    this.setData({
      areaname: e.detail.value
    })
    this.data.bxdan.areaname = this.data.areaname;
  },
  // 姓名输入框
  inputusername: function (e) {
    this.setData({
      username: e.detail.value
    })
    this.data.bxdan.username = this.data.username;
  },
  //学号输入框
  inputusernum: function (e) {
    this.setData({
      usernum: e.detail.value
    })
    this.data.bxdan.usernum = this.data.usernum;
  },
  //联系电话输入框
  inputphone: function (e) {
    this.setData({
      phone: e.detail.value
    })
    this.data.bxdan.phone = this.data.phone;
  },
  //宿舍号输入框
  inputroom: function (e) {
    this.setData({
      room: e.detail.value
    })
    this.data.bxdan.room = this.data.room;
  },
  //详细描述
  inputdescription: function (e) {
    this.setData({
      description: e.detail.value
    })
    this.data.bxdan.description = this.data.description;
  },


  chooseImage: function () {
    var that = this;
    console.log('aaaaaaaaaaaaaaaaaaaa')
    console.log(getApp().globalData.URL)
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success: function (res4) {
        console.log('ssssssssssssssssssssssssss')
        const tempFilesize = res4.tempFiles[0].size
        console.log(tempFilesize)
        if (tempFilesize < 512000) {
          wx.showToast({
            title: '正在上传...',
            icon: 'loading',
            mask: true,
            duration: 2000,
            success: function (res4) {
              console.log(res4);
            }
          })
          that.setData({
            img1: res4.tempFilePaths
          })
          //获取第一张图片地址 
          var filep = res4.tempFilePaths[0]
          that.setData({
            imglist: filep,
            img1: filep
          })
          console.log(filep)
        } else {
          wx.showToast({
            title: '上传图片不能大于500k!',  //标题
            icon: 'none'       //图标 none不使用图标，详情看官方文档

          })
        }
        console.log(res4.tempFilePaths[0])
        //缓存下 

        //向服务器端上传图片 
        // getApp().data.servsers,这是在app.js文件里定义的后端服务器地址 
      }
    })
  },
  // // 提交
  sumit: function () {
    var that = this;
    var times = (new Date()).getTime();
    this.data.bxdan.createtime = new Date(times);
    that.data.bxdan.state = "0";
    that.data.bxdan.userid = that.data.bxdan.openid;
    that.data.bxdan.picture = that.data.imglist;
    var formData = this.data.bxdan; //获取表数据
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
        var toastText = "提交成功";
        if (result != 200) {
          toastText = "操作失败！";
        } else {
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