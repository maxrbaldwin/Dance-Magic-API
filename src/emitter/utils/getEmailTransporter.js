const nodemailer = require('nodemailer');

module.exports = () => nodemailer.createTransport({
    host: process.env.EMAIL_SERVER,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    }
  });