# 多人博客

## 项目
* 根据网络上的[编程课](https://github.com/nswbmw/N-blog)做初步学习 

## 环境说明
* 本博客采用 express + Bootstrap + mongoose 所写，未完成
* 项目中所使用的第三方中间件
    * "config-lite": "^2.0.0",      用于项目中的自定义配置
    * "connect-flash": "^0.1.1",    
    * "connect-mongo": "^1.3.2",
    * "ejs": "^2.5.6",
    * "express": "^4.15.3",
    * "express-formidable": "^1.0.0",
    * "express-session": "^1.15.4",  // 1.5.0之后不需要在配合cookie-parser中间件
    * "express-winston": "^2.4.0",
    * "marked": "^0.3.6",
    * "moment": "^2.18.1",
    * "mongoose": "4.10.8",
    * "objectid-to-timestamp": "^1.3.0",
    * "sha1": "^1.1.1",
    * "winston": "^2.3.1"
* 项目中自己抽象的可复用的中间件(位于models下)
    * check.js             权限检查
* 项目中自己抽象的可能可以复用的函数模块
    * localVariables.js    本地模板变量定义
    * mongooseConnect.js   mongoose的链接
    * mongooseSchema.js    定义mongoose的Schema、model
    * sess.js              session 的配置文件 具体配置数据从config对象中获取

## 目前待做

### 功能性完善
* ~~登录~~
* ~~发表文章~~
* 文章展开展示
    * 点击任意文章缩略链接——展示文章全部内容
    * ~~发表完一篇文章后自动跳转展示完整文章~~
* ~~文章缩略展示~~
    * ~~所有文章在首页展示~~
    * ~~某个作者的所有文章在某页展示~~
* 登录者头像
    * ~~显示头像~~
    * 当鼠标滑向头像时弹出部分个人信息气泡
    * 点击头像跳转到个人文章缩略页
    * 更换头像
    * 上传头像支持自定义裁剪
    * 缩略图处理  考虑用sae的图片服务器  并且独立为一个单独模块
    * 对点击头像后的个人详情页 重构 仿照知乎样式
* 更新文章
* 删除文章
* 文章分页
* 发表留言
* 留言删除
* 留言修改
* 留言分页
* 编辑器支持markdown

### 安全性修补0
* sha1 并不是一种十分安全的加密方式，实际开发中可以使用更安全的 bcrypt 或 scrypt 加密

### 稳定性修复
* 当没有icon文件夹时，处理相应的错误

### 代码抽象
* 注册验证独立为一个模块
>>>>>>> adult
