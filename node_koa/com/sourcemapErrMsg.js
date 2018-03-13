module.exports = sourcemapLookup = async (err_msg) => {
    // var _msg = {
    //   "msg": "ReferenceError: d is not defined @ Object.3../alloy-lever.js (http://127.0.0.1/AlloyLever/public/dist/js/build.js:321:9) @ s (http://127.0.0.1/AlloyLever/public/dist/js/build.js:1:265) @ e (http://127.0.0.1/AlloyLever/public/dist/js/build.js:1:436) @ http://127.0.0.1/AlloyLever/public/dist/js/build.js:1:465",
    //   "filename": "http://127.0.0.1/AlloyLever/public/dist/js/build.js",
    //   "line": 321,
    //   "column": 9
    // }
    // Object.assign(err_msg, _msg) // 测试使用

    var path = require("path")
    var file = ''
    var _arr = err_msg.filename.match(/\/[a-zA-Z0-9_.]+$/g)
    if (_arr) {
      file = path.resolve(__dirname, '../data/' + err_msg.user_id + _arr[0])
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
    var obj = null
    var originalPosition = null
    try {
      obj = JSON.parse(fs.readFileSync(file + '.map', 'utf8'))
    } catch (error) {
      console.log(error)
    }
    if (obj) {
      // 导出 原始文件信息
      let sourceMapFileExport = require('./sourceMapFileExport')

      var smc = new sourceMap.SourceMapConsumer(obj)
      originalPosition = smc.originalPositionFor({
        line: line,
        column: column
      })
      // 处理webpack:// 打头的文件路径
      if (originalPosition && originalPosition.source) {
        originalPosition.source = originalPosition.source.replace(/webpack:\/\//, '')
      }

      // gulpFile_min.js browserify^15.2.0 打包正常 webpack^3.6.0 不能正常还原原始文件
      // await sourceMapFileExport(obj, err_msg.user_id)
      // // 导出 原始文件信息
      // let sourcemapCode = require('./sourcemapCode')
      // let code = await sourcemapCode(originalPosition, err_msg.user_id)
      // originalPosition.code = code
    }

    // 原始文件位置 信息
    return originalPosition
}
