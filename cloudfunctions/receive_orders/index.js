exports.main = (event, context) => {
    const db = cloud.database()
    const _ = db.command
    try {
      return await db.collection('order').where({
        id: ""
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