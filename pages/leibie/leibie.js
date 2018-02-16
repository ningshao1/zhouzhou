// pages/leibie/leibie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    man:null,
    woman:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.man_get();
  this.woman_get();
  this.kehuan_get();
  this.qingchun_get();
  wx.setNavigationBarTitle({
    title: '分类列表'
  })
  },
  // 男生小说
  man_get() {
    var that = this;
    var xh_list = [];
    this.get_data('wpCommonToolsInterface/guazi?methods=GetClassfiedBooks', {
      gender: "male",
      "type": '',
      minor: '',
      major: "玄幻",
      start: 0,
      limit: 10,

    }, function (data) {
      console.log(data)
      if (data.code == 'GOOD') {
        for (var i = 0; i < 4; i++) {
          var imgurl = data.content.bookResult[i].cover
          var num = imgurl.indexOf('http')
          if (num != -1) {
            var imgurl = unescape(imgurl.substring(num))
          } else {
            var imgurl = '../img/book.png'
          }
          xh_list.push({
            cover: imgurl,
            title: data.content.bookResult[i].title,
            majorCate: data.content.bookResult[i].majorCate,
            minorCate: data.content.bookResult[i].minorCate,
            author: data.content.bookResult[i].author,
            lastChapter: data.content.bookResult[i].lastChapter,
            bookId: data.content.bookResult[i].bookId
          })

        }
       
        that.setData({
          man: xh_list
        })
        console.log(that.data.man)

      }
    })
  },
  //女生小说
  woman_get() {
    var that = this;
    var xh_list = [];
    this.get_data('wpCommonToolsInterface/guazi?methods=GetClassfiedBooks', {
      gender: "female",
      "type": '',
      minor: '',
      major: "古代言情",
      start: 0,
      limit: 10,

    }, function (data) {
      if (data.code == 'GOOD') {
        for (var i = 0; i < 4; i++) {
          var imgurl = data.content.bookResult[i].cover
          var num = imgurl.indexOf('http')
          if (num != -1) {
            var imgurl = unescape(imgurl.substring(num))
          } else {
            var imgurl = '../img/book.png'
          }
          xh_list.push({
            cover: imgurl,
            title: data.content.bookResult[i].title,
            majorCate: data.content.bookResult[i].majorCate,
            minorCate: data.content.bookResult[i].minorCate,
            author: data.content.bookResult[i].author,
            lastChapter: data.content.bookResult[i].lastChapter,
            bookId: data.content.bookResult[i].bookId
          })

        }

        that.setData({
          woman: xh_list
        })

      }
    })
  },
  // 科幻小说
  kehuan_get() {
    var that = this;
    var xh_list = [];
    this.get_data('wpCommonToolsInterface/guazi?methods=GetClassfiedBooks', {
      gender: "male",
      "type": '',
      minor: '',
      major:"科幻",
      start: 0,
      limit: 10,

    }, function (data) {
      console.log(data)
      if (data.code == 'GOOD') {
        for (var i = 0; i < 4; i++) {
          var imgurl = data.content.bookResult[i].cover
          var num = imgurl.indexOf('http')
          if (num != -1) {
            var imgurl = unescape(imgurl.substring(num))
          } else {
            var imgurl = '../img/book.png'
          }
          xh_list.push({
            cover: imgurl,
            title: data.content.bookResult[i].title,
            majorCate: data.content.bookResult[i].majorCate,
            minorCate: data.content.bookResult[i].minorCate,
            author: data.content.bookResult[i].author,
            lastChapter: data.content.bookResult[i].lastChapter,
            bookId: data.content.bookResult[i].bookId
          })

        }

        that.setData({
          kehuan: xh_list
        })

      }
    })
  },
  //青春校园
  qingchun_get() {
    var that = this;
    var xh_list = [];
    this.get_data('wpCommonToolsInterface/guazi?methods=GetClassfiedBooks', {
      gender: "female",
      "type": '',
      minor: '',
      major: "青春校园",
      start: 0,
      limit: 10,

    }, function (data) {
      if (data.code == 'GOOD') {
        for (var i = 0; i < 4; i++) {
          var imgurl = data.content.bookResult[i].cover
          var num = imgurl.indexOf('http')
          if (num != -1) {
            var imgurl = unescape(imgurl.substring(num))
          } else {
            var imgurl = '../img/book.png'
          }
          xh_list.push({
            cover: imgurl,
            title: data.content.bookResult[i].title,
            majorCate: data.content.bookResult[i].majorCate,
            minorCate: data.content.bookResult[i].minorCate,
            author: data.content.bookResult[i].author,
            lastChapter: data.content.bookResult[i].lastChapter,
            bookId: data.content.bookResult[i].bookId
          })

        }

        that.setData({
          qingchun: xh_list
        })

      }
    })
  },

  //通用接口请求
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
  tiao_shu() {
    wx.switchTab({
      url: '/pages/bookrack/bookrack'
    })
  },
  
})