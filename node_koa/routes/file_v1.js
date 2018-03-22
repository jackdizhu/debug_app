const router = require('koa-router')()
const fileModel = require('../models/file')
const userModel = require('../models/user')
// const util = require('util')
const multer = require('koa-multer')
const Path = require('path')
// 写入文件时, 如果上级文件夹不存在, 则会自动创建这个文件夹
var filendir = require('filendir')
const fs = require('fs')

router.prefix('/file_v1')

//配置
let storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, Path.resolve(__dirname, '../data/temp'))
  },
  filename: function (req, file, cb) {
    let fileFormat = (file.originalname).split(".")
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1])
  }
})
const upload = multer({ storage: storage })
router.post('/upload', upload.single('file'), async (ctx, next) => {
  const { originalname, path, filename, mimetype, size } = ctx.req.file

  let uName = ctx.state.decodedToken.name
  let _user = await userModel.findOne({name: uName})

  if (_user) {
    // 移动文件 重新命名
    setTimeout(() => {
      filendir.writeFileSync(Path.resolve(__dirname, '../data/' + _user._id + '/' + originalname), fs.readFileSync(path))
      fs.unlinkSync(path)
    }, 0)
  }

  let _post = ctx.request.body || {}

  let token = ''
  let file = {}
  let res_code = '0'
  let msg = ''

  file = await fileModel.insert({
    name: originalname,
    nowName: filename,
    size: size,
    date: (() => {
      return new Date().getTime()
    })()
  })

  ctx.body = {
    title: 'upload',
    res_code: res_code,
    msg: msg,
    file: file,
    token: token
  }
})

router.get('/err', async (ctx, next) => {
  let token = ''
  let file = {}
  let res_code = '0'
  let msg = ''
  ctx.body = {
    title: 'upload',
    res_code: res_code,
    msg: msg,
    file: file,
    token: token
  }
})

router.get('/download', async function (ctx) {
  let res_code = '-1'
  let msg = '文件不存在'

  var fileName = '测试1.jpg'
  let _path = Path.resolve(__dirname, '../data/' + fileName)
  // 设置实体头（表示消息体的附加信息的头字段）,提示浏览器以文件下载的方式打开
  var data = null
  ctx.attachment(fileName)
  try {
    data = fs.readFileSync(_path)
  } catch (error) {
    ctx.attachment('download.json')
    data = {
      title: 'download',
      res_code: res_code,
      msg: msg
    }
  }
  ctx.body = data
})

module.exports = router
