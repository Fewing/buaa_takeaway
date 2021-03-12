// miniprogram/pages/regist/regist.js
const db = wx.cloud.database()
var image_path = ""
var image_base64
Page({

  /**
   * 页面的初始数据
   */
  data: {
    campus: ['学院路校区', '沙河校区'],
    campus_index: 0,
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
  bindPickerChange: function (e) {
    var temp = parseInt(e.detail.value)
    this.setData({
      campus_index: temp
    })
  },
  regist: function (e) {
    if (e.detail.value.name == "") {
      wx.showModal({
        title: '错误',
        content: '请输入姓名',
        showCancel: false,
      })
      return
    }
    if (e.detail.value.number == "") {
      wx.showModal({
        title: '错误',
        content: '请输入学号',
        showCancel: false,
      })
      return
    }
    if (this.data.phone == "") {
      wx.showModal({
        title: '错误',
        content: '请填写手机号',
        showCancel: false,
      })
      return
    }
    if (this.data.card_image == "") {
      wx.showModal({
        title: '错误',
        content: '请填写默认地址',
        showCancel: false,
      })
      return
    }
    wx.showLoading({
      title: '请稍后',
      mask: 'ture',
    })
    var that = this
    db.collection('user_info').add(
      {
        data: {
          name: e.detail.value.name,
          number: e.detail.value.number,
          campus: that.data.campus_index,//0为学院路校区，1为沙河校区
          phone: e.detail.value.phone,
          address: e.detail.value.address,
          createtime: db.serverDate(),
          ban_time: db.serverDate({
            offset: -60 * 60 * 1000
          }),
        },
        success: function () {
          wx.hideLoading()
          wx.showModal({
            title: '成功',
            content: '注册成功！欢迎使用北航打饭邦',
            showCancel: false,
            success: function () {
              wx.switchTab({
                url: '../index/index',
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
