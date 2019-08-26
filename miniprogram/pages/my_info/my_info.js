// miniprogram/pages/my_info/my_info.js
const app = getApp();
const db = wx.cloud.database();
const com = db.command
const that = this
var sliderWidth = 96
Page({

  /**
   * 页面的初始数据
   */
  data: {
    my_order: [{

    }],
    my_deliver:[{}],
    tabs: ["订单", "接单", "信息"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  confirm: function(event) {
    var id = event.target.id
    var that = this
    wx.showModal({
      title: '确认',
      content: '您已经收到了货吗？',
      success: res => {
        if (res.confirm) {
          wx.showLoading({
            title: '请稍后',
            mask: 'true',
          })
          db.collection('order').doc(id)
            .update({
              data: {
                complete: "1",
              },
              success: res => {
                wx.hideLoading()
                wx.showToast({
                  title: '确认收货成功',
                  icon: 'success',
                  duration: 2000,
                  complete: res => {
                    for (var i = 0; i < this.data.my_order.length; i++) {
                      if (this.data.my_order[i]._id == id) {
                        this.data.my_order[i].status = '已完成'
                      }
                    }
                    this.setData({
                      my_order: this.data.my_order,
                    })
                  }
                })
              }
            }, )
        } else if (!res.confirm) {
          return
        }
      }
    })
  },
  cancel: function(event) {
    var id = event.target.id
    wx.showModal({
      title: '确认',
      content: '确定要取消订单吗？',
      confirmColor: "#e64340",
      success: res => {
        if (res.confirm) {
          this.setData({
            test: 1,
          })
          wx.showLoading({
            title: '请稍后',
            mask: 'true',
          })
          db.collection('order').doc(id)
            .update({
              data: {
                status: "-1",
              },
              success: res => {
                wx.hideLoading()
                wx.showToast({
                  title: '订单取消成功',
                  icon: 'success',
                  duration: 2000,
                  complete: res => {
                    for (var i = 0; i < this.data.my_order.length; i++) {
                      if (this.data.my_order[i]._id == id) {
                        this.data.my_order[i].status = '已取消'
                      }
                    }
                    this.setData({
                      my_order: this.data.my_order,
                    })
                    
                  }
                })
              }
            }, )
        } else if (!res.confirm) {
          return
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var d = new Date();
    var t = d.getTime();
    t -= 3600000; //一个小时的毫秒数
    var d_limit = new Date(t);
    db.collection('order').where(
        com.or({
          delivertime: com.gte(d_limit),
          _openid: app.globalData.openid,
        }, {
          status: com.neq('0').and(com.neq('-1')),
          complete: '0',
          _openid: app.globalData.openid,
        })
      ).orderBy('delivertime', 'desc')
      .get()
      .then(e => {
        var temp_hours
        var temp_minutes
        var temp_year
        var temp_month
        var temp_date
        for (var i = 0; i < e.data.length; i++) {
          temp_year = e.data[i].delivertime.getFullYear()
          temp_month = e.data[i].delivertime.getMonth() + 1
          temp_date = e.data[i].delivertime.getDate()
          temp_hours = e.data[i].delivertime.getHours()
          temp_minutes = e.data[i].delivertime.getMinutes()
          if (temp_hours < 10) {
            temp_hours = "0" + temp_hours
          }
          if (temp_minutes < 10) {
            temp_minutes = "0" + temp_minutes
          }
          e.data[i].delivertime = temp_year + "-" + temp_month + "-" + temp_date + " " + temp_hours + ":" + temp_minutes;
          if (e.data[i].status == "0") {
            e.data[i].status = "未接单"
          } else if (e.data[i].status == "-1") {
            e.data[i].status = "已取消"
          } else {
            if (e.data[i].complete == "0") {
              e.data[i].status = "已接单，递送中"
            }
            if (e.data[i].complete == "1") {
              e.data[i].status = "已完成"
            }
          }
        }
        this.setData({
          my_order: e.data
        })
      })
    var d1 = new Date();
    var t1 = d1.getTime();
    t1 -= 86400000; //一个小时的毫秒数
    var d1_limit = new Date(t1);
    db.collection('order').where(
      {
        delivertime: com.gte(d1_limit),
        status: app.globalData.openid,
      }
        )
      .orderBy("complete", "asc").orderBy('delivertime', 'desc')
      .get()
      .then(e_ => {
        var temp_hours
        var temp_minutes
        var temp_year
        var temp_month
        var temp_date
        for (var i = 0; i < e_.data.length; i++) {
          temp_year = e_.data[i].delivertime.getFullYear()
          temp_month = e_.data[i].delivertime.getMonth() + 1
          temp_date = e_.data[i].delivertime.getDate()
          temp_hours = e_.data[i].delivertime.getHours()
          temp_minutes = e_.data[i].delivertime.getMinutes()
          if (temp_hours < 10) {
            temp_hours = "0" + temp_hours
          }
          if (temp_minutes < 10) {
            temp_minutes = "0" + temp_minutes
          }
          e_.data[i].delivertime = temp_year + "-" + temp_month + "-" + temp_date + " " + temp_hours + ":" + temp_minutes;
          if (e_.data[i].status == "0") {
            e_.data[i].status = "未接单"
          } else if (e_.data[i].status == "-1") {
            e_.data[i].status = "已取消"
          } else {
            if (e_.data[i].complete == "0") {
              e_.data[i].status = "已接单，请递送"
            }
            if (e_.data[i].complete == "1") {
              e_.data[i].status = "已完成"
            }
          }
        }
        this.setData({
          my_deliver: e_.data
        })
      })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
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
    this.onShow()
    wx.stopPullDownRefresh()
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