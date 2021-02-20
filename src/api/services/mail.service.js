const mailConfig = require('../../config/mail.config');
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport(mailConfig.transport);

async function sendMail(to, subject, html, attachments = null){
  const message = {
    from: mailConfig.from,
    to,
    subject,
    html
  };
  if (attachments) {
    message.attachments = attachments;
  }
  const result = await transport.sendMail(message);
}

module.exports = {
  sendMail
};