var fs = require('fs');

// var filename = __dirname + '/../log/koa2-log.js';
var filename = __dirname + '\\..\\log\\koa2-log.js'; // win 配置

var logger = function (Obj) {
    var data = new Date().toLocaleString() + '--\n  ' +  JSON.stringify(Obj) + '\n';
    fs.appendFile(filename, data, {encoding:'utf-8'}, function () {
        console.log(`写入文件成功! ${filename}`);
    });
};

var log = function (Obj) {
    logger(Obj);
}

module.exports = log;
