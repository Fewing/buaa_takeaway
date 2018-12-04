const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
    try {
      return await db.collection('order').where({
        id: event.id
      })
        .update({
          data: {
            status: event.userInfo.openId
          },
        })
    } catch (e) {
      console.error(e)
    }

}