const router = require('koa-router')()
const projectModel = require('../models/project')
const projectErrorInfoModel = require('../models/projectErrorInfo')
// const util = require('util')
const md5 = require("md5")

router.prefix('/projectErrorInfo_v1')

// 普通 onerror 错误处理
const errMsgFormat = (data) => {
  let _obj = {}
  let _arr = data.split('\n    at ')
  if (_arr.length) {
    _obj.name = _arr[0]
    _obj.msg1 = _arr[1]
    if (_obj.msg1) {
      _obj.msg1_ext = {}
      let _a = _obj.msg1.split(' ')
      // 增加 _a.length === 2 判断 length 1 是 build 文件报错
      if (_a.length === 2) {
        _obj.msg1_ext.name = _a[0]
        let _filename = _a[1]
        _obj.msg1_ext.filename = _filename
        if (_filename) {
          let _n = _filename.match(/\!?([.a-zA-Z0-9/]+[a-zA-Z0-9]+[.a-zA-Z0-9]+)\:([0-9]+)\:([0-9]+)\)?$/)
          if (_n && _n.length) {
            _obj.msg1_ext.filename = _n[1]
            _obj.msg1_ext.line = _n[2]
            _obj.msg1_ext.column = _n[3]
          }
        }
      } else {
        // 处理 build 文件错误信息
        _filename = _obj.msg1
        _obj.msg1_ext.filename = _filename
        if (_filename) {
          let _n = _filename.match(/\!?([.a-zA-Z0-9/]+[a-zA-Z0-9]+[.a-zA-Z0-9]+)\:([0-9]+)\:([0-9]+)\)?$/)
          if (_n && _n.length) {
            _obj.msg1_ext.filename = _n[1]
            _obj.msg1_ext.line = _n[2]
            _obj.msg1_ext.column = _n[3]
          }
        }
      }
    }
  }
  return _obj
}
// 添加记录
router.get('/addProjectErrorInfo', async (ctx, next) => {
  let _get = ctx.request.query || {}
  // let { msg, key, filename, line, column, data } = _get
  let { key, data } = _get

  let _errMsg = errMsgFormat(data)
  // log(_errMsg)
  let name = _errMsg.name
  let filename = _errMsg.msg1_ext.filename
  let line = (_errMsg.msg1_ext && _errMsg.msg1_ext.line) || 0
  let column = (_errMsg.msg1_ext && _errMsg.msg1_ext.column) || 0

  let _initProjectErrorInfo = {
    projectId: '',
    date: (() => {
      return new Date().getTime()
    })(),
    msg: data,
    name: name,
    line: Number(line) || 0,
    column: Number(column) || 0,
    filename: filename,
    mapFile: '',
    code: '',
    ext: { _errMsg }
  }

  let user = {}
  let res_code = '-1'
  let resMsg = ''
  if (key && data) {
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
