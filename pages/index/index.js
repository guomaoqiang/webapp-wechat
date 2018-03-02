//index.js
//获取应用实例
const app = getApp()

import { request } from '../../utils/util';


Page({
  data: {
    tabList: ['财经要闻','深度专题','实时动态'],
    newsList: [],
    isactive: 0,
    hasUserInfo: false
  },
  //事件处理函数
  bindViewTap: () => {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  switchTab: function(e){
    console.log(e);
    this.setData({
      isactive: e.currentTarget.dataset.idx
    })
  },
  upper: function(e) {
    // console.log('upper');
    wx.showNavigationBarLoading();
    this.render();
    setTimeout(()=>{
      wx.hideNavigationBarLoading();
    },1000)
  },
  lower: function(e) {
    console.log('lower');
    let newsList = this.data.newsList,
      id = newsList[newsList.length-1].id;
    this.render(id);
  },
  scroll: function(e) {
    console.log(e)
  },
  render: function(id) {
    wx.showLoading({
      title: '加载中',
      mask: true,
    });
    let data = {
      "appKey":"P_JKOPEN_ZYYH",
      "method":"info.getNewsList",
      "requestData": {
        "type":"news",
        "limit":15
      }
    };
    id && (data.requestData.lastRecordId = id);
    request(data).then((res) => {
      
      console.log(res);
      let data = res.data.responseData.newsList;
      res = id ? this.data.newsList.concat(data): data;
      this.setData({
        newsList: res
      },() => {
        wx.hideLoading();
      })
    },(res) => {
      wx.hideLoading();
      console.log('请求出错:'+res);
      wx.showToast({
        title: res.data.responseMessage,
        icon: 'none'
      })
    })
  },
  // 页面渲染完成
  onLoad: function () {
    this.render();
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
