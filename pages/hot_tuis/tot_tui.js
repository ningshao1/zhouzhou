// pages/hot_tui/hot_hui.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hot_All: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    if (options.title == '1') {
      wx.setNavigationBarTitle({
        title: '热门推荐'
      })
      this.hot_tui();
    } else if (options.title == '2') {
      wx.setNavigationBarTitle({
        title: '限时免费'
      })
      this.time_m();
    } else if (options.title == 'wanjie') {
      wx.setNavigationBarTitle({
        title: '完结榜单'
      })
      this.wan_jie();
    } else if (options.title == 'renqi') {
      wx.setNavigationBarTitle({
        title: '人气榜单'
      })
      this.renqi();
    } else if (options.title == 'fengyun') {
      wx.setNavigationBarTitle({
        title: '风云榜单'
      })
      this.renqi();
    }

  },
  //热门推荐请求
  hot_tui() {
    var that = this;
    var hot_list = [];
    this.get_data('wpCommonToolsInterface/guazi?methods=GetFemaleModel', {}, function (data) {
      console.log(data)
      if (data.code == 'GOOD') {

        var listHot = [];
        for (var i = 0; i < data.content.hotRecommendBooks.length; i++) {
          var imgurl = data.content.hotRecommendBooks[i].cover
          var num = imgurl.indexOf('http')
          if (num != -1) {
            var imgurl = unescape(imgurl.substring(num))
          } else {
            var imgurl = './img/book.png'
          }
          listHot.push({
            cover: imgurl,
            title: data.content.hotRecommendBooks[i].title,
            shortIntro: data.content.hotRecommendBooks[i].shortIntro,
            bookId: data.content.hotRecommendBooks[i].bookId,
            majorCate: data.content.hotRecommendBooks[i].majorCate,
            author: data.content.hotRecommendBooks[i].author,
          })
        }
        that.setData({
          hot_All: listHot
        })
        console.log(listHot)
      }
    })
  },
  //限时免费请求接口
  time_m() {
    var that = this
    this.get_data('wpCommonToolsInterface/guazi?methods=GetFreeBooks', {
      gender: "female"
    }, function (data) {
      console.log(data)
      if (data.code == 'GOOD') {
        var he_a = [];
        var search_l = [];
        he_a.push(...data.content.module1)
        he_a.push(...data.content.module2)
        he_a.sort();
        for (var i = 0; i < he_a.length; i++) {
          var imgurl = he_a[i].cover
          var num = imgurl.indexOf('http')
          if (num != -1) {
            var imgurl = unescape(imgurl.substring(num))
          } else {
            var imgurl = '../img/book.png'
          }
          search_l.push({
            cover: imgurl,
            title: he_a[i].title,
            majorCate: he_a[i].majorCate,
            bookId: he_a[i].bookId,
            author: he_a[i].author,
            shortIntro: he_a[i].longIntro
          })
        }
        that.setData({
          hot_All: search_l
        })
      }
    })
  },
  // 完结榜单
  wan_jie() {
    var that = this;
    var hot_list = [];
    this.get_data('wpCommonToolsInterface/guazi?methods=GetFemaleModel', {}, function (data) {
      console.log(data)
      if (data.code == 'GOOD') {

        var listHot = [];
        for (var i = 0; i < data.content.editorRecommendBooks
          .length; i++) {
          var imgurl = data.content.editorRecommendBooks
          [i].cover
          var num = imgurl.indexOf('http')
          if (num != -1) {
            var imgurl = unescape(imgurl.substring(num))
          } else {
            var imgurl = './img/book.png'
          }
          listHot.push({
            cover: imgurl,
            title: data.content.editorRecommendBooks
            [i].title,
            shortIntro: data.content.editorRecommendBooks
            [i].shortIntro,
            bookId: data.content.editorRecommendBooks
            [i].bookId,
            majorCate: data.content.editorRecommendBooks
            [i].majorCate,
            author: data.content.editorRecommendBooks
            [i].author,
          })
        }
        that.setData({
          hot_All: listHot
        })
        console.log(listHot)
      }
    })
  },

//人气榜单  
  renqi() {
    var that = this;
    var hot_list = [];
    this.get_data('wpCommonToolsInterface/guazi?methods=GetFemaleModel', {}, function (data) {
      console.log(data)
      if (data.code == 'GOOD') {

        var listHot = [];
        for (var i = 0; i < data.content.potentialBooks

          .length; i++) {
          var imgurl = data.content.potentialBooks

          [i].cover
          var num = imgurl.indexOf('http')
          if (num != -1) {
            var imgurl = unescape(imgurl.substring(num))
          } else {
            var imgurl = './img/book.png'
          }
          listHot.push({
            cover: imgurl,
            title: data.content.potentialBooks

            [i].title,
            shortIntro: data.content.potentialBooks

            [i].shortIntro,
            bookId: data.content.potentialBooks

            [i].bookId,
            majorCate: data.content.potentialBooks

            [i].majorCate,
            author: data.content.potentialBooks

            [i].author,
          })
        }
        that.setData({
          hot_All: listHot
        })
        console.log(listHot)
      }
    })
  },
  //风云榜单  
  renqi() {
    var that = this;
    var hot_list = [];
    this.get_data('wpCommonToolsInterface/guazi?methods=GetFemaleModel', {}, function (data) {
      console.log(data)
      if (data.code == 'GOOD') {

        var listHot = [];
        for (var i = 0; i < data.content.rexiaoBooks

          .length; i++) {
          var imgurl = data.content.rexiaoBooks

          [i].cover
          var num = imgurl.indexOf('http')
          if (num != -1) {
            var imgurl = unescape(imgurl.substring(num))
          } else {
            var imgurl = './img/book.png'
          }
          listHot.push({
            cover: imgurl,
            title: data.content.rexiaoBooks

            [i].title,
            shortIntro: data.content.rexiaoBooks

            [i].shortIntro,
            bookId: data.content.rexiaoBooks

            [i].bookId,
            majorCate: data.content.rexiaoBooks

            [i].majorCate,
            author: data.content.rexiaoBooks

            [i].author,
          })
        }
        that.setData({
          hot_All: listHot
        })
        console.log(listHot)
      }
    })
  },
  get_data(url, data, callback, callback_c) {
    var d_url = `http://114.55.249.77:54988/service/${url}`
    wx.request({
      url: d_url,
      data: data,
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        callback(res.data)
      },
      complete: callback_c

    })
  },
  tiao_shu(){
    wx.switchTab({
        url: '/pages/bookrack/bookrack'
      })
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

  }
})