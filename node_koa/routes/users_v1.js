const router = require('koa-router')()
const userModel = require('../models/user')
// const util = require('util')
const jwt = require('jsonwebtoken')
// 解密
// const verify = util.promisify(jwt.verify)
// 加盐 key
const secret = 'lqwiuerpowjflaskdjffkhgoiwurpoqdjlsakjflsdkf'

router.prefix('/users_v1')

// 添加记录
router.post('/register', async (ctx, next) => {
  let _post = ctx.request.body || {}
  let { name, passwd } = _post

  let _initUser = {
    name: '',
    password: '',
    email: '',
    phone: '',
    ext: {
      nick_name: 'nick_name',
      head_img: 'head_img'
    }
  }
  let user = {}
  let res_code = '-1'
  let msg = ''
  if (name && passwd) {
    _initUser.name = name
    _initUser.password = passwd
    user = await userModel.insert(_initUser)
    if (user) {
      // 密码 不放回
      user.password = undefined
      res_code = '0'
      msg = '注册成功.'
    } else {
      res_code = '-1'
      msg = '注册失败.'
    }
  } else {
    res_code = '-2'
    msg = '填写信息不完整.'
  }

  ctx.body = {
    title: 'register',
    res_code: res_code,
    msg: msg,
    user: user
  }
})
// 登录
router.post('/login', async (ctx, next) => {
  let _post = ctx.request.body || {}
  let { name, passwd } = _post

  let token = ''
  let user = {}
  let res_code = '-1'
  let msg = ''
  if (name && passwd) {
    user = await userModel.findOne({name: name, password: passwd})
    token = ''
    if (user) {
      // 登录成功
      let userToken = {
        name: user.name
      }
      // token签名 有效期为1小时
      token = jwt.sign(userToken, secret, {expiresIn: '1h'})

      res_code = '0'
      msg = '登录成功.'
    } else {
      res_code = '-1'
      msg = '用户名或密码错误.'
    }
  } else {
    res_code = '-2'
    msg = '填写信息不完整.'
  }

  ctx.body = {
    title: 'login',
    res_code: res_code,
    msg: msg,
    user: user,
    token: token
  }
})

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  // let users = await userModel.find({name: 'jackdizhu'})
  ctx.body = {
    title: 'koa2 json'
  }
})
// 查找记录
router.get('/find', async (ctx, next) => {
  let users = await userModel.find({name: 'jackdizhu'})
  ctx.body = {
    title: 'find',
    users: users
  }
})
// 修改记录
router.get('/edit', async (ctx, next) => {
  let _user = await userModel.findOne({name: 'jackdizhu'})
  _user._id = _user._id.toString()
  _user.password = 'password1'
  // let R =
  await userModel.update(_user)
  let user = await userModel.findOne({name: 'jackdizhu'})
  ctx.body = {
    title: 'edit',
    user: user
  }
})
// token
router.get('/token', async (ctx, next) => {
  const decodedToken = ctx.state.decodedToken
  const token = ctx.state.token
  ctx.body = {
    obj: {
      token: token,
      _token: decodedToken
    }
  }
})

module.exports = router
