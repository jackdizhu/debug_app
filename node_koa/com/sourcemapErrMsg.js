module.exports = sourcemapLookup = async (err_msg) => {

    var _msg = {
      "msg": "ReferenceError: d is not defined @ Object.3../alloy-lever.js (http://127.0.0.1/AlloyLever/public/dist/js/build.js:321:9) @ s (http://127.0.0.1/AlloyLever/public/dist/js/build.js:1:265) @ e (http://127.0.0.1/AlloyLever/public/dist/js/build.js:1:436) @ http://127.0.0.1/AlloyLever/public/dist/js/build.js:1:465",
      "filename": "http://127.0.0.1/AlloyLever/public/dist/js/build.js",
      "line": 321,
      "column": 9
    }
    Object.assign(err_msg, _msg) // 测试使用
    // log(err_msg)

    var path = require("path")
    var file = ''
    var _arr = err_msg.filename.match(/\/[a-zA-Z_.]+$/g)
    if (_arr) {
      file = path.resolve(__dirname, '../data/' + err_msg.projectId + _arr[0])
    } else {
      return {
        err: 'file error'
      }
    }

    var line = parseInt(err_msg.line)
    var column = parseInt(err_msg.column)

    function pad(str, len) {
      str = str + ""
      while (str.length < len) {
        str = str + " "
      }
      return str
    }

    var fs = require("fs")
    var sourceMap = require('source-map')
    var obj = JSON.parse(fs.readFileSync(file + '.map', 'utf8'))

    // 导出 原始文件信息
    let sourceMapFileExport = require('./sourceMapFileExport')
    await sourceMapFileExport(obj, err_msg.projectId)

    var smc = new sourceMap.SourceMapConsumer(obj)
    var originalPosition = smc.originalPositionFor({
      line: line,
      column: column
    })
    originalPosition.name = _msg.msg.split('@')[0]

    // 导出 原始文件信息
    let sourcemapCode = require('./sourcemapCode')
    let code = await sourcemapCode(originalPosition, err_msg.projectId)

    originalPosition.code = code

    // 原始文件位置 信息
    return originalPosition
}
