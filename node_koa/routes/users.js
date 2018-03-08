const router = require('koa-router')()
const userModel = require('../models/user')

router.prefix('/users')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  let users = await userModel.find({name: 'jackdizhu'})
  ctx.body = {
    title: 'koa2 json'
  }
})
// 添加记录
router.get('/add', async (ctx, next) => {
  let user = await userModel.insert({
    name: 'jackdizhu',
    password: 'password'
  })
  ctx.body = {
    title: 'koa2 json',
    user: user
  }
})
// 查找记录
router.get('/find', async (ctx, next) => {
  let users = await userModel.find({name: 'jackdizhu'})
  ctx.body = {
    title: 'koa2 json',
    users: users
  }
})
// 修改记录
router.get('/edit', async (ctx, next) => {
  let _user = await userModel.findOne({name: 'jackdizhu'})
  _user._id = _user._id.toString()
  _user.nick_name = 'jackdizhu1'
  let R = await userModel.update(_user)
  let user = await userModel.findOne({name: 'jackdizhu'})
  ctx.body = {
    title: 'koa2 json',
    user: user
  }
})

module.exports = router
