var log = require('./log');
var nodemailer = require('nodemailer');
var start = Date.now();

var smtpConfig = {
    host: 'smtp.qq.com',
    port: 465,  // 端口号 465 或 587
    secure: true, // use SSL
    auth: {
        user: '376365334@qq.com',
        pass: 'sqwqiezcxtjdbgbb'
    }
};
// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(smtpConfig);

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '376365334@qq.com', // sender address
    to: '376365334@qq.com', // list of receivers
    subject: '邮件标题', // Subject line
    //text: 'Hello world ?', // plaintext body
    html: '<h1>邮件内容</h1>' // html body
};

// send mail with defined transport object
let sendMail = async (obj) => {
  let { to, subject, html } = obj || {}
  mailOptions.to = to || mailOptions.to
  mailOptions.subject = subject || mailOptions.subject
  mailOptions.html = html || mailOptions.html
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
        log({
          obj: obj,
          err: error,
          retutn: false
        })
      } else {
        log({
          obj: obj,
          retutn: true
        })
      }
  });
}

module.exports = sendMail
