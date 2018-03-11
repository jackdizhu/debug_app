const router = require('koa-router')()
const fileModel = require('../models/file')
// const util = require('util')
const multer = require('koa-multer')
const path = require('path')

router.prefix('/file_v1')

//配置
let storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../data'))
  },
  filename: function (req, file, cb) {
    let fileFormat = (file.originalname).split(".")
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1])
  }
})
const upload = multer({ storage: storage })
router.post('/upload', upload.single('file'), async (ctx, next) => {
  const { originalname, path, mimetype } = ctx.req.file
  log({ originalname, name, path, mimetype })

  let _post = ctx.request.body || {}

  let token = ''
  let file = {}
  let res_code = '0'
  let msg = ''

  file = await fileModel.insert({
    name: originalname,
    path: path,
    nowName: name
  })

  ctx.body = {
    title: 'upload',
    res_code: res_code,
    msg: msg,
    file: file,
    token: token
  }
})

router.get('/upload2', async (ctx, next) => {
  log(a)
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

module.exports = router
