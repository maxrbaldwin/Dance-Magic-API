const express = require('express');
const { log } = require('@logging');
const isProduction = require('@utils/isProduction');
const getFollowUpEmail = require('@emitter/utils/getFollowUpEmail');
const getInquiryEmail = require('@emitter/utils/getInquiryEmail');
const getEmailTransporter = require('@emitter/utils/getEmailTransporter');

const app = express();
const isPrd = isProduction();
const getMailerEmail = () => process.env.EMAIL_USER;
const myEmail = 'maxrbaldwin2328@gmail.com'
const ownerEmail = isPrd ? 'janineschuster@msn.com' : myEmail

// CONTACT EMITTER
app.on('sendInquiry', async body => {
  if (process.env.NODE_ENV === 'test') return;

  const transporter = getEmailTransporter();
  const msg = {
    to: ownerEmail,
    from: getMailerEmail(),
    subject: 'New Inquiry from Dance Magic Website',
    html: getInquiryEmail(body),
  };
  
  try {
    await transporter.sendMail(msg);
    log('app', 'Inquiry email sent')
    app.emit('sendFollowUp', body)
  } catch (err) {
    app.emit('emitterError', `Error sending inquiry: ${err}`);
  }
})

app.on('sendFollowUp', async body => {
  const { email, name } = body;
  const reciever = isPrd ? email : myEmail;
  const followUpEmail = getFollowUpEmail(name);
  const transporter = getEmailTransporter();
  const msg = {
    to: reciever,
    from: getMailerEmail(),
    subject: 'Thanks for reaching out to Dance Magic',
    html: followUpEmail,
  };
  
  try {
    await transporter.sendMail(msg);
    log('app', 'Follow up email sent')
    app.emit('saveInquiry', body);
  } catch (err) {
    app.emit('emitterError', `Error send follow up: ${err}`);
  }
})

// ERROR EMITTER
app.on('emitterError', err => {
  const logLevel = 'emitterError';
  log(logLevel, err);
})

module.exports = app;
