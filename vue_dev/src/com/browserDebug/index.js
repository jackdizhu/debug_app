export default (_config, window) => {
  const config = {
    // 错误报告地址
    reportUrl: _config.reportUrl || '//127.0.0.1/',
    // 其他报告资料
    otherReport: {
      key: _config.key || 'key'
    },
    logs: []
  }
  window.onerror = function (msg, url, line, col, error) {
    console.log('---------------')

    // 采集浏览器指纹
    var _Fingerprint2 = {}
    var Fingerprint2 = require('fingerprintjs2')
    new Fingerprint2().get(function (result, components) {
      _Fingerprint2.result = result
      _Fingerprint2.user_agent = components.find(item => {
          return item.key === 'user_agent'
      })
    })

    var newMsg = msg
    if (error && error.stack) {
      newMsg = processStackMsg(error)
    }
    if (isOBJByType(newMsg, 'Event')) {
      newMsg += newMsg.type ?
        ('--' + newMsg.type + '--' + (newMsg.target ?
          (newMsg.target.tagName + '::' + newMsg.target.src) : '')) : ''
    }

    newMsg = (newMsg + '' || '').substr(0,500)
    var _obj = {
      msg: newMsg,
      filename: url,
      line: line,
      column: col
    }
    config.logs.push(_obj)

    if (msg.toLowerCase().indexOf('script error') > -1) {
      console.error('Script Error: See Browser Console for Detail')
    } else {
      console.error(newMsg)
    }

    if (config.reportUrl) {
      var fn = function () {
        var src = config.reportUrl + '?' + 'info' + '=' + '[' + JSON.stringify(_Fingerprint2) + ']' + '&' + 'error' + '=' + '[' + JSON.stringify(_obj) + ']' + '&t=' + new Date().getTime()
        if (config.otherReport) {
          for (var i in config.otherReport) {
            if (config.otherReport.hasOwnProperty(i)) {
              src += '&' + i + '=' + config.otherReport[i]
            }
          }
        }
        console.log(src)
        new Image().src = src
      }
      setTimeout(function () {
        fn()
      },0)
    }
    return true
  }
}
