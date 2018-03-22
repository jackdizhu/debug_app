const router = require('koa-router')()
const projectModel = require('../models/project')
const projectErrorInfoModel = require('../models/projectErrorInfo')
// const util = require('util')
const md5 = require("md5")

router.prefix('/projectErrorInfo_v1')

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
    name: (() => {
      if (!msg) {
        return ''
      }

      let _a = msg.split('@')
      let _name = ''
      if (_a.length) {
        _name = _a[0]
      } else {
        _name = msg
      }
      return _name
    })(),
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
      _initProjectErrorInfo.user_id = _project.user_id
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
    title: 'addProjectErrorInfo',
    res_code: res_code,
    msg: resMsg
  }
})
// 查找记录
router.get('/projectErrorInfoList', async (ctx, next) => {
  let _get = ctx.request.query || {}
  let { _id, minDate, maxDate } = _get

  let user = {}
  let res_code = '0'
  let resMsg = ''
  let projectErrorInfoList = null
  if (_id && minDate && maxDate) {
    projectErrorInfoList = await projectErrorInfoModel.find({
      projectId: _id,
      date:{
        '$gt': new Date(minDate).getTime(),
        '$lt': new Date(maxDate).getTime()
      }
    })
    if (projectErrorInfoList) {
      res_code = '0'
    } else {
      res_code = '-1'
      msg = '查询失败.'
    }
  } else {
    res_code = '-2'
    msg = '填写信息不完整.'
  }


  ctx.body = {
    title: 'projectErrorInfoList',
    projectErrorInfoList: projectErrorInfoList,
    res_code: res_code,
    msg: resMsg
  }
})

module.exports = router
