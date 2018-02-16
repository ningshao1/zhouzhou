// pages/Novel_c/Novel_c.js
const app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    c_list: [],
    chapterIds: "16224615",
    books: null,
    show: false,
    box_show: false,
    change: true //判断是自动购买还是取消购买,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.pd_auto();
    //初始化页面ID
    this.setData({
      chapterIds: options.chapterId
    })
    //初始化书本ID
    this.setData({
      books: options.bookId
    })
    //获取下一章页面信息
    this.next_info(options.chapterId);
    //获取当前页面内容
    this.get_c(0, options.chapterId);
    let that = this;
    //获取屏幕的高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },
  //得到当前内容请求
  get_c(num, chapterIds) {
    let that = this;
    app.get_data('wpCommonToolsInterface/melonSeedsService?methods=getChapterContent', {
      chapterId: chapterIds,
      userId: "oeVJhv1DQqAty-z8O5xJOPyrEbo0",
      isVip: 1,
    }, function (data) {
      console.log(data)
      if (data.code == 'GOOD') {
        //拿到数据后让内容显示出来
        that.setData({
          box_show: true
        })
        var list = [];
        list.push({
          title: data.content.title,
          cpContent: WxParse.wxParse('cpContent', 'html', data.content.cpContent, that, 5),
          chapterId: data.content.chapterId
        })
        //that.data.c_list.push(...list);
        that.setData({
          c_list: list
        })
        //回到顶部
        if (num) {
          wx.pageScrollTo({
            scrollTop: 0,
            duration: 0
          })
        }
        //判断是否在书架上
        if (wx.getStorageSync(that.data.books) == that.data.books) {
          that.setData({
            a_book: '已在书架中'
          })
        } else {
          that.setData({
            a_book: '加入书架'
          })
        }

      } else {
        //获取需要付费的标题内容
        that.setData({
          title: data.extraInfo.chapterName,
        })
        that.setData({
          balance: data.extraInfo.balance,
        })
        that.pd_auto();


      }
      //console.log(data)

    })
  },
  //点击获取下一章内容
  gd(e) {
    console.log(e)
    let that = this;
    //加载框
    wx.showLoading({
      title: '加载中',
    })
    that.setData({
      chapterIds: e.currentTarget.dataset.w_id
    })
    //this.get_c(1, e.currentTarget.dataset.w_id);
    app.get_data('wpCommonToolsInterface/melonSeedsService?methods=getChapterContent', {
      chapterId: e.currentTarget.dataset.w_id,
      userId: "oeVJhv1DQqAty-z8O5xJOPyrEbo0",
      bookId: that.data.books
    }, function (data) {
      console.log(data)
      if (data.code == 'GOOD') {
        //拿到数据后让内容显示出来
        that.setData({
          box_show: true
        })
        var list = [];
        list.push({
          title: data.content.title,
          cpContent: WxParse.wxParse('cpContent', 'html', data.content.cpContent, that, 5),
          chapterId: data.content.chapterId
        })
        that.setData({
          title: data.content.title,
        })
        //that.data.c_list.push(...list);
        that.setData({
          c_list: list
        })
        //回到顶部
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 0
        })


      } else {

        //获取需要付费的标题内容
        that.setData({
          title: data.extraInfo.chapterName,
        })
        that.setData({
          balance: data.extraInfo.balance,
        })
        that.setData({
          box_show: false
        })
        that.pd_auto();

      }
    }, function () {
      wx.hideLoading()
    })
    // this.get_c(1);
    this.next_info(e.currentTarget.dataset.w_id)

  },

  //获取下一章信息
  next_info(chapterIds) {
    let that = this;
    app.get_data("wpCommonToolsInterface/guazi?methods=getNextSection", {
      sectionId: chapterIds,
      bookId: that.data.books,
      openId: 'oeVJhv1DQqAty-z8O5xJOPyrEbo0',
      type: 'next'
    }, function (data) {
      console.log(data)
      if (data.code == 'GOOD') {
        if (data.content.length <= 0) {
          wx.showToast({
            title: '已经是最后一章',
            icon: 'none',
            duration: 2000
          })
          return;
        }
        that.setData({
          w_id: data.content[0].sr_id,
          isVip: data.content[0].isVip,
          order: data.content[0].order,
        })
      }
    })
  },
  buy_next(e) {
    console.log(e)
    this.get_shouf(e.currentTarget.dataset.charid);
    this.next_info(e.currentTarget.dataset.charid);
  },
  //购买下一章节的接口 接收文章ID参数
  get_shouf(id) {
    let that = this;
    console.log(that.data.chapterIds)
    console.log(that.data.books)
    app.get_data("wpCommonToolsInterface/melonSeedsService?methods=buyChapterContent", {
      chapterId: id,
      bookId: that.data.books,
      userId: "oeVJhv1DQqAty-z8O5xJOPyrEbo0",
    }, function (data) {
      console.log(data)
      if (parseInt(that.data.balance) >= 12) {
        if (data.code == 'GOOD') {
          //渲染页面
          var list = [];
          list.push({
            title: data.content.title,
            cpContent: WxParse.wxParse('cpContent', 'html', data.content.cpContent, that, 5),
            chapterId: data.content.chapterId
          })
          that.setData({
            box_show: true
          })

          that.setData({
            c_list: list
          })

        }
      }else{
        wx.switchTab({
          url: "../index/index"
        })
      }
      //判断是否在书架上
      if (wx.getStorageSync(that.data.books) == that.data.books) {
        that.setData({
          a_book: '已在书架中'
        })
      } else {
        that.setData({
          a_book: '加入书架'
        })
      }

    })

  },
  //自动购买调用函数
  checkboxChange(e) {
    this.data.change ? this.auto_buy() : this.qx_buy();
  },
  //自动购买接口
  auto_buy() {
    let that = this;
    app.get_data("paltformInterface/melonSeedsService?methods=addAutoBuyFlag", {
      bookId: that.data.books,
      userId: app.globalData.openId
    }, function (data) {
      if (data.code == 'GOOD') {
        wx.showToast({
          title: '自动购买成功',
          icon: 'none',
          duration: 2000
        })
        that.setData({
          change: false
        })
        that.data.box_show = true;
        // that.setData({
        //   box_show: true
        // })
      }
    })
  },
  qx_buy() {
    let that = this;
    app.get_data("paltformInterface/melonSeedsService?methods=deleteAutoBuyFlag", {
      bookId: this.data.books,
      userId: app.globalData.openId
    }, function (data) {
      if (data.code) {
        wx.showToast({
          title: '取消购买成功',
          icon: "none",
          duration: 2000
        })
        that.setData({
          change: true
        })
        // that.setData({
        //   box_show: false
        // })
        that.data.box_show = false;

      }

    })
  },
  //判断是否开启了自动购买的函数
  pd_auto() {
    let that = this;
    app.get_data('paltformInterface/melonSeedsService?methods=getAutoBuyFlag', {
      bookId: this.data.books,
      userId: app.globalData.openId
    }, function (data) {
      if (data.code == 'GOOD' && data.content == 'true') {
        that.buy_next({
          currentTarget: {
            dataset: {
              charid: that.data.chapterIds
            }
          }
        })
        that.setData({
          box_show: true
        })
      }
    }, function () {
      //回到顶部
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
      })
      wx.hideLoading()
    })
  },
  //把书添加到书架上方法
  a_shu(e) {
    let that = this;
    app.get_data('wpCommonToolsInterface/guazi?methods=AddToMyshelf',
      {
        bookId: that.data.books,
        openId: "oeVJhv1DQqAty-z8O5xJOPyrEbo0"
      }, function (data) {
        if (data.code == 'GOOD') {
          wx.setStorageSync(that.data.books, that.data.books);
          that.setData({
            a_book: data.content
          })
        } else {
          that.setData({
            a_book: data.content
          })
        }
      })
  },
  //点击目录按钮跳转到目录页面
  tiao_shu() {
    let that = this;
    wx.navigateTo({
      url: '/pages/directory/directory?bookId=' + that.data.books,
      success() {
      },
      // err
    })
  },
  //切换显示隐藏
  t_show() {
    this.setData({
      show: !this.data.show
    })

  },
})