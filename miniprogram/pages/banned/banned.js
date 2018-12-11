// miniprogram/pages/banned/banned.js
const app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bantime: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    db.collection('user_info').where(
      {
        _openid: app.globalData.openid
      }
    ).get().then(e => {
      var temp_hours
      var temp_minutes
      var temp_year
      var temp_month
      var temp_date
      temp_year = e.data[0].ban_time.getFullYear()
      temp_month = e.data[0].ban_time.getMonth() + 1
      temp_date = e.data[0].ban_time.getDate()
      temp_hours = e.data[0].ban_time.getHours()
      temp_minutes = e.data[0].ban_time.getMinutes()
      var temp = temp_year + "-" + temp_month + "-" + temp_date + " " + temp_hours + ":" + temp_minutes;
      this.setData({
        bantime: temp
      })
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