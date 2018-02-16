// pages/directory/directory.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      dir_list:[],
      page:1,
      bookId:'582bb9a00f90b34c03b4c765',
      select: [],
      index:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
   this.setData({
     bookId: options.bookId
   }),
     wx.setNavigationBarTitle({
       title: '目录详情'
     })
    let that=this;
    this.get_dir(this.data.page);
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },
  get_dir(pages){
    let that=this;
    app.get_data('wpCommonToolsInterface/guazi?methods=GetSectionInfo',{
      book:that.data.bookId,
      page:pages,
      count:10,
      //sortType:"hottest"
    },function(data){
        console.log(data)
        if(data.code=='GOOD'){
          that.setData({
            dir_list: data.content.section
          })
          console.log(data.content.section)
          that.setData({
            dir_num: data.content.num
          })
          var se_list=[];
          for (var i = 1; i <= Math.ceil(that.data.dir_num / 10);i++){
            se_list.push(i + '/' + Math.ceil(that.data.dir_num / 10));
          }
          that.setData({
            select:se_list
          })
          //console.log(select)
        }
    })
  },
  // scrolltolower(){
  //   this.get_dir(++this.data.page)
  // }
  nextbook(){
    wx.pageScrollTo({
      scrollTop: 0,
      duration:0
    })
    if (this.data.page<Math.ceil(this.data.dir_num/10)){
      this.get_dir(++this.data.page);
      this.setData({
        index: this.data.page-1,
      })
    }else{
      wx.showToast({
        title: '已是第最后一页',
        icon: 'none',
        duration: 2000
      })
    }
   
  },
    prevbook() {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
      })
      if (this.data.page>1){
        this.get_dir(--this.data.page)
        this.setData({
          index: this.data.page - 1,
        })
      }else{
        wx.showToast({
          title: '已是第一页',
          duration: 2000
        })
      }

  },
    listenerPickerSelected(e){
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
      })
      this.get_dir(e.detail.value-0+1);
      this.setData({
        index: e.detail.value,
        page: e.detail.value - 0 + 1
      })
    }
})