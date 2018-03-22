## debug_app

koa + vue 定位前端 js 错误 (映射原始代码片段及行数)
# v0.2.0

koa^2.2 + mongoose^4.7.6 + vue^2.5.2 + iview^2.10.0-rc.1 简单登录注册 采用 token 验证(可完全分离部署)
后端部署log.js 写错误日志到log文件夹

``` js
app.on('error', (err, ctx) => {
  log({ err, ctx }, 'error')
  console.log(err)

  ctx.body = err
})
```
# v0.3.0

``` js
{
  "msg": "ReferenceError: d is not defined @ Object.3../alloy-lever.js (http://127.0.0.1/AlloyLever/public/dist/js/build.js:321:9) @ s (http://127.0.0.1/AlloyLever/public/dist/js/build.js:1:265) @ e (http://127.0.0.1/AlloyLever/public/dist/js/build.js:1:436) @ http://127.0.0.1/AlloyLever/public/dist/js/build.js:1:465",
  "filename": "http://127.0.0.1/AlloyLever/public/dist/js/build.js",
  "line": 321,
  "column": 9
}
```
初步完成 登录注册,添加项目,查看错误信息
node 端对 sourcemap 逆向解析,还原原始代码
并通过页面上传的错误信息 filename line column 信息映射到原始文件
并显示错误行数前后5行代码片段

# v0.4.0

错误处理, bug 修复
前端错误捕获修改,
通过 window.error 捕获普通异常信息,
通过劫持 console.error 捕获 vue 等框架处理过的错误信息,
通过 uncaught 模块处理[ Uncaught (in promise) TypeError ] promise 中未catch的异常信息

# v0.5.0

前端修改,调用request方法时获取token,而不是 import 时获取,
修改 koa-cors --> koa2-cors 并配置
处理跨域 OPTIONS 设置Access-Control-Max-Age有效期防止重复请求

# v0.5.0

前端错误信息收集修改 上传 error.stack 信息,由后端从该数据中提取 name, filename, line, column 等信息

# v0.6.0

后端接收错误信息处理修改,build 文件报错数据解析规则修改
处理.map文件导出原始文件报错问题
browserify^15.2.0 打包正常 webpack^3.6.0 不能正常还原原始文件 (暂时不显示代码片段)
报错信息名称显示为空问题修改

# v0.6.0

错误信息按周查询,并按时间降序排序,最新的信息排前面
数据库调整 时间字段String改为Number方便处理

# v0.7.0

项目信息增加编辑功能,
token 验证失败返回问题处理 先执行 koa2-cors 添加跨域头部,保证保证后面错误可以正常返回被js处理
统一处理 登录超时token验证失败问题,request不在抛出Promise err

# v0.8.0

报错详情页面显示日期时间,暂时不显示代码片段
逻辑修改,先新增项目部署项目后再上传.map文件
Access-Control-Max-Age 有效期秒数 (修改方便测试)

# v0.9.0

处理发起请求是先发起 OPTIONS 请求问题,
node koa2-cors koa-jwt 设置
Access-Control-Allow-Headers: 'Content-Type,Authorization'
ctx.header.authorization
浏览器端 axios 设置
axios.defaults.headers['Authorization'] = token
header 设置 'Authorization' koa-jwt 读取为 'authorization' (header 不区分大小写)
修改后 GET 请求不再发送 OPTIONS 请求 POST 仍然发送 OPTIONS 请求 url 地址不一样(包括get参数 不包括post参数 )会重新发送 OPTIONS 请求

# v1.0.0

token 修改为以参数形式发送 不再发送 OPTIONS 请求
bodyparser koa中间件顺序调整,处理 koaJwt 获取不到post参数问题

# v1.0.1

前端体验优化,新增项目成功清楚表单数据,
新增项目,项目编辑,项目列表页面样式修改

# v1.0.2

http.js 增加 axios requestAll 方法 (axios.all)

## vue 问题
```less
// 引入css 使用别名 路径 ~@
@import '~@/them/com.less';
```
```js
data () {}
// data 定义 es6 箭头函数 会导致 读取 this 为 undefined 问题
data: () => {}
```
## mongodb

// 数据库 导出
mongodump -h 127.0.0.1 -o ./

// 还原 nodeKoa 数据库
mongorestore -d nodeKoa ./nodeKoa/

http://127.0.0.1:3000/projectErrorInfo_v1/addProjectErrorInfo?key=e0f1e39c0ef40253b5b21d24f137f69b&line=321&column=9&filename=http://127.0.0.1/AlloyLever/public/dist/js/build.js&msg=ReferenceError:%20d%20is%20not%20defined%20@%20Object.3../alloy-lever.js%20(http://127.0.0.1/AlloyLever/public/dist/js/build.js:321:9)%20@%20s%20(http://127.0.0.1/AlloyLever/public/dist/js/build.js:1:265)%20@%20e%20(http://127.0.0.1/AlloyLever/public/dist/js/build.js:1:436)%20@%20http://127.0.0.1/AlloyLever/public/dist/js/build.js:1:465
