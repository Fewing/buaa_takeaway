### 简介

航概校园邦是一个面向北航大学生的C2C互助跑腿微信小程序

#### 如何使用

扫描下方小程序码，或者微信搜索“航概校园邦即可进入”
<center><img src="logo/qr.jpg" /> </center>

#### 功能

1. 注册：用户首次使用时需要使用学号和姓名并上传校园卡进行验证，只有人证一致才能成功注册；
2. 发单：目前用户可以发布打饭和取快递两种跑腿任务，或者发布自定义任务；
3. 接单：用户可以在接单页查看目前有哪些任务可以接取；
4. 推送：用户发布的任务被接单会收到微信推送通知；
5. 订单管理：订单页展示了用户所发布和接取的订单，对于还未接单的订单，用户可以取消，已接单的订单，用户可以确认收货，在已接单页，用户可以一键拨打发单用户的联系电话；
6. 校区管理：用户可以设置自己所在校区，避免看到其他校区的订单；
7. 自动填充：用户可以事先设置好送货地址和手机号，下单时便会自动填充。

#### 环境要求

[微信开发者工具]

#### 在本地部署

1. 在开发工具创建自己的小程序项目；
2. 将miniprogram文件夹替换为该项目的miniprogram文件夹；
3. 重新用开发工具打开项目。

#### 云开发

1. 该小程序使用了微信官方提供的云开发功能，包括云函数与云数据库；
2. 云函数相关代码位于cloudfunctions文件夹内，云数据库的两个集合名为“order”和“user_info”；
3. 如需完整部署该小程序，需要开启小程序云开发功能，并创建相应的云函数和云数据库；
4. 具体可参考[小程序云开发文档]。

####  客服与反馈

1. 在小程序首页联系客服或发送反馈
2. 发送邮件到 yangzheyu00@hotmail.com

#### 加入项目

如有兴趣加入该项目可发送邮件到 yangzheyu00@hotmail.com

#### 授权

[GPLv3]

#### 项目所使用到的第三方开源组件/库

```
iview-weapp (MIT)    https://github.com/TalkingData/iview-weapp
Wux-Weapp (MIT)      https://github.com/wux-weapp/wux-weapp/          
```
[GPLv3]:        https://github.com/Fewing/buaa_takeaway/blob/master/LICENSE
[微信开发者工具]: https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
[小程序云开发文档]: https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html
