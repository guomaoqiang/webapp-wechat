//index.js
//获取应用实例
const app = getApp()

import { request } from '../../utils/util';


Page({
  data: {
    tabList: ['财经要闻','深度专题','实时动态'],
    newList: [],
    hasUserInfo: false
  },
  //事件处理函数
  bindViewTap: () => {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  tapname: (e) => {
    console.log(e);
  },
  // 页面渲染完成
  onLoad: function () {
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    let data = {
      "appKey":"P_JKOPEN_ZYYH",
      "method":"info.getNewsList",
      "requestData": {
        "type":"news",
        "limit":15
      }
    };
    request(data).then((res) => {
      wx.hideLoading();
      console.log(res);
    },(res) => {
      wx.hideLoading();
      console.log('请求出错:'+res);
      wx.showToast({
        title: res.data.responseMessage,
        icon: 'none'
      })
    })
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  getUserInfo: function(e) {
    // console.log(e)
    // app.globalData.userInfo = e.detail.userInfo
    // this.setData({
    //   userInfo: e.detail.userInfo,
    //   hasUserInfo: true
    // })
  }
})
