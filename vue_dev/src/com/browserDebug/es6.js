
import AlloyLever from './alloy-lever.js'

AlloyLever.settings = {
    cdn: '//s.url.cn/qqun/qun/qqweb/m/qun/confession/js/vconsole.min.js', // vconsole CDN地址
    reportUrl: '//127.0.0.1:3000/api/err/', // 错误报告地址
    otherReport: { // 其他报告资料
        reportPrefix: 'reportPrefix', // 错误报告MSG前缀通常用于区分业务类型。
        reportKey: 'reportKey', // 错误报告MSG前缀键，用户报告系统接收存储MSG
        otherReport: 'otherReport'
    },
    entry: '#entry' // 请点击这个DOM元素召唤vconsole 6次
}

console.log('this is log content')
console.debug('this is debug content')
console.error('this is error content')

var a = 1, b = 2;
var c = d * a