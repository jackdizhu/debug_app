export default (_config, window) => {

  (function () {
    "use strict";

    // 采集浏览器指纹
    var _Fingerprint2 = {}
    var Fingerprint2 = require('fingerprintjs2')
    new Fingerprint2().get(function (result, components) {
      _Fingerprint2.result = result
      _Fingerprint2.user_agent = components.find(item => {
        return item.key === 'user_agent'
      })
    })

    var console = window.console = window.console || {};

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
    };

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
    };

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
          data = { level: level, message: argumentsArray.join(", ") };
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
    };

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
    };

    console.handleJavaScriptErrorsLogging = function () {
      if (console.config.logJavaScriptErrors) {
        if (window.onerror && window.onerror !== console.onError) {
          console.log("window.onerror will be overriden; you can prevent this by setting 'logJavaScriptErrors' to false");
        }
        console.onError = window.onerror = function (message, fileName, lineNumber, columnNumber, error) {
          console.send(console.addStackTrace({
            level: console.config.levelForJavaScriptErrors,
            message: "[" + fileName + ":" + lineNumber + (columnNumber ? ":" + columnNumber : "") + "] " + message
          }, error));
        };
      } else {
        if (window.onerror && window.onerror === console.onError) {
          window.onerror = null;
        }
        if (console.onError) {
          delete console.onError;
        }
      }
      return console;
    };

    console.send = function (data) {
      // levelEnabledOnServer 该配置 错误等级 提交
      if (data.level === console.config.levelEnabledOnServer) {
        let src = console.config.serverUrl + '?data=' + JSON.stringify(data)
        new Image().src = src
      }
      return console;
    };

    console.init = function (config) {
      return console
        .restore()
        .readConfig(config)
        .proxyConsoleFunctions()
        .handleJavaScriptErrorsLogging();
    };

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
    };

  }());

  console.init({
    // levels: ["info", "warn", "error"],
    levelEnabledOnServer: 'error',
    // levelForConsoleLog: 'info',
    serverUrl: '/logs'
  });

  var uncaught = require('uncaught')
  uncaught.start()
  uncaught.addListener(function (error) {
    // console.log(error.stack, '\n ---------------->> error')
    let data = {
      err: error,
      stack: error.stack
    }
    let src = console.config.serverUrl + '?data=' + JSON.stringify(data)
    new Image().src = src
  })

}
