const router = require('koa-router')()
const Mock = require('mockjs')

const jwt = require('jsonwebtoken')
const util = require('util')
const sendMail = require('../com/sendMail')
var log = require('../com/log');
const verify = util.promisify(jwt.verify) // 解密
const secret = 'lqwiuerpowjflaskdjffkhgoiwurpoqdjlsakjflsdkf' // 加盐 key

router.prefix('/api')

let for_req_fn = (obj, _get, _post) => {
  Object.keys(obj).forEach(item => {
    if (typeof obj[item] === 'object') {
      for_req_fn(obj[item], _get, _post)
    } else if (typeof obj[item] === 'function') {
      obj[item] = obj[item](_get, _post)
    }
  })
}

router.get('/log', async (ctx, next) => {

  let _obj = {
    obj: {
      code: '1',
      msg: 'ok',
      _get: function (_get, _post) {
        return _get
      }
    }
  }

  for_req_fn(_obj, ctx.query, ctx.request.body)
  ctx.body = Mock.mock(_obj);

  // 打印日志
  log(ctx.body)
})

router.get('/sendMail', async (ctx, next) => {

  sendMail({
    to: '376365334@qq.com',
    subject: '测试邮件标题',
    html: '<h1>测试邮件内容</h1>'
  });
  let _obj = {
    obj: {
      code: '1',
      msg: 'ok',
      _get: function (_get, _post) {
        return _get
      }
    }
  }

  for_req_fn(_obj, ctx.query, ctx.request.body)
  ctx.body = Mock.mock(_obj);
})

router.get('/', async (ctx, next) => {
  let userToken = {
      name: 'user.name'
  }
  const token = jwt.sign(userToken, secret, {expiresIn: '1h'})  //token签名 有效期为1小时
  // ctx.request.header['token'] = token
  // ctx.res.setHeader('token', token)
  ctx.cookies.set('token', token)
  let _obj = {
    obj: {
      token: token,
      code: '1',
      msg: 'ok',
      _get: function (_get, _post) {
        return _get
      }
    }
  }

  for_req_fn(_obj, ctx.query, ctx.request.body)
  ctx.body = Mock.mock(_obj);
})
router.post('/', async (ctx, next) => {
  let _obj = {
    obj: {
      code: '1',
      msg: 'ok',
      _post: function (_get, _post) {
        return _post
      }
    }
  }
  console.log(ctx.request.body)

  for_req_fn(_obj, ctx.query, ctx.request.body)
  ctx.body = Mock.mock(_obj);
})
router.get('/token', async (ctx, next) => {
  const token = 'Bearer ' + (ctx.header.authorization || ctx.query.token || ctx.request.body.token || ctx.cookies.get('token') || '')
  let payload
  if (token) {
      try{
        payload = await verify(token.split(' ')[1], secret)  // // 解密，获取payload
      }catch(error){
        payload = 'err'
      }
      ctx.body = {
        obj: {
          token: payload,
          _token: token
        }
      }
  } else {
      ctx.body = {
        obj: {
          message: 'token 错误',
          code: -1,
          _token: token
        }
      }
  }
})

module.exports = router
