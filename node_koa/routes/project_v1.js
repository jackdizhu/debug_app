const router = require('koa-router')()
const projectModel = require('../models/project')
const fileModel = require('../models/file')
// const util = require('util')
const md5 = require("md5")

router.prefix('/project_v1')

// 添加记录
router.post('/addProject', async (ctx, next) => {
  let _post = ctx.request.body || {}
  let { name, msg, mapFile, mapFileUrl, userId } = _post

  let _initProject = {
    name: '',
    user_id: '',
    date: (() => {
      return new Date().getTime()
    })(),
    msg: '',
    mapFile: '',
    mapFileUrl: '',
    key: (() => {
      let _t = new Date().getTime() + userId
      str = md5(_t)
      return str
    })(),
    ext: {}
  }
  let user = {}
  let res_code = '-1'
  let resMsg = ''
  if (name && userId) {
    _initProject.name = name
    _initProject.user_id = userId
    _initProject.msg = msg
    _initProject.mapFile = mapFile
    _initProject.mapFileUrl = mapFileUrl
    project = await projectModel.insert(_initProject)
    if (project) {
      res_code = '0'
      resMsg = '添加项目成功.'
    } else {
      res_code = '-1'
      resMsg = '添加项目失败.'
    }
  } else {
    res_code = '-2'
    resMsg = '填写信息不完整.'
  }

  ctx.body = {
    title: 'addProject',
    res_code: res_code,
    msg: resMsg,
    project: project
  }
})
// 查找记录
router.get('/projectList', async (ctx, next) => {
  let _get = ctx.request.query || {}
  let { userId } = _get

  let user = {}
  let res_code = '0'
  let resMsg = ''
  let project = await projectModel.find({ user_id: userId })
  ctx.body = {
    title: 'projectList',
    res_code: res_code,
    msg: resMsg,
    project: project
  }
})

// 查找记录
router.get('/find', async (ctx, next) => {
  let _get = ctx.request.query || {}
  let { _id } = _get

  let project = await projectModel.find({ _id: _id })
  ctx.body = {
    title: 'find',
    project: project
  }
})
// 修改记录
router.post('/edit', async (ctx, next) => {
  let _post = ctx.request.body || {}
  let { name, msg, mapFile, mapFileUrl, _id } = _post

  let _project = await projectModel.findOne({ _id: _id})
  _project._id = _project._id.toString()
  _project.msg = msg
  _project.mapFile = mapFile
  _project.mapFileUrl = mapFileUrl
  // let R =
  await projectModel.update(_project)
  let project = await projectModel.findOne({name: 'jackdizhu'})
  ctx.body = {
    title: 'edit',
    project: project
  }
})

module.exports = router
