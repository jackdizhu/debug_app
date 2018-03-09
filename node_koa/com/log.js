var fs = require('fs')
const path = require('path')

// 配置 绝对路径
var filename = path.resolve(__dirname, '../log/koa2-log.log')
var logger = function (Obj) {
  var data = new Date().toLocaleString() + '--\n  ' + JSON.stringify(Obj) + '\n'
  fs.appendFile(filename, data, { encoding: 'utf-8' }, function () {
    console.log(`写入文件成功! ${filename}`)
  })
}

var log = () => {
  return function (Obj) {
    logger(Obj)
  }
}

module.exports = log
