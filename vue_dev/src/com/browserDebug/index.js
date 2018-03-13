import { request } from '../http.js'
export default (_config, window) => {

    var console = window.console = window.console || {}

    let key = '7433dcd97077d2502cf0e3051001bc3b'
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

    // process.on('uncaughtException', function(e){
    //     console.error('UE:Catch in process', e)
    // })
    // process.on('unhandledRejection', (reason) => {
    //     console.info('UR:Catch in process', reason)
    // })
    // process.on('rejectionHandled', (p) => {
    //     console.info('RH:Catch in process', p)
    // })

    const msg1Format = function (msg1) {
      // VueComponent.getJson (webpack-internal:///./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/page/home/error/index.vue:56:19)↵
      let _arr = msg1.split(' ')
      let _msg1Obj = {}
      _msg1Obj.name = _arr[0]
      _msg1Obj.filename = _arr[1]
      // _msg1Obj._m = _arr.filename.match(/\:([0-9]+)\:([0-9]+)\)[↵]$/)
      return _msg1Obj

      //   'line': error.line,
      //   'column': error.column,
    }
    const postMsgFormat = (msg) => {
      let _m = {}
      _m.msg = msg
      // let _m = 'ReferenceError: a is not defined↵    at VueComponent.getJson (webpack-internal:///./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/page/home/error/index.vue:56:19)↵    at VueComponent.created (webpack-internal:///./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/page/home/error/index.vue:67:10)↵    at callHook (webpack-internal:///./node_modules/vue/dist/vue.esm.js:2922:21)↵    at VueComponent.Vue._init (webpack-internal:///./node_modules/vue/dist/vue.esm.js:4625:5)↵    at new VueComponent (webpack-internal:///./node_modules/vue/dist/vue.esm.js:4793:12)↵    at createComponentInstanceForVnode (webpack-internal:///./node_modules/vue/dist/vue.esm.js:4294:10)↵    at init (webpack-internal:///./node_modules/vue/dist/vue.esm.js:4115:45)↵    at createComponent (webpack-internal:///./node_modules/vue/dist/vue.esm.js:5601:9)↵    at createElm (webpack-internal:///./node_modules/vue/dist/vue.esm.js:5548:9)↵    at createChildren (webpack-internal:///./node_modules/vue/dist/vue.esm.js:5675:9)'
      // ↵    at
      let _arr = msg.split('    at ')
      _m.name = _arr[0]
      _m.msg1 = _arr[1]

      if (_m.msg1) {
        _m.msg1Obj = msg1Format(_m.msg1)
        console.log()
      }
    }

    const postMsg = (msg) => {
      postMsgFormat(msg)
      let data = {
        data: msg,
        _Fingerprint2: _Fingerprint2,
        key: key
      }
      // console.log(data)
      // let src = console.config.serverUrl + '?data=' + JSON.stringify(data) + '&key=' + key
      let src = console.config.serverUrl
      request({
        url: src,
        type: 'GET',
        params: data
      }).then(res => {
      })
      // new Image().src = src
    }
    console.readConfig = function (config) {
      var index, level;

      console.config = config || {};

      if (Array.isArray(console.config.levels)) {
        for (index = console.config.levels.length - 1; index >= 0; --index) {
          level = String.prototype.trim.call(console.config.levels[index] || "");
          if (level) {
            console.config.levels[index] = level;
          } else {
            console.config.levels.splice(index, 1);
          }
        }
      }

      if (!Array.isArray(console.config.levels) || !console.config.levels.length) {
        console.config.levels = ["info", "warn", "error"];
      }

      console.config.levelEnabledOnServer = String.prototype.trim.call(console.config.levelEnabledOnServer || "");
      if (console.config.levels.indexOf(console.config.levelEnabledOnServer) < 0) {
        console.config.levelEnabledOnServer = console.config.levels[0];
      }

      console.config.levelForConsoleLog = String.prototype.trim.call(console.config.levelForConsoleLog || "");
      if (console.config.levels.indexOf(console.config.levelForConsoleLog) < 0) {
        console.config.levelForConsoleLog = console.config.levels[0];
      }

      console.config.levelForJavaScriptErrors = String.prototype.trim.call(console.config.levelForJavaScriptErrors || "");
      if (console.config.levels.indexOf(console.config.levelForJavaScriptErrors) < 0) {
        console.config.levelForJavaScriptErrors = console.config.levels[console.config.levels.length - 1];
      }

      console.config.serverUrl = String.prototype.trim.call(console.config.serverUrl || "");
      if (!console.config.serverUrl && console.log) {
        console.log("No server URL specified (serverUrl)");
      }

      if (!console.config.logJavaScriptErrors && console.config.logJavaScriptErrors !== false) {
        console.config.logJavaScriptErrors = true;
      }
      console.config.logJavaScriptErrors = String.prototype.trim.call(console.config.logJavaScriptErrors) !== "false";

      return console;
    }
    console.addStackTrace = function (data, error) {
      var stackTrace;
      if (data) {
        if (error && error instanceof Error && window.printStackTrace) {
          try {
            stackTrace = window.printStackTrace({ e: error }).join("\n");
          } catch (ignored) {
          }
        }
        if (stackTrace) {
          data.stackTrace = stackTrace;
        } else if (typeof data.stackTrace !== "undefined") {
          delete data.stackTrace;
        }
      }
      return data;
    }
    console.createProxyConsoleFunction = function (level, originalOrDefaultFunction) {
      return function () {
        var argumentsArray, returns, data, index = 0;
        try {
          returns = originalOrDefaultFunction.apply(console, arguments);
          argumentsArray = Array.prototype.slice.call(arguments);
          // 处理 原生 错误信息
          for (let i = 0; i < argumentsArray.length; i++) {
            if (argumentsArray[i].stack) {
              argumentsArray[i] = argumentsArray[i].stack
            }
          }
          data = { level: level, message: argumentsArray.join(', ') };
          while (!console.stackTrace && index < argumentsArray.length) {
            console.addStackTrace(data, arguments[index]);
            ++index;
          }

          console.send(data)
        } catch (ignore) {
          //
        }
        return returns;
      };
    }
    console.proxyConsoleFunctions = function () {
      var index, level, originalOrDefaultFunction;

      console.original = console.original || {};
      if (!console.original.log) {
        console.original.log = console.log || function () {
        };
      }

      for (index = 0; index < console.config.levels.length; ++index) {
        level = console.config.levels[index];
        originalOrDefaultFunction = null;
        if (console.original[level]) {
          originalOrDefaultFunction = console.original[level];
        } else if (console[level]) {
          originalOrDefaultFunction = console.original[level] = console[level];
        } else {
          originalOrDefaultFunction = console.original.log;
        }
        console[level] = console.createProxyConsoleFunction(level, originalOrDefaultFunction);
      }

      if (console.config.levels.indexOf("log") < 0) {
        console.log = console[console.config.levelForConsoleLog];
      }

      return console;
    }
    console.handleJavaScriptErrorsLogging = function () {
      if (console.config.logJavaScriptErrors) {
        if (window.onerror && window.onerror !== console.onError) {
          console.log("window.onerror will be overriden; you can prevent this by setting 'logJavaScriptErrors' to false");
        }
        console.onError = window.onerror = function (message, fileName, line, column, error) {
          // let _msg = {
          //   'filename': error.filename,
          //   'line': error.line,
          //   'column': error.column,
          //   'stack': error.stack
          // }
          console.send(console.addStackTrace({
            level: console.config.levelForJavaScriptErrors,
            message: error.stack
          }, error))
        }
      } else {
        if (window.onerror && window.onerror === console.onError) {
          window.onerror = null;
        }
        if (console.onError) {
          delete console.onError;
        }
      }
      return console;
    }
    console.send = function (data) {
      // levelEnabledOnServer 该配置 错误等级 提交
      if (data.level === console.config.levelEnabledOnServer) {
        postMsg(data.message)
      }
      return console;
    }
    console.init = function (config) {
      return console
        .restore()
        .readConfig(config)
        .proxyConsoleFunctions()
        .handleJavaScriptErrorsLogging();
    }
    console.restore = function () {
      var index, functionName;

      console.readConfig({
        logJavaScriptErrors: false,
        levels: [],
        serverUrl: "X"
      });

      console.original = console.original || {};

      console.handleJavaScriptErrorsLogging();

      for (index = 0; index < console.config.levels.length; ++index) {
        delete console[console.config.levels[index]];
      }
      for (functionName in console.original) {
        if (console.original.hasOwnProperty(functionName)) {
          console[functionName] = console.original[functionName];
        }
      }
      delete console.original;

      delete console.config;

      return console;
    }

    console.init({
      // levels: ["info", "warn", "error"],
      levelEnabledOnServer: 'error',
      // levelForConsoleLog: 'info',
      serverUrl: 'http://127.0.0.1:3000/projectErrorInfo_v1/addProjectErrorInfo'
    })

    var uncaught = require('uncaught')
    uncaught.start()
    uncaught.addListener(function (error) {
      // let _msg = {
      //   'filename': error.filename,
      //   'line': error.line,
      //   'column': error.column,
      //   'stack': error.stack
      // }
      postMsg(error.stack)
    })
}
