// pages/bookrack/bookrack.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.get_book();
      this.get_user();
      this.get_moeny();
      wx.setNavigationBarTitle({
        title: '我的书架'
      })
  },
  get_book(){
    let that=this;
    app.get_data('wpCommonToolsInterface/guazi?methods=ShowMyshelf',{
      openId:"oeVJhv1DQqAty-z8O5xJOPyrEbo0"
    },function(data){
         if(data.code=='GOOD'){
           var list=[];
           for(var i in data.content){
              list.push({
                b_id: data.content[i].b_id,
                book_author: data.content[i].book_author,
                book_name: data.content[i].book_name,
                book_ing_url: data.content[i].book_ing_url
              })
           }
           that.setData({
             book_r: list
           })
         }
    })
  },
  tiao_m(e){
      wx.navigateTo({
        url: '/pages/Novel/Novel?bookId=' + e.currentTarget.dataset.bookid
      })
  },
  get_user(){
    var that = this
    //调用应用实例的方法获取全局数据  
    app.getUserInfo(function (userInfo) {
      console.log(userInfo)
      //更新数据  
      that.setData({
        userInfo: userInfo
      })
    })
  },
  get_moeny(){
    let that=this;
    app.get_data('wpCommonToolsInterface/guazi?methods=GetUserInfo',{
      openId:"oeVJhv1DQqAty-z8O5xJOPyrEbo0"
    },function(data){
      if(data.code=='GOOD'){
        console.log(data)
        that.setData({
          balance: data.content[0].user_balance,
          openid: data.content[0].wechat_openid,
          name: data.content[0].nick_name
        })
      }
    })
  },
  go_chong(){
    wx.navigateTo({
      url: '/pages/chongzhi/chongzhi',
    })
  },
  tiao_fen(){
    wx.navigateTo({
      url: '/pages/leibie/leibie',
    })
  }
})