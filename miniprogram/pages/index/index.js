//index.js
const app = getApp()
const db = wx.cloud.database()
const com = db.command
var openid
Page({
  openAlert: function () {
    wx.showModal({
      content: '欢迎使用北航打饭邦。 诚信第一，请勿恶意下单、接单。',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
        }
      }
    });
  },
  to_express: function(){
    wx.navigateTo({
      url: '../express/express'
    })
  },
  to_customize: function () {
    wx.navigateTo({
      url: '../customize/customize'
    })
  },
  to_meal: function () {
    wx.navigateTo({
      url: '../meal/meal'
    })
  },
  to_deliver: function () {
    wx.navigateTo({
      url: '../temp_deliver/temp_deliver'
    })
  },
  to_order_list: function()
  {
    wx.navigateTo({
      url: '../order_list/order_list'
    })
  },
  to_test: function () {
    wx.navigateTo({
      url: '../regist/regist'
    })
  },
  onClick(e) {
    console.log('onClick', e.detail)
    if (e.detail.index === 1) {
      wx.navigateToMiniProgram({
        appId: 'wx18a2ac992306a5a4',
        path: 'pages/apps/largess/detail?id=ohK5VPvCJE4%3D',
      })
    }
  },
  data: {
    campus: ["学院路校区","沙河校区"],
    index: "",
    buttons: [
    {
      openType: 'share',
      label: 'Share',
      icon: "../../index/share.svg"
    },
    {
      icon: "../../index/appreciate.svg",
      label: 'appreciate',
    },
    ]
  },
  onLoad: function() {
    wx.showLoading({
      title: '请稍后',
      mask: true,
    })
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        app.globalData.openid = res.result.openid
        wx.hideLoading()
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var now = new Date()
    var that =this
    db.collection('user_info').where({
      _openid: app.globalData.openid
    }).get().then(res => {
      if(res.data.length == 1)
      {
        app.globalData.campus = res.data[0].campus
        that.setData({
          index: res.data[0].campus,
        })
        if( now<= res.data[0].ban_time)
        {
          wx.redirectTo({
            url: '../banned/banned',
          })
        }
      }
      else
      {
        wx.redirectTo({
          url: '../to_regist/to_regist',
        })
      }
    })
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
