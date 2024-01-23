const __config = require("../../config");
const nodemailer = require("nodemailer");
let transporter = null;
//if (__config.mailer.mailerInit) {
transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", //__config.mailer.host,
  port: 587, //__config.mailer.port,
  from: "hafiz.shaikh@wohlig.com",
  //   secure: true, //__config.mailer.secure,
  //   requireTLS: false, //__config.mailer.requireTLS,
  auth: {
    user: "hafiz.shaikh@wohlig.com", //__config.mailer.user,
    pass: "Wohlig@123", //__config.mailer.pass
  },
});
//}
module.exports = transporter;
