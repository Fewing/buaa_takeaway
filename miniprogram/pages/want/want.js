// miniprogram/pages/want/want.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deliver_time: '立即'

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

  },
  time_submit:function (e)
  {
    this.setData(
      {
        deliver_time: e.detail.value
      }
    )
  },
  order_submit: function (e) {
    db.collection('order').add(
      {
        data: {
          product: e.detail.value.product,
          address: e.detail.value.address,
          fee: e.detail.value.fee,
          remarks: e.detail.value.remarks,
          createtime: db.serverDate(),
          delivertime: this.data.deliver_time,
        },
        success:function()
        {
          wx.showModal({
            title: '下单成功',
            content: '您已成功下单，即时订单保留一小时，指定时间订单超时后保留半小时',
            showCancel:false,
            success:function(){
              wx.navigateTo({
                url: '../index/index',
                success: function(res) {},
                fail: function(res) {},
                complete: function(res) {},
              })
            },
          })
        }
      }
    )
  },
})