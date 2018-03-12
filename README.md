## debug_app

koa + vue 定位前端 js 错误 (映射原始代码片段及行数)
# v0.2.0

koa^2.2 + mongoose^4.7.6 + vue^2.5.2 + iview^2.10.0-rc.1 简单登录注册 采用 token 验证(可完全分离部署)

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
