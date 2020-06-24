// pages/my/my.js
const app = getApp()

// 弹框需要引入
import myDialog from '../../components/dialog/dialog.js';

import {
  MyModel
} from 'my-model.js'
var myModel = new MyModel();
Page({

  /**
   * 页面的初始数据
   */
    data: {
      balance: 0,
      freeze: 0,
      score: 0,
      score_sign_continuous: 0,
      userInfo: {
        // avatarUrl: "../../images/avatar.jpg",
        nickName: "暂未登陆"
      },
      loginButton: "",
      usernameText: "hiddle"
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
  onShow() {
    //获取授权 联合登陆myDialog.unionLogin()
    myDialog.unionLogin((res) => {
      console.log("myDialog")
      console.log(res);

      if (res.nickName != null) {
        this.setData({
          userInfo: res,
          loginButton: "hiddle",
          usernameText: ""
        });
      } else {
        this.setData({
          loginButton: "",
          usernameText: "hiddle"
        });
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
  //关于我们弹出框
  aboutUs: function () {
    wx.showModal({
      title: '关于我们',
      content: '系统归海滨学院计科系所有，软件1602李超毕业设计',
      showCancel: false
    })
  },
  jumpPhone:function(){
    wx.showModal({
      title: '电话客服',
      content: '123456789',
      showCancel: false
    })
  },
  my_information:function(){
    
    wx.navigateTo({
      url: '/pages/my_information/my_information',
    })
  },
  my_help: function () {
    wx.navigateTo({
      url: '/pages/my_help/my_help',
    })
  }
})