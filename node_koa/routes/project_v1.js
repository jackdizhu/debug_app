const router = require('koa-router')()
const projectModel = require('../models/project')
const projectErrorInfoModel = require('../models/projectErrorInfo')
// const util = require('util')
const md5 = require("md5")

router.prefix('/project_v1')

// 添加记录
router.get('/addProjectErrorInfo', async (ctx, next) => {
  let _get = ctx.request.query || {}
  let { msg, key, filename, line, column } = _get
  // var err_msg = [{
  //   "msg": "ReferenceError: d is not defined @ Object.3../alloy-lever.js (http://127.0.0.1/AlloyLever/public/dist/js/build.js:321:9) @ s (http://127.0.0.1/AlloyLever/public/dist/js/build.js:1:265) @ e (http://127.0.0.1/AlloyLever/public/dist/js/build.js:1:436) @ http://127.0.0.1/AlloyLever/public/dist/js/build.js:1:465",
  //   "filename": "http://127.0.0.1/AlloyLever/public/dist/js/build.js",
  //   "line": 321,
  //   "column": 9
  // }];

  let _initProjectErrorInfo = {
    projectId: '',
    date: (() => {
      return new Date().getTime()
    })(),
    msg: msg,
    line: Number(line) || 0,
    column: Number(column) || 0,
    filename: filename,
    mapFile: '',
    code: '',
    ext: {}
  }

  let user = {}
  let res_code = '-1'
  let resMsg = ''
  if (key) {
    let _project = await projectModel.findOne({ key: key })

    if (_project) {
      _initProjectErrorInfo.projectId = _project._id
      projectErrorInfo = await projectErrorInfoModel.insert(_initProjectErrorInfo)
      if (projectErrorInfo) {
        res_code = '0'
        resMsg = '添加项目报错信息成功.'
      } else {
        res_code = '-1'
        resMsg = '添加项目报错信息失败.'
      }
    } else {
      res_code = '-3'
      resMsg = '添加项目报错信息失败.'
    }
  } else {
    res_code = '-2'
    resMsg = '填写信息不完整.'
  }

  ctx.body = {
    title: 'addProject',
    res_code: res_code,
    msg: resMsg
  }
})
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
