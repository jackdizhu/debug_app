## debug_app

koa + vue 定位前端 js 错误 (映射原始代码片段及行数)

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
