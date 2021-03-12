// miniprogram/pages/order_list/order_list.js
const app = getApp()
const db = wx.cloud.database()
const com = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'tab1',
    clientHeight: "",
    tabs: [{
        key: 'tab1',
        title: '订单',
      },
      {
        key: 'tab2',
        title: '接单',
      },
    ],
    order_list: [{

    }],
    deliver_list: [{

    }],
  },
  onTabsChange(e) {
    const {
      key
    } = e.detail
    const index = this.data.tabs.map((n) => n.key).indexOf(key)

    this.setData({
      key,
      index,
    })
  },
  onSwiperChange(e) {
    const {
      current: index,
      source
    } = e.detail
    const {
      key
    } = this.data.tabs[index]

    if (!!source) {
      this.setData({
        key,
        index,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },
  cancel:function(event){
    const that = this
    var id = event.target.id
    wx.showModal({
      title: '确认',
      content: '确定要取消订单吗？',
      confirmColor: "#ed3f14",
      success: res => {
        if (res.confirm) {
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
                  duration: 1000,
                  complete: res => {
                    setTimeout(function () { that.onShow(); }, 1000)
                  }
                })
              }
            })
        } else if (!res.confirm) {
          return
        }
      }
    })
  },
  confirm: function (event) {
    var id = event.target.id
    var that = this
    wx.showModal({
      title: '确认',
      content: '确认收到货了吗？',
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
                  duration: 1000,
                  mask: true,
                  complete: res => {
                    setTimeout(function () { that.onShow(); }, 1000)
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
  call:function(event)
  {
    var phone = event.target.id
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (app.globalData.login == false) {
      wx.showModal({
        title: '加载失败',
        content: '未注册',
        showCancel: false,
      })
      return
    }
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    }); //获取设备屏幕大小
    var d = new Date();
    //开始读取订单页信息
    db.collection('order').where({
      _openid: app.globalData.openid
    }).orderBy('createtime', 'desc')
      .get()
      .then(e => {
        var temp_years
        var temp_months
        var temp_days
        var temp_hours
        var temp_minutes
        var now = new Date()
        for (var i = 0; i < e.data.length; i++) {
          if (e.data[i].status == "0") {
            if (now > e.data[i].reserved_time) {
              e.data[i].status = "已过期"
              e.data[i].button_type = "ghost"
              e.data[i].button_text = "已过期"
              e.data[i].button_dis = true
            } else {
              e.data[i].status = "未接单"
              e.data[i].button_type = "error"
              e.data[i].button_text = "取消订单"
              e.data[i].button_dis = false
              e.data[i].button_change = "cancel"
            }
          } else if (e.data[i].status == "-1") {
            e.data[i].status = "已取消"
            e.data[i].button_type = "error"
            e.data[i].button_text = "已取消"
            e.data[i].button_dis = true
          } else {
            if (e.data[i].complete == "0") {
              e.data[i].status = "已接单"
              e.data[i].button_type = "info"
              e.data[i].button_text = "确认收货"
              e.data[i].button_dis = false
              e.data[i].button_change = "confirm"
            }
            if (e.data[i].complete == "1") {
              e.data[i].status = "已完成"
              e.data[i].button_type = "primary"
              e.data[i].button_text = "已完成"
              e.data[i].button_dis = true
            }
          }
          temp_hours = e.data[i].createtime.getHours()
          temp_minutes = e.data[i].createtime.getMinutes()
          temp_years = e.data[i].createtime.getFullYear()
          temp_months = e.data[i].createtime.getMonth() + 1
          temp_days = e.data[i].createtime.getDate()
          if (temp_hours < 10) {
            temp_hours = "0" + temp_hours
          }
          if (temp_minutes < 10) {
            temp_minutes = "0" + temp_minutes
          }
          e.data[i].createtime = temp_years + "/" + temp_months + "/" + temp_days + " " + temp_hours + ":" + temp_minutes;

        }
        this.setData({
          order_list: e.data
        })//开始读取接单页信息
        db.collection('order').where({
          status: app.globalData.openid
        }).orderBy('createtime', 'desc')
          .get()
          .then(e => {
            var temp_years
            var temp_months
            var temp_days
            var temp_hours
            var temp_minutes
            for (var i = 0; i < e.data.length; i++) {
              if (e.data[i].complete == "0") {
                e.data[i].status = "已接单"
                e.data[i].button_type = "info"
                e.data[i].button_text = "拨打电话"
                e.data[i].button_dis = false
                e.data[i].button_change = "call"
              }
              else {
                e.data[i].status = "已完成"
                e.data[i].button_type = "info"
                e.data[i].button_text = "已完成"
                e.data[i].button_dis = true
              }
              temp_hours = e.data[i].createtime.getHours()
              temp_minutes = e.data[i].createtime.getMinutes()
              temp_years = e.data[i].createtime.getFullYear()
              temp_months = e.data[i].createtime.getMonth() + 1
              temp_days = e.data[i].createtime.getDate()
              if (temp_hours < 10) {
                temp_hours = "0" + temp_hours
              }
              if (temp_minutes < 10) {
                temp_minutes = "0" + temp_minutes
              }
              e.data[i].createtime = temp_years + "/" + temp_months + "/" + temp_days + " " + temp_hours + ":" + temp_minutes;
            }
            this.setData({
              deliver_list: e.data
            })
            wx.hideLoading()
          })
        wx.hideLoading()
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