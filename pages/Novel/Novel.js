// pages/Novel/Novel.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookId: '599256eac63ef77f013b6b57',
    page: 1,
    comment: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bookId: options.bookId
    }),
      wx.setNavigationBarTitle({
        title: '小说详情'
      })
    //this.data.bookId=options.bookid
    //调用书本详情接口
    let that = this;
    this.get_details();
    this.get_link();
    this.get_comment(this.data.page);
    this.get_shou();
    //对bookId进行缓存
    wx.setStorageSync('bookId', options.bookId)
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },
  //获取一本书的详情
  get_details() {
    let that = this;
    app.get_data('wpCommonToolsInterface/guazistory?methods=getBookDetail', {
      bookId: that.data.bookId
    }, function (data) {
      console.log(data);
      if (data.code == 'GOOD') {
        var imgurl = data.content.cover;
        var num = imgurl.indexOf('http')
        if (num != -1) {
          var imgurl = unescape(imgurl.substring(num))
        } else {
          var imgurl = '../img/book.png'
        }
        that.setData({
          d_author: data.content.author,
          d_title: data.content.title,
          d_longIntro: data.content.longIntro,
          d_bookid: that.data.bookId,
          d_cover: imgurl,
          d_wordCount: data.content.wordCount
        })
      }
    })
  },
  //猜你喜欢
  get_link() {
    let that = this;
    app.get_data('wpCommonToolsInterface/guazi?methods=YouMayLike', {
      bookId: that.data.bookId
    }, function (data) {
      if (data.code == 'GOOD') {
        var listHot = [];
        for (var i = 0; i < 4; i++) {
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
          cailink: listHot
        })
      }
    })
  },
  //评论内容
  get_comment(num) {
    let that = this;
    app.get_data('wpCommonToolsInterface/guazi?methods=GetShortComments', {
      book: that.data.bookId,
      page: num,
      count: 10,
      sortType: "hottest",
    }, function (data) {
      if (data.code = 'GOOD') {
        console.log(data)
        that.setData({
          ct_num: data.content.sum
        })
        let list = [];

        for (let i = 0; i < data.content.reviews.length; i++) {
          list.push({
            content: data.content.reviews[i].content,
            updated: data.content.reviews[i].updated,
            id: data.content.reviews[i].id,
            nickname: data.content.reviews[i].author.nickname
          })
        }
        that.data.comment.push(...list);
        that.setData({
          comment: that.data.comment
        })
      }
    })
  },
  get_shou() {
    let that = this;
    app.get_data('wpCommonToolsInterface/guazi?methods=GetFirstSection', { bookId: that.data.bookId, openId:"oeVJhv1DQqAty-z8O5xJOPyrEbo0" }, function (data) {
      if(data.code=='GOOD'){
        that.setData({
          chapterId: data.content.chapterId
        })
      }
    })
  },
  //滚到底部触发的事件
  scrolltolower() {
    ++this.data.page;
    this.get_comment(this.data.page)
  },
  tiao_shu() {
    wx.switchTab({
      url: '/pages/bookrack/bookrack'
    })
  },
})