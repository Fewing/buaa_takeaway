// 云函数入口文件
//接单调用的云函数
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
var access_token
var request = require('request')
// 云函数入口函数
exports.main = async(event, context) => {
  var e = await db.collection('order').where({
      _id: event.id
    })
    .update({
      data: {
        status: event.userInfo.openId
      },
    })
  var e = await db.collection('order').doc(event.id).get()
  var body = await cloud.callFunction({
    name: 'get',
    data: {

    }
  })
  console.log(body.result.access_token)
  var temp_hours
  var temp_minutes
  var temp_year
  var temp_month
  var temp_date
  temp_year = e.data.createtime.getFullYear()
  temp_month = e.data.createtime.getMonth() + 1
  temp_date = e.data.createtime.getDate()
  temp_hours = e.data.createtime.getHours()
  temp_minutes = e.data.createtime.getMinutes()
  if (temp_hours < 10) {
    temp_hours = "0" + temp_hours
  }
  if (temp_minutes < 10) {
    temp_minutes = "0" + temp_minutes
  }
  e.data.createtime = temp_year + "-" + temp_month + "-" + temp_date + " " + temp_hours + ":" + temp_minutes;
  var temp = {
    "touser": e.data._openid,
    "template_id": "H3crBQ-B9CPgAe9MEibk56yZUr0W-x7nuTQ8IqcSbts",
    "page": "pages/my_info/my_info",
    "form_id": e.data.form_id,
    "data": {
      "keyword1": {
        "value": e.data.product
      },
      "keyword2": {
        "value": e.data.deliver_address
      },
      "keyword3": {
        "value": e.data.createtime
      },
    },
  }
  var url = "https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=" + body.result.access_token
  return new Promise((resolve, reject) => {
    try {
      request.post({
        url: url,
        method: "POST",
        json: true,
        headers: {
          "content-type": "application/json",
        },
        body: temp
      }, (err, resp, body) => {
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