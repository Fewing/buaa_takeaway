// 云函数入口文件
const cloud = require('wx-server-sdk')
const request = require('request')
cloud.init()

// 云函数入口函数
exports.main = (event, context) => {
  console.log("第一步")
  console.log('开始GET')
  new Promise((resolve, reject) => {
    try {
      request(event.url, (err, resp, body) => {
        if (err) {
          return reject(err)
        }
        return resolve(body)
      })
    } catch (e) {
      return reject(err)
    }
  })
  request.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx0a053365786e17f8&secret=f938a9bbc142010255ad84bd66fbc166')
  console.log(response)
  access_token = res.access_token
  var temp = {
    "touser": e.data._openid,
    "template_id": "H3crBQ-B9CPgAe9MEibk56yZUr0W-x7nuTQ8IqcSbts",
    "page": "my_info",
    "form_id": e.data.form_id,
    "data": {
      "keyword1": {
        "value": e.data.product
      },
      "keyword2": {
        "value": e.data.address
      },
      "keyword3": {
        "value": e.data.delivertime
      },
    },
    "emphasis_keyword": "keyword1.DATA"
  }
  var url = "https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=" + access_token
  console.log(url)
  request({
    url: "url",
    method: "POST",
    json: true,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(temp)
  }, function(error, response, body) {
    if (!error && response.statusCode == 200) {}
  })

}