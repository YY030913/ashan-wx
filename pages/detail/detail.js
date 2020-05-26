var app = getApp()
var WxParse = require('../../wxParse/wxParse.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    localdetail: {
      browseCount: "217",
      collocationdetail: '<p><img src="../../image/detail/list.jpg" title="1513151260480347.jpg" alt="5934facd78dbc.jpg"/></p>',
      video: "C32909584",
      videoId: "37",
      name: "香蕉巧克力冷燕麦",
      corver: "../../image/detail/list.jpg",
      materialpic: "",
      favoriteCount: "3",
      items: [{
        url: "http://t.h5.air-cooking.com/Public/Web/img/test/88.mp4",
        index: "1"
      }, {
        url: "http://t.h5.air-cooking.com/Public/Web/img/test/88.mp4",
        index: "2"
      }, {
        url: "http://t.h5.air-cooking.com/Public/Web/img/test/88.mp4",
        index: "3"
      }],
      favorited: false,//是否点赞
      cover: "http://t.h5.air-cooking.com/Public/Web/img/test/testimg.jpg",
      url: "http://t.h5.air-cooking.com/Public/Web/img/test/88.mp4"
    },
    videoDetail: {},//订单详情
    networkflag: true//是否是wifi
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that = this;

    // that.setData({
    //   videoDetail: that.data.localdetail,
    //   dianzannum: that.data.localdetail.praisenum
    // })
    // let article = that.data.localdetail.collocationdetail;
    // WxParse.wxParse('article', 'html', article, that, 0);

    //网络请求
    wx.request({
      url: 'https://caoliao.net.cn/api/v1/ashan/detail',
        data: {
            videoId: options.video
        },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      dataType: "json",
      method: 'get',
      success: function (res) {
        console.log(res.data);

        let detail = res.data.data;
        detail.url = res.data.data.items[options.index - 1].url

        that.setData({
          videoDetail: detail
        })
        let article = res.data.data.collocationdetail;
        WxParse.wxParse('article', 'html', article, that, 0);
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        var networkType = res.networkType
        //console.log(networkType)
        // if (networkType === "wifi") {
        //   that.setData({
        //     networkflag: true
        //   })
        // }
      }
    })
  },
  thumup: function () {
    //console.log(this.data.dianzannum)
    var dianzannum = Number(this.data.dianzannum) + 1;
    this.setData({
      hasdianzan: true,
      dianzannum: dianzannum
    })
    //ajax 发送给后台
    let videoId = this.data.videoDetail.videoId
    
    // wx.request({
    //   url: 'url', //仅为示例
    //   data: {
    //     ObjID: videoId
    //   },
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded' // 默认值
    //   },
    //   dataType: "json",
    //   method: 'POST',
    //   success: function (res) {
    //     console.log(res.data);
    //   }
    // })
  },




  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let video = this.data.videoDetail.videoId
    return {
      title: this.data.videoDetail.name,
      path: '/pages/detail/detail?video=' + video + '&index=1',
      imageUrl: this.data.videoDetail.cover,
      success: function (res) {
        // 转发成功.
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 2000
        })
      }
    }
  }
})