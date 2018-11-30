const db = wx.cloud.database()
Page({
  data:{
    test_text: "等待文字"
  },
  text_submit: function (e) {
    console.log(e.detail.value.text)
    db.collection('test').add(
      {
        data: {
          text: e.detail.value.text,
          createTime: db.serverDate(),
        }
      }
    )
  },
  pull_db: function () {
    db.collection('test').where(
      {
        text: "123456"
      }
    ).orderBy('createTime', 'desc')
      .get()
      .then(order_list => {
        console.log(order_list.data)
        this.setData(
          {
            test_text: order_list.data[0].text,
          }
        )
      })
      .catch(console.error);
  },
})