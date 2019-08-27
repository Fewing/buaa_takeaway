// miniprogram/pages/want/want.js 
const db = wx.cloud.database()
Page({

  /** 
   * 页面的初始数据 
   */
  data: {
    deliver_time: '立即',
    now: new Date().getHours + ":" + new Date().getMinutes,
  },

  /** 
   * 生命周期函数--监听页面加载 
   */
  onLoad: function (options) {
    var date = new Date()
    this.setData(
      {
        now: date.getHours() + ":" + date.getMinutes()
      }
    )
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
  time_submit: function (e) {
    this.setData(
      {
        deliver_time: e.detail.value
      }
    )
  },
  order_submit: function (e) {
    if (e.detail.value.product == "") {
      wx.showModal({
        title: '错误',
        content: '请填写商品名称',
        showCancel: false,
      })
      return
    }
    if (e.detail.value.address == "") {
      wx.showModal({
        title: '错误',
        content: '请填写送货地点',
        showCancel: false,
      })
      return
    }
    if (e.detail.value.fee == "" || isNaN(e.detail.value.fee)) {
      wx.showModal({
        title: '错误',
        content: '请正确填写小费',
        showCancel: false,
      })
      return
    }
    if (e.detail.value.phone == "" || isNaN(e.detail.value.fee)) {
      wx.showModal({
        title: '错误',
        content: '请正确输入手机号',
        showCancel: false,
      })
      return
    }
    wx.showLoading({
      title: '请稍后',
      mask: 'true',
    })
    var deliver_date = new Date();
    if (this.data.deliver_time != "立即") {
      var hours = this.data.deliver_time[0] + this.data.deliver_time[1];
      var minutes = this.data.deliver_time[3] + this.data.deliver_time[4];
      deliver_date.setHours(hours);
      deliver_date.setMinutes(minutes);
    }
    db.collection('order').add(
      {
        data: {
          product: e.detail.value.product,
          address: e.detail.value.address,
          fee: e.detail.value.fee,
          phone: e.detail.value.phone,
          remarks: e.detail.value.remarks,
          createtime: db.serverDate(),
          delivertime: deliver_date,
          type:0,
          status: "0",
          complete: "0",
          form_id: e.detail.formId,
        },
        success: function () {
          wx.hideLoading()
          wx.showModal({
            title: '下单成功',
            content: '您已成功下单，订单将最多为您保留到送达时间后一小时',
            showCancel: false,
            success: function () {
              wx.switchTab({
                url: '../my_info/my_info',
              })
            },
          })
        }
      }
    )
  },
})