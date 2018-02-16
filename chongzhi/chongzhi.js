// pages/chongzhi/chongzhi.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    border_num:2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_apply();
    wx.setNavigationBarTitle({
      title: '充值界面'
    })
  },
  change(e){
      this.setData({
        border_num: e.currentTarget.dataset.index
      })
  },
  get_apply(){
    app.get_data('wpCommonToolsInterface/guazistory?methods=createOrder',{
      openId:'oeVJhv1DQqAty-z8O5xJOPyrEbo0',
      typeId:2
    },function(data){
      if(data.code=='GOOD'){
        app.get_data('wpCommonToolsInterface/guazistory?methods=getPayInfo',{
          openId: 'oeVJhv1DQqAty-z8O5xJOPyrEbo0',
          orderId: data.content
        },function(data){
              console.log(data)
        })
      }
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