// 云函数入口文件
//获取推送token
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
var access_token
var request = require('request')
// 云函数入口函数
exports.main = async (event, context) => {
  /*var e = await db.collection('order').where({
      _id: event.id
    })
    .update({
      data: {
        status: event.userInfo.openId
      },
    })
  var e = await db.collection('order').doc(event.id).get()
  await cloud.callFunction({
    name: 'sendmessage',
    data: {
      order: e,
    }
  })*/
  var err
  var resp
  var body
  return new Promise((resolve, reject) => {
    try {
      request('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx0a053365786e17f8&secret=f938a9bbc142010255ad84bd66fbc166', (err, resp, body) => {
        if (err) {
          return reject(err)
        }
        return resolve(body)
      })
    } catch (e) {
      return reject(err)
    }
  })
}