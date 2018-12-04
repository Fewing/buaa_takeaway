// miniprogram/pages/deliver/deliver.js
const db = wx.cloud.database()
const com = db.command
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_list: [{

    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var d = new Date();
    var t = d.getTime();
    t -= 3600000; //一个小时的毫秒数
    var d_limit = new Date(t);
    db.collection('order').where({
        delivertime: com.gte(d_limit),
        status:'0',
      }).orderBy('delivertime', 'asc')
      .get()
      .then(e => {
        var temp
        for (var i = 0; i < e.data.length; i++) {
          temp = e.data[i].delivertime
          e.data[i].delivertime = temp.getHours() + ":" + temp.getMinutes();
        }
        this.setData({
          order_list: e.data
        })
      })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  order_receive: function(event) {
    var id = event.target.id
    wx.showLoading({
      title: '请稍后',
      mask: 'true',
    })
    db.collection('order').where({
        _id: id,
      }).get()
      .then(e => {
        if (e.data[0].status != '0') {
          wx.hideLoading()
          wx.showModal({
            title: '手慢了',
            content: '该单已经被抢走了',
            showCancel: false,
          })
          return
        } else {
          wx.cloud.callFunction({
            name: "order",
            data: {
              id: id,
            },
            complete: res =>  {
              db.collection('order').where({
                _id: id,
              }).get()
              .then(e => {
                if (e.data[0].status == app.globalData.openid) {
                  wx.hideLoading()
                  wx.showModal({
                    title: '接单成功',
                    content: '接单成功，请尽快按照要求送达',
                    showCancel: false,
                    success: function() {
                      wx.navigateTo({
                        url: '../my_info/my_info',
                      })
                    },
                  })
                } else {
                  wx.hideLoading()
                  wx.showModal({
                    title: '接单失败',
                    content: '请稍后再试',
                    showCancel: false,
                    success: function() {
                      wx.navigateTo({
                        url: '../my_info/my_info',
                      })
                    },
                  })
                }
              })

            }
          })
        }
      })

  },
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})