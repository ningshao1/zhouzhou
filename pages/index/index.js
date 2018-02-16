//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    cailinke: [],
    linkAll: [],//所有猜你喜欢数据
    num1: 3,//记录猜你喜欢数量
    hot_All: null,//所有热门推荐的数据
    hot_t: null,
    xy_l: [],
    qc_l: [],
    yq_l: [],
    kh_l: [],
    scrollHeight: null,
    xh_h: [],
    xh_temp: [],//用于玄幻精选中间储存的变量
    num: 0,//用于玄幻精选计数使用
    valve: true, //用于阻止底部加载重复操作
    clear_show: 0,//用于控制显示查号
    bock_show: 2,//用于控制搜索和页面的显示
    search_list: null,
    bd_data: [{ img: 'https://rescdn.qqmail.com/weread/cover/topic/bookstore_chart_popular_3x.846619f880.png', title: 'renqi' }, { img: 'https://rescdn.qqmail.com/weread/cover/topic/bookstore_chart_best_seller_3x.f2eea41c3d.png', title: 'fengyun' }, { img: 'https://rescdn.qqmail.com/weread/cover/topic/bookstore_chart_finished_3x.a1dcb2e40e.png', title: 'wanjie' }, { img: 'https://rescdn.qqmail.com/weread/cover/topic/bookstore_chart_free_3x.23fcedff5a.png',title:'2'}],
  },//榜单图片数据
  onLoad: function () {
    //发送请求
    //猜你喜欢数据 请求
    var that = this;
    var booksId = wx.getStorageSync('bookId') || '599256eac63ef77f013b6b57'
    wx.request({
      url: 'http://114.55.249.77:54988/service/wpCommonToolsInterface/guazi?methods=YouMayLike',
      data: {
        //jsonp: true,
        //jsonp_method: 'callbackYouMayLike',
        bookId: booksId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //var books = res.data.content.books || [];
        var data = res.data;
        if (data.code == 'GOOD') {
          var listHot = [];
          for (var i = 0; i < data.content.books.length; i++) {
            var imgurl = data.content.books[i].cover
            var num = imgurl.indexOf('http')
            if (num != -1) {
              var imgurl = unescape(imgurl.substring(num))
            } else {
              var imgurl = './img/book.png'
            }
            listHot.push({
              cover: imgurl,
              title: data.content.books[i].title,
              bookId: data.content.books[i]._id,
              author: data.content.books[i].author,
              majorCate: data.content.books[i].majorCate
            })
          }

          that.setData({
            linkAll: listHot
          })
          that.setData({
            cailink: that.data.linkAll.slice(0, 3)
          })
        }
      }
    })
    this.hot_tui();
    this.get_TOP();
    this.xh_get();
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    this.time_m()//调用限时免费接口
  },
  //点击换一批 调用的函数
  change_list() {
    this.setData({
      cailink: this.data.linkAll.slice(this.data.num1, this.data.num1 + 3)
    })
    this.data.num1 = this.data.num1 + 3
    if (this.data.num1 >= this.data.linkAll.length) {
      this.data.num1 = 0;
    }
  },
  //限时免费获取数据
  time_m(){
    var that=this
    this.get_data('wpCommonToolsInterface/guazi?methods=GetFreeBooks', {
      gender: "female"
    }, function (data) {
      console.log(data)
      if (data.code == 'GOOD') {
        var he_a=[];
        var search_l=[];
        he_a.push(...data.content.module1)
        he_a.push(...data.content.module2)
        for (var i = 0; i < 6; i++) {
          var imgurl = he_a[i].cover
          var num = imgurl.indexOf('http')
          if (num != -1) {
            var imgurl = unescape(imgurl.substring(num))
          } else {
            var imgurl = './img/book.png'
          }
          search_l.push({
            cover: imgurl,
            title: he_a[i].title,
            majorCate: he_a[i].majorCate,
            bookId: he_a[i].bookId,
            author: he_a[i].author,
          })
        }
        that.setData({
          time_m: search_l
        })
        console.log(that.data.time_m)
      }
    })
  },
  //热门推荐
  hot_tui() {
    var that = this;
    var hot_list = [];
    this.get_data('wpCommonToolsInterface/guazi?methods=GetFemaleModel', {}, function (data) {
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
            //				author:data.content[i].author
          })
        }
        that.setData({
          hot_All: listHot
        })
      }
      that.setData({
        hot_t: that.data.hot_All.slice(0, 3)
      })
    })
  },

  //分类排行
  get_TOP() {
    var that = this;
    var xy_list = [];//推理悬疑
    var yq_list = [];//言情
    var kh_list = [];//科幻
    var qc_list = [];//青春
    var temp = [];
    this.get_data('wpCommonToolsInterface/guazi?methods=GetClassfiedBooks', {
      gender: "female",
      major: "悬疑灵异",
      start: "0",
      limit: "4",
      "type": '',
      minor: '',
      jsonp_method: "callbackGetClassfiedBook",
      jsonp: true
    }, function (data) {
      if (data.code == 'GOOD') {
        for (var i = 0; i < 4; i++) {
          var imgurl = data.content.bookResult[i].cover
          var num = imgurl.indexOf('http')
          if (num != -1) {
            var imgurl = unescape(imgurl.substring(num))
          } else {
            var imgurl = './img/book.png'
          }
          xy_list.push({
            cover: imgurl,
            title: data.content.bookResult[i].title,
            majorCate: data.content.bookResult[i].majorCate,
            bookId: data.content.bookResult[i].bookId,
          })
        }
        that.setData({
          xy_l: xy_list
        })
      }
    })
    //言情请求
    this.get_data('wpCommonToolsInterface/guazi?methods=GetClassfiedBooks', {
      gender: "female",
      major: "现代言情",
      start: "0",
      limit: "4",
      "type": '',
      minor: '',
      jsonp_method: "callbackGetClassfiedBook",
      jsonp: true
    }, function (data) {
      if (data.code == 'GOOD') {
        for (var i = 0; i < 4; i++) {
          var imgurl = data.content.bookResult[i].cover
          var num = imgurl.indexOf('http')
          if (num != -1) {
            var imgurl = unescape(imgurl.substring(num))
          } else {
            var imgurl = './img/book.png'
          }
          yq_list.push({
            cover: imgurl,
            title: data.content.bookResult[i].title,
            majorCate: data.content.bookResult[i].majorCate,
            bookId: data.content.bookResult[i].bookId,
          })
        }
        that.setData({
          yq_l: yq_list
        })
      }
    })
    //科幻请求
    this.get_data('wpCommonToolsInterface/guazi?methods=GetClassfiedBooks', {
      gender: "female",
      major: "科幻",
      start: "0",
      limit: "4",
      "type": '',
      minor: '',
      jsonp_method: "callbackGetClassfiedBook",
      jsonp: true
    }, function (data) {
      if (data.code == 'GOOD') {
        for (var i = 0; i < 4; i++) {
          var imgurl = data.content.bookResult[i].cover
          var num = imgurl.indexOf('http')
          if (num != -1) {
            var imgurl = unescape(imgurl.substring(num))
          } else {
            var imgurl = './img/book.png'
          }
          kh_list.push({
            cover: imgurl,
            title: data.content.bookResult[i].title,
            majorCate: data.content.bookResult[i].majorCate,
            bookId: data.content.bookResult[i].bookId,
          })
        }
        that.setData({
          kh_l: kh_list
        })
      }
    })
    //青春请求
    this.get_data('wpCommonToolsInterface/guazi?methods=GetClassfiedBooks', {
      gender: "female",
      major: "青春校园",
      start: "0",
      limit: "4",
      "type": '',
      minor: '',
      jsonp_method: "callbackGetClassfiedBook",
      jsonp: true
    }, function (data) {
      if (data.code == 'GOOD') {
        for (var i = 0; i < 4; i++) {
          var imgurl = data.content.bookResult[i].cover
          var num = imgurl.indexOf('http')
          if (num != -1) {
            var imgurl = unescape(imgurl.substring(num))
          } else {
            var imgurl = './img/book.png'
          }
          qc_list.push({
            cover: imgurl,
            title: data.content.bookResult[i].title,
            majorCate: data.content.bookResult[i].majorCate,
            bookId: data.content.bookResult[i].bookId,
          })
        }
        that.setData({
          qc_l: qc_list
        })
      }
    })
  },
  // 玄幻精选
  xh_get() {
    var that = this;
    var xh_list = [];
    this.get_data('wpCommonToolsInterface/guazi?methods=GetClassfiedBooks', {
      gender: "male",
      "type": '',
      minor: '',
      major: "玄幻",
      start: 0,
      limit: 10,
      jsonp_method: " callbackGetClassfiedBooks",

    }, function (data) {
      if (data.code == 'GOOD') {
        for (var i = 0; i < 6; i++) {
          var imgurl = data.content.bookResult[i].cover
          var num = imgurl.indexOf('http')
          if (num != -1) {
            var imgurl = unescape(imgurl.substring(num))
          } else {
            var imgurl = './img/book.png'
          }
          xh_list.push({
            cover: imgurl,
            title: data.content.bookResult[i].title,
            majorCate: data.content.bookResult[i].majorCate,
            minorCate: data.content.bookResult[i].minorCate,
            author: data.content.bookResult[i].author,
            lastChapter: data.content.bookResult[i].lastChapter,
            bookId: data.content.bookResult[i].bookId,
          })

        }
        var temp = [];
        temp.push(xh_list.slice(0, 3));
        temp.push(xh_list.slice(3, 6));
        that.data.xh_temp.push(temp);
        that.setData({
          xh_h: that.data.xh_temp
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
  //滚动到底部会触发该事件
  scrolltolower() {
    var that = this;
    this.data.valve ? that.data.num+=10: 1;
    // this.data.valve = false;
    var xh_list = [];
    wx.showLoading({
      title: '加载中',
      mask:true

    })
    this.get_data('wpCommonToolsInterface/guazi?methods=GetClassfiedBooks', {
      gender: "male",
      "type": '',
      minor: '',
      major: "玄幻",
      start: that.data.num,
      limit: 6,
      jsonp_method: " callbackGetClassfiedBooks",

    }, function (data) {
      if (data.code == 'GOOD') {
        for (var i = 0; i < 6; i++) {
          var imgurl = data.content.bookResult[i].cover
          var num = imgurl.indexOf('http')
          if (num != -1) {
            var imgurl = unescape(imgurl.substring(num))
          } else {
            var imgurl = './img/book.png'
          }
          xh_list.push({
            cover: imgurl,
            title: data.content.bookResult[i].title,
            majorCate: data.content.bookResult[i].majorCate,
            minorCate: data.content.bookResult[i].minorCate,
            author: data.content.bookResult[i].author,
            lastChapter: data.content.bookResult[i].lastChapter,
            bookId: data.content.bookResult[i].bookId,
          })

        }
        var temp = [];
        temp.push(xh_list.slice(0, 3));
        temp.push(xh_list.slice(3, 6));
        that.data.xh_temp.push(temp);
        that.setData({
          xh_h: that.data.xh_temp
        })

      }
    }, function () {
      that.data.valve = true;
      console.log(that.data.valve)
      wx.hideLoading();
    })
  },
  //搜索框输入时触发的事件
  f_input(event) {
    if (event.detail.value !== '') {
      this.setData({//显示查号
        clear_show: 1
      })
      //触发搜索请求事件
      this.search_call(event.detail.value);
    } else {
      this.setData({//隐藏查号
        clear_show: 0
      })
      this.setData({//取消搜索列表
        search_list: ''
      })
    }
  },
  clear_input() {
    this.setData({//清空input
      s_input: ''
    })
    this.setData({//隐藏查号
      clear_show: 0
    })
  },
  bg_show(e) {
    this.setData({
      bock_show: e.currentTarget.dataset.id
    })
    this.setData({//隐藏查号
      clear_show: 0
    })
    this.setData({//取消搜索结果
      search_list: ''
    })
  },
  //搜索返回数据
  search_call(key) {
    var that = this;
    this.get_data('wpCommonToolsInterface/guazi?methods=ResearchBooks', {
      query: key,

    }, function (data) {
      console.log(data)
      var s_list = [];

      if (data.code == 'GOOD') {

        for (var i = 0; i < 6; i++) {
          s_list.push({
            title: data.content[i].title,
            author: data.content[i].author,
            bookId: data.content[i].bookId,
          })
        }
        that.setData({
          search_list: [...s_list]
        })
      }
    })
  },
  test(){
    wx.navigateTo({
      url: '/pages/Novel/Novel',
    })
  }

})
