// miniprogram/pages/meal/meal.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    product: "",
    reach_address: "",
    remark: "",
    deliver_address: "",
    fee: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    db.collection('user_info').where({
      _openid: app.globalData.openid
    }).get().then(res => {
      that.setData(
        {
          phone: res.data[0].phone,
          deliver_address: res.data[0].address
        }
      )
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
  update_product: function (e) {
    this.setData({
      product: e.detail.detail.value
    })
  },
  update_phone: function (e) {
    this.setData({
      phone: e.detail.detail.value
    })
  },
  update_reach_address: function (e) {
    this.setData({
      reach_address: e.detail.detail.value
    })
  },
  update_remark: function (e) {
    this.setData({
      remark: e.detail.detail.value
    })
  },
  update_deliver_address: function (e) {
    this.setData({
      deliver_address: e.detail.detail.value
    })
  },
  update_fee: function (e) {
    this.setData({
      fee: e.detail.detail.value
    })
  },
  order_submit: function (e) {
    const that = this
    if (app.globalData.login == false) {
      wx.showModal({
        title: '未注册',
        content: '注册后才能创建任务',
        showCancel: false,
      })
      return
    }
    if (this.data.company == "") {
      wx.showModal({
        title: '错误',
        content: '请填写商品名称',
        showCancel: false,
      })
      return
    }
    if (that.data.reach_address == "") {
      wx.showModal({
        title: '错误',
        content: '请填写取件地址',
        showCancel: false,
      })
      return
    }
    if (that.data.phone == "") {
      wx.showModal({
        title: '错误',
        content: '请填写电话',
        showCancel: false,
      })
      return
    }
    if (that.data.deliver_address == "") {
      wx.showModal({
        title: '错误',
        content: '请填写送货地址',
        showCancel: false,
      })
      return
    }
    if (that.data.fee == "") {
      wx.showModal({
        title: '错误',
        content: '请填写跑腿小费',
        showCancel: false,
      })
      return
    }
    if (that.data.fee > 20 || that.data.fee < 2) {
      wx.showModal({
        title: '错误',
        content: '小费限制2-20元',
        showCancel: false,
      })
      return
    }
    wx.showLoading({
      title: '请稍后',
      mask: 'true',
    })
    var deliver_date = new Date();
    db.collection('order').add(
      {
        data: {
          product: that.data.product,
          reach_address: that.data.reach_address,
          deliver_address: that.data.deliver_address,
          fee: that.data.fee,
          phone: that.data.phone,
          remarks: that.data.remark,
          createtime: db.serverDate(),
          reserved_time: db.serverDate({
            offset: 60 * 60 * 1000,
          }),
          type: 2,
          status: "0",
          complete: "0",
          form_id: e.detail.formId,
          campus: app.globalData.campus,
        },
        success: function () {
          wx.hideLoading()
          wx.showModal({
            title: '下单成功',
            content: '您已成功下单，打饭订单保留时间为一小时，您也可以手动取消订单',
            showCancel: false,
            success: function () {
              wx.switchTab({
                url: '../order_list/order_list',
              })
            },
          })
        }
      }
    )
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