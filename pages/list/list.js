var app = getApp()
Page({
  data: {
    locallist: [
      {
        favoriteCount:"3",
        cookbookcode:"C32909584",
        videoId:"37",
        name: "香蕉巧克力冷燕麦",
        cover:"https://cdn.renrenaijia.com/CDN/app/Public/images/kmjrAppV4/app/member/LaborDay/top.png"
      },
      {
        favoriteCount: "3",
        cookbookcode: "C32909584",
        videoId: "37",
        name: "香蕉巧克力冷燕麦",
        cover: "https://cdn.renrenaijia.com/CDN/app/Public/images/kmjrAppV4/app/member/LaborDay/top.png"
      },
      {
        favoriteCount: "3",
        cookbookcode: "C32909584",
        videoId: "37",
        name: "香蕉巧克力冷燕麦",
        cover: "https://cdn.renrenaijia.com/CDN/app/Public/images/kmjrAppV4/app/member/LaborDay/top.png"
      },
    ],//模拟网络访问数据
    searchSongList: [], //放置返回数据的数组  
    searchPageNum: 1,   // 设置加载的第几次，默认是第一次  
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: false  //“没有数据”的变量，默认false，隐藏  
  },
  // 首次加载
  onLoad: function () {
    wx.showLoading({
      title: '加载中...',
    })
    let that = this;
    that.fetchSearchList();
    that.setData({
      searchPageNum: that.data.searchPageNum + 1,  //每次触发上拉事件，把searchPageNum+1  

    });
  },
  // 搜索，访问网络  
  fetchSearchList: function () {
    let that = this;
    let searchPageNum = that.data.searchPageNum//把第几次加载次数作为参数 
    
    // let getdata = []; 
    // if (searchPageNum !== 8){
    //    getdata = that.data.locallist;//模拟ajax拉取到的数据 发送至第7次止数组为空数组
    // }
    
    // if (getdata.length != 0) {
    //   let searchList = [];
    //   //拼接数组
    //   searchList = that.data.searchSongList.concat(getdata);
    //   that.setData({
    //     searchSongList: searchList, //获取数据数组  
    //     searchLoading: true   //把"上拉加载"的变量设为true，显示  
    //   });

    // } else {
    //   that.setData({
    //     searchLoadingComplete: true, //把“没有数据”设为true，显示  
    //     searchLoading: false  //把"上拉加载"的变量设为false，隐藏  
    //   });
    // }
    // wx.hideLoading()

    
    //访问网络  
    wx.request({
      url: "https://caoliao.net.cn/api/v1/ashan/list", //仅为示例，并非真实的接口地址
      data: {
        page: searchPageNum //请求页数
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      dataType: "json",
      method: 'get',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.data.length != 0) {
          let searchList = [];
          //拼接数组
          searchList = that.data.searchSongList.concat(res.data.data);
          that.setData({
            searchSongList: searchList, //获取数据数组  
            searchLoading: true   //把"上拉加载"的变量设为true，显示  
          });

          if (res.data.data.length < 20) {
            that.setData({
              searchLoadingComplete: true, //把“没有数据”设为true，显示  
              searchLoading: false  //把"上拉加载"的变量设为false，隐藏  
            });
          }

        } else {
          that.setData({
            searchLoadingComplete: true, //把“没有数据”设为true，显示  
            searchLoading: false  //把"上拉加载"的变量设为false，隐藏  
          });
        }
        wx.hideLoading()
      }
    })
  },

  //滚动到底部触发事件  
  searchScrollLower: function () {
    
    let that = this;
    if (that.data.searchLoading && !that.data.searchLoadingComplete) {
      that.setData({
        searchPageNum: that.data.searchPageNum + 1,  //每次触发上拉事件，把searchPageNum+1  
        searchLoading: false
      });
      that.fetchSearchList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "阿珊，你要我怎么做怎么说才会爱我？",
      path: '/pages/list/list',
      imageUrl: "http://p88om5yae.bkt.clouddn.com/basicprofile.jpeg",
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