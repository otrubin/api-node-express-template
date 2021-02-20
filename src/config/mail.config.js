// const path = require("path");
// const generalConfig = require('./general.config');

module.exports = {
  transport: {
    host: process.env.EMAIL_SMTP_HOST,
    port: +process.env.EMAIL_SMTP_PORT,
    secure: Boolean(process.env.EMAIL_SMTP_SECURE), // true for 465, false for other ports 587
    auth: {
      user: process.env.EMAIL_SMTP_USER,
      pass: process.env.EMAIL_SMTP_PASSWORD,
    },
  },
  from: {
    name: 'Oleg NodeJS',
    address: 'mail@techmotiv.ru'
  },
  templates: {
    passwordReset: {
      subject: 'passwordResetSubject.hbs',
      body: 'passwordResetBody.hbs'
    }
  }
}