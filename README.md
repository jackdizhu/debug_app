## debug_app

koa + vue 定位前端 js 错误 (映射原始代码片段及行数)
# v0.2.0

koa^2.2 + mongoose^4.7.6 + vue^2.5.2 + iview^2.10.0-rc.1 简单登录注册 采用 token 验证(可完全分离部署)

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
