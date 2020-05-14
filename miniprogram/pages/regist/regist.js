// miniprogram/pages/regist/regist.js
const db = wx.cloud.database()
var image_path = ""
var image_base64
Page({

  /**
   * 页面的初始数据
   */
  data: {
    card_image: "",
    campus: ['学院路校区','沙河校区'],
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
  doUpload: function () {
    // 选择图片
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success: res => {
        const filePath = res.tempFilePaths[0]
        image_path = filePath
        that.setData({
          card_image: filePath,
        })
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            image_base64 = res.data
          }
        })
      }
    })
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
    if (this.data.card_image == "") {
      wx.showModal({
        title: '错误',
        content: '您还未上传校园卡图片',
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
    var that=this
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=xxxx&client_secret=xxxx',//获取百度云平台token，请将此处替换为你自己的获取链接
      success(res) {
        var access_token = res.data.access_token
        wx.request({
          url: 'https://aip.baidubce.com/rest/2.0/solution/v1/iocr/recognise?access_token=' + access_token,
          data: {
            image: image_base64,
            templateSign: '641378d45aa3dfffa2e483a1e43e4698'
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success(res) {
            //console.log(res.data.data.ret) //百度api返回值
            var info = res.data.data.ret
            if (info[0].word == e.detail.value.name && info[1].word == e.detail.value.number) {
              db.collection('user_info').add(
                {
                  data: {
                    name: e.detail.value.name,
                    number: e.detail.value.number,
                    campus:that.data.campus_index,//0为学院路校区，1为沙河校区
                    phone:e.detail.value.phone,
                    address:e.detail.value.address,
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
            }
            else
            {
              wx.hideLoading()
              wx.showModal({
                title: '失败',
                content: '验证失败，请确认使用了正确清晰的照片',
                showCancel: false,
              })
            }
          }
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
