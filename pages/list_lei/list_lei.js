// pages/list_lei/list_lei.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  listclass:null,
  listbook:null,
  temp_key:null,//记录点击了那一个
  temp_num:0, //记录滚动加载的开始
  sex:null,
  currentItemId:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '列表详情'
    })
    if (options.title=='man'){
      this.data.sex ='male'
      this.get_man();
      this.new_list();
    } else if (options.title =='woman'){
      this.data.sex = 'female'
      this.get_woman();
      this.new_list();
    } else if (options.title =="kehuan"){
      this.data.sex = 'male';
      this.get_man();
      this.new_list({
        currentTarget:{
          dataset:{
              index:10,
              name:'科幻'
          }
        }
      });
    } else if (options.title == "lingyi") {
      this.data.sex = 'male';
      this.get_man();
      this.new_list({
        currentTarget: {
          dataset: {
            index: 11,
            name: '灵异'
          }
        }
      });
    } else if (options.title == "qingchun") {
      this.data.sex = 'female';
      this.get_woman();
      this.new_list({
        currentTarget: {
          dataset: {
            index: 2,
            name: '青春校园'
          }
        }
      });
    } else if (options.title == "yanqing") {
      this.data.sex = 'female';
      this.get_woman();
      this.new_list({
        currentTarget: {
          dataset: {
            index: 1,
            name: '现代言情'
          }
        }
      });
    }

    var that=this;
    //获取屏幕高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },
  //获取男生列表
  get_man(){
    let that=this;
    app.get_data('wpCommonToolsInterface/guazi?methods=GetAllClass',{   
    },function(data){
      let list=[];
      console.log(data)
      if (data.code=='GOOD'){
        for (let i in data.content.male){
          list.push({
            major: data.content.male[i].major
          })
       }
        that.setData({
          listclass: list
        })
     }
    })
  },
  //获取女生列表
  get_woman() {
    let that = this;
    app.get_data('wpCommonToolsInterface/guazi?methods=GetAllClass', {
    }, function (data) {
      console.log(data)
      let list = [];
      console.log(data)
      if (data.code == 'GOOD') {
        for (let i in data.content.female) {
          list.push({
            major: data.content.female[i].major
          })
        }
        that.setData({
          listclass: list
        })
      }
    })
  },


  new_list(e){
    console.log(e);
    let key;
    if (e == null){
        if(this.data.sex=='male'){
          key = '玄幻';
          this.data.temp_key = '玄幻'
        } else if (this.data.sex == 'female'){
          key = '古代言情';
          this.data.temp_key = '古代言情'
        }

    }else{
      this.setData({
        currentItemId:e.currentTarget.dataset.index
      })
      if (this.data.sex == 'male') {
        key = e.currentTarget.dataset.name || '玄幻';
        this.data.temp_key = key;
      } else if (this.data.sex == 'female') {
        key = e.currentTarget.dataset.name || '古代言情';
        this.data.temp_key = key;
      }

      
     
    }

    let kh_list=[];
    var that=this;
    app.get_data('wpCommonToolsInterface/guazi?methods=GetClassfiedBooks', {
      gender: that.data.sex,
      major: key,
      start: "0",
      limit: "10",
      "type": '',
      minor: '',
      jsonp_method: "callbackGetClassfiedBook",
      jsonp: true
    }, function (data) {
      console.log(data)
      if (data.code == 'GOOD') {
        for (var i = 0; i < data.content.bookResult.length; i++) {
          var imgurl = data.content.bookResult[i].cover
          var num = imgurl.indexOf('http')
          if (num != -1) {
            var imgurl = unescape(imgurl.substring(num))
          } else {
            var imgurl = '../img/book.png'
          }
          kh_list.push({
            cover: imgurl,
            title: data.content.bookResult[i].title,
            majorCate: data.content.bookResult[i].majorCate,
            bookId: data.content.bookResult[i].bookId,
            lastChapter: data.content.bookResult[i].lastChapter,
              minorCate:data.content.bookResult[i].minorCate,
              author:data.content.bookResult[i].author
          })
        }
        that.setData({
          listbook: kh_list
        })
        console.log(that.data.listbook)
      }
    })
  },
  //女生内容
  new_list1(e) {
    let key;
    if (e == null) {
      key = '古代言情';
      this.data.temp_key = '古代言情'
    } else {
      key = e.currentTarget.dataset.name || '古代言情';
      this.data.temp_key = key;
    }

    let kh_list = [];
    var that = this;
    app.get_data('wpCommonToolsInterface/guazi?methods=GetClassfiedBooks', {
      gender: "female",
      major: key,
      start: "0",
      limit: "10",
      "type": '',
      minor: '',
      jsonp_method: "callbackGetClassfiedBook",
      jsonp: true
    }, function (data) {
      console.log(data)
      if (data.code == 'GOOD') {
        for (var i = 0; i < data.content.bookResult.length; i++) {
          var imgurl = data.content.bookResult[i].cover
          var num = imgurl.indexOf('http')
          if (num != -1) {
            var imgurl = unescape(imgurl.substring(num))
          } else {
            var imgurl = '../img/book.png'
          }
          kh_list.push({
            cover: imgurl,
            title: data.content.bookResult[i].title,
            majorCate: data.content.bookResult[i].majorCate,
            bookId: data.content.bookResult[i].bookId,
            lastChapter: data.content.bookResult[i].lastChapter,
            minorCate: data.content.bookResult[i].minorCate,
            author: data.content.bookResult[i].author
          })
        }
        that.setData({
          listbook: kh_list
        })
        console.log(that.data.listbook)
      }
    })
  },
  //滚动到底部触发的事件
  scrolltolower(){
    let kh_list = [];
    var that = this;
    that.data.temp_num+=10;
    app.get_data('wpCommonToolsInterface/guazi?methods=GetClassfiedBooks', {
      gender: that.data.sex,
      major: that.data.temp_key,
      start: that.data.temp_num,
      limit: that.data.temp_num+10,
      "type": '',
      minor: '',
      jsonp_method: "callbackGetClassfiedBook",
      jsonp: true
    }, function (data) {
      console.log(data)
      if (data.code == 'GOOD') {
        for (var i = 0; i < data.content.bookResult.length; i++) {
          var imgurl = data.content.bookResult[i].cover
          var num = imgurl.indexOf('http')
          if (num != -1) {
            var imgurl = unescape(imgurl.substring(num))
          } else {
            var imgurl = '../img/book.png'
          }
          kh_list.push({
            cover: imgurl,
            title: data.content.bookResult[i].title,
            majorCate: data.content.bookResult[i].majorCate,
            bookId: data.content.bookResult[i].bookId,
            lastChapter: data.content.bookResult[i].lastChapter,
            minorCate: data.content.bookResult[i].minorCate,
            author: data.content.bookResult[i].author
          })
        }
        that.data.listbook.push(...kh_list)
        that.setData({
          listbook: that.data.listbook
        })
      }
    })
  },
  tiao_shu() {
    wx.switchTab({
      url: '/pages/bookrack/bookrack'
    })
  },
  
})