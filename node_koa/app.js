const Koa = require('koa')
const app = new Koa()
const cors = require('koa-cors')
const koaJwt = require('koa-jwt')
const path = require('path')
// const jwt = require('jsonwebtoken')
// const util = require('util')
// 解密
// const verify = util.promisify(jwt.verify)
// 加盐 key
const secret = 'lqwiuerpowjflaskdjffkhgoiwurpoqdjlsakjflsdkf'

const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const error = require('koa-error')
// form-data 不支持  x-www-form-urlencoded 改为
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const file_v1 = require('./routes/file_v1')
const users_v1 = require('./routes/users_v1')
const project_v1 = require('./routes/project_v1')
const api = require('./routes/api')

// 自定义 日志打印
const _log = require('./com/log')
global.log = _log()

// error handler
onerror(app)

/**
 * 错误捕捉中间件
 */
// app.use(async (ctx, next) => {
//   try {
//     ctx.error = (code, message) => {
//       if (typeof code === 'string') {
//         message = code
//         code = 500
//       }
//       ctx.throw(code || 500, message || '服务器错误')
//     }
//     await next();
//   } catch (e) {
//     let status = e.status || 500
//     let message = e.message || '服务器错误'
//     ctx.response.body = { status, message }

//   }
// })

// token 验证 js req header authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidXNlci5uYW1lIiwiaWF0IjoxNTE2Nzg3MDU0LCJleHAiOjE1MTY3OTA2NTR9.gEIBKKqhEQ_slW0BmSK-3pnaXxYFaOSOJonLb3Xc6n0"
// decodedToken 解密后(数据)key tokenKey 原始(token)key
app.use(koaJwt(
  {
    secret,
    key: 'decodedToken',
    tokenKey: 'token',
    getToken: (ctx) => {
      return (ctx.header.authorization || ctx.query.token || ctx.request.body.token || ctx.cookies.get('token') || '')
    }
  }
).unless({
  // 数组中的路径不需要通过jwt验证
  path: [/\//, /^\/users_v[0-9]\/login/, /^\/users_v[0-9]\/register/, /^\/file_v[0-9]\/[a-zA-Z]+/]
}))
// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text', 'multipart']
}))
// 错误处理模块
// app.use(error())
app.use(json())
// api 服务器 允许跨域
app.use(cors())
app.use(logger())
app.use(require('koa-static')(path.resolve(__dirname, '/public')))

app.use(views(path.resolve(__dirname, '/views'), {
  extension: 'ejs'
}))

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes

// 针对 /api 的中间件
app.use(async (ctx, next) => {
  await next()
  if (/^\/api\//.test(ctx.path)) {
    // 处理 !==200 错误
    if (ctx.response.status !== 200) {
      ctx.body = {
        obj: {
          res_code: '0',
          msg: 'ok'
        }
      }
    }

    if (ctx.body) {
      ctx.body.path = ctx.path
      ctx.body.query = ctx.query
      ctx.body.body = ctx.request.body
      ctx.body._req = ctx.request
      ctx.body._res = ctx.response
      ctx.body.apiV = '1.0'
    }
  }
})

// app.use(async (ctx, next) => {
//   await next()
// })

app.use(index.routes(), index.allowedMethods())
app.use(users_v1.routes(), users_v1.allowedMethods())
app.use(project_v1.routes(), project_v1.allowedMethods())
app.use(file_v1.routes(), file_v1.allowedMethods())
app.use(api.routes(), api.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  log({ err, ctx }, 'error')
  console.log(err)

  ctx.body = err
})

module.exports = app
