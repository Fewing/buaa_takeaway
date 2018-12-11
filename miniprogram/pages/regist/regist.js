// miniprogram/pages/regist/regist.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*wx.startWifi({
      success: res=>{
        wx.getConnectedWifi({
          success: res=> {
            if (res.wifi.SSID == 'BUAA-Mobile' || res.wifi.SSID == 'BUAA-WiFi')
            {
            }
            else 
            {
              wx.switchTab({
                url: '../index/index',
              })
            }
          },
          fail: res=> {
            console.log(res)
            wx.showModal({
              title: '连接WiFi',
              content: '请连接校园网WiFi以完成注册',
              showCancel: false,
              success(res) {
                wx.switchTab({
                  url: '../index/index',
                })
              }
            })
          }
        })
      },
      fail: res => {
        console.log(res)
        wx.showModal({
          title: '连接WiFi',
          content: '请连接校园网WiFi以完成注册',
          showCancel: false,
          success (res) {
            wx.switchTab({
              url: '../index/index',
            })
          }
        })
      }
    })*/
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

  regist: function(e)
  {
    if (e.detail.value.name == "")
    {
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
    wx.showLoading({
      title: '请稍后',
      mask: 'ture',
    })
    db.collection('user_info').add(
      {
        data: {
          name: e.detail.value.name,
          number: e.detail.value.number,
          createtime: db.serverDate(),
          ban_time: db.serverDate({
            offset: -60 * 60 * 1000
          }),
          score:0,
          deliver_number:0,
        },
        success: function(){
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