/* eslint-disable */
/*!
 *  AlloyLever v1.0.0 By dntzhang
 *  Github: https://github.com/AlloyTeam/AlloyLever
 *  MIT Licensed.
 */
  var AlloyLever = {}

  AlloyLever.settings = {
    cdn: '//s.url.cn/qqun/qun/qqweb/m/qun/confession/js/vconsole.min.js', // vconsole CDN地址
    reportUrl: '//127.0.0.1/', // 错误报告地址
    otherReport: { // 其他报告资料
      reportPrefix: 'reportPrefix', // 错误报告MSG前缀通常用于区分业务类型。
      reportKey: 'reportKey', // 错误报告MSG前缀键，用户报告系统接收存储MSG
      otherReport: 'otherReport'
    },
    entry: '#entry' // 请点击这个DOM元素召唤vconsole 6次
  }

  AlloyLever.store = []

  var methodList = ['log', 'info', 'warn', 'debug', 'error']
  var methodListC = {'log': [], 'info': [], 'warn': [], 'debug': [], 'error': []}
  methodList.forEach(function (item) {
    var method = console[item]

    console[item] = function () {
      AlloyLever.store.push({
          logType: item,
          logs: arguments
      })
      methodListC[item].push({logs: arguments})

      method.apply(console, arguments)
    }
  })

  AlloyLever.logs = []
  AlloyLever.config = function (config) {
    for (var i in config) {
      if (config.hasOwnProperty(i)) {
        AlloyLever.settings[i] = config[i]
      }
    }

    if (config.entry) {
      document.addEventListener('DOMContentLoaded', function () {
        AlloyLever.entry(config.entry)
      })
    }
  }

  AlloyLever.vConsole = function (show) {
    loadScript(AlloyLever.settings.cdn, function () {
      var i = 0,
        len = AlloyLever.store.length

      for (; i < len; i++) {
        var item = AlloyLever.store[i]
        // console[item.type].apply(console, item.logs)
        // prevent twice log
        item.noOrigin = true
        vConsole.pluginList.default.printLog(item)
      }

      if(show) {
        try {
            vConsole.show()
        } catch (e) {
        }

        window.addEventListener('load', function () {
          vConsole.show()
        })
      }
    })
  }

  AlloyLever.entry = function (selector) {
    var count = 0,
      entry = document.querySelector(selector)
    if(entry) {
      entry.addEventListener('click', function () {
        count++
        if (count > 5) {
          count = -10000
          AlloyLever.vConsole(true)
        }
      })
    }
  }
  // log 唤起方式 增加 ^ 滑动轨迹唤起
  var triggerLog = function (callback) {
    var first = {
      x: 0,
      y: document.documentElement.clientHeight
    }
    var second = {
      x: document.documentElement.clientWidth / 2,
      y: 0
    }
    var third = {
      x: document.documentElement.clientWidth,
      y: document.documentElement.clientHeight
    }
    var flag1
    var flag2
    var distance = 50

    document.addEventListener('touchmove', function (e) {
      if (flag1 && Math.abs(e.targetTouches[0].clientX - second.x) < distance && Math.abs(e.targetTouches[0].clientY - second.y) < distance) {
          flag2 = true
      }
      if (flag2 && Math.abs(e.targetTouches[0].clientX - third.x) < distance && Math.abs(e.targetTouches[0].clientY - third.y) < distance) {
          callback();
          flag1 = flag2 = false
      }
    })
    document.addEventListener('touchend', function () {
      flag1 = flag2 = false
    });
    document.addEventListener('touchstart', function (e) {
      flag1 = flag2 = false
      if (Math.abs(e.targetTouches[0].clientX - first.x) < distance && Math.abs(e.targetTouches[0].clientY - first.y) < distance) {
        flag1 = true
        e.preventDefault()
      }
    })
  }
  var inittriggerLog = false
  triggerLog(function () {
    if (inittriggerLog) {
      vConsole.show()
    } else {
      inittriggerLog = true
      AlloyLever.vConsole(true)
    }
  })

  window.onerror = function (msg, url, line, col, error) {
    // 采集浏览器指纹
    var _Fingerprint2 = {}
    var Fingerprint2 = require('fingerprintjs2')
    new Fingerprint2().get(function (result, components) {
      _Fingerprint2.result = result
      _Fingerprint2.user_agent = components.find(item => {
          return item.key === 'user_agent'
      })
      console.log(_Fingerprint2)
    })

    // 报错后 加载 vConsole 测试使用
    // if (!inittriggerLog) {
    //     inittriggerLog = true;
    //     AlloyLever.vConsole(false)
    // }

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

    AlloyLever.logs.push(_obj)

    if (msg.toLowerCase().indexOf('script error') > -1) {
      console.error('Script Error: See Browser Console for Detail')
    } else {
      console.error(newMsg)
    }

    var ss = AlloyLever.settings
    if (ss.reportUrl) {
      var fn = function () {
        var src = ss.reportUrl + '?' + 'info' + '=' + '[' + JSON.stringify(_Fingerprint2) + ']' + '&' + 'error' + '=' + '[' + JSON.stringify(_obj) + ']' + '&t=' + new Date().getTime()
        if (ss.otherReport) {
          for (var i in ss.otherReport) {
            if (ss.otherReport.hasOwnProperty(i)) {
              src += '&' + i + '=' + ss.otherReport[i]
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

  var parameter = getParameter('vconsole')

  if (parameter) {
    if (parameter === 'show') {
      AlloyLever.vConsole(true)
    } else {
      AlloyLever.vConsole(false)
    }
  }

  function loadScript (src, callback) {
    var s,
      r,
      t
    r = false
    s = document.createElement('script')
    s.type = 'text/javascript'
    s.src = src
    s.onload = s.onreadystatechange = function() {
      //console.log( this.readyState ); //uncomment this line to see which ready states are called.
      if ( !r && (!this.readyState || this.readyState == 'complete') )
      {
          r = true
          callback()
      }
    }
    t = document.getElementsByTagName('script')[0]
    t.parentNode.insertBefore(s, t)
  }

  function getParameter (n) {
    var m = window.location.hash.match(new RegExp('(?:#|&)' + n + '=([^&]*)(&|$)')),
      result = !m ? '' : decodeURIComponent(m[1])
    return result ||getParameterByName(n)
  }

  function getParameterByName (name, url) {
    if (!url) url = window.location.href
    name = name.replace(/[\[\]]/g, '\\$&')
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
    let results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
  }

  function isOBJByType (o, type) {
    return Object.prototype.toString.call(o) === '[object ' + (type || 'Object') + ']'
  }

  function processStackMsg (error) {
    var stack = error.stack
      .replace(/\n/gi, '')
      .split(/\bat\b/)
      .slice(0, 9)
      .join('@')
      .replace(/\?[^:]+/gi, '')
    var msg = error.toString()
    if (stack.indexOf(msg) < 0) {
      stack = msg + '@' + stack
    }
    return stack
  }

  function getCookie (name) {
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    let arr = document.cookie.match(reg)

    if (arr) {
      return unescape(arr[2])
    } else {
      return null
    }
  }

  AlloyLever.getCookie = getCookie
  AlloyLever.getParameter = getParameter
  AlloyLever.loadScript = loadScript

  export default AlloyLever
