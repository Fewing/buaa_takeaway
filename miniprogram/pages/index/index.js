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
  to_order: function(){
    wx.navigateTo({
      url: '../order/order'
    })
  },
  data: {
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
    db.collection('user_info').where({
      _openid: app.globalData.openid
    }).get().then(res => {
      if(res.data.length == 1)
      {
        if( now<= res.data[0].ban_time)
        {
          wx.redirectTo({
            url: '../banned/banned',
          })
        }
        app.globalData.campus=res.data[0].campus
      }
      else
      {
        wx.redirectTo({
          url: '../regist/regist',
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
