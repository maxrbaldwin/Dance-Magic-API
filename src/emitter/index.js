const express = require('express');
const { log } = require('@logging');
const isProduction = require('@utils/isProduction');
const { saveInquiry, deleteInquiry } = require('@db');
const getFollowUpEmail = require('@emitter/utils/getFollowUpEmail');
const getInquiryEmail = require('@emitter/utils/getInquiryEmail');
const getEmailTransporter = require('@emitter/utils/getEmailTransporter');

const app = express();
const isPrd = isProduction();
const mailerEmail = process.env.EMAIL_USER;
const myEmail = 'maxrbaldwin2328@gmail.com'
const momsEmail = isPrd ? 'baldwin1255@comcast.net' : myEmail

// CONTACT EMITTER
app.on('sendInquiry', async body => {
  if (process.env.NODE_ENV === 'test') return;

  const transporter = getEmailTransporter();
  const msg = {
    to: momsEmail,
    from: mailerEmail,
    subject: 'New Inquiry from Dance Magic Website',
    html: getInquiryEmail(body),
  };
  
  try {
    await transporter.sendMail(msg);
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
    from: mailerEmail,
    subject: 'Thanks for reaching out to Dance Magic',
    html: followUpEmail,
  };
  
  try {
    await transporter.sendMail(msg);
    app.emit('saveInquiry', body);
  } catch (err) {
    app.emit('emitterError', `Error send follow up: ${err}`);
  }
})

app.on('saveInquiry', async body => {
  try {
    await saveInquiry(body);
  } catch (err) {
    app.emit('emitterError', 'Error saving inquiry');
  }
});
// CONTACT EMITER END

// MANAGE INQUIRIES EMITTER
app.on('manageInquiries', async () => {
  try {
    const resolvedInquries = await fetchResolvedInquiries();
    app.emit('deleteOldInquiries', resolvedInquries);
  } catch (err) {
    app.emit('emitterError', 'Error fetching resolved inquiries');
  }
})

app.on('deleteOldInquiries', async oldInquiries => {
  try {
    for (let index = 0; index < oldInquiries.length; i++) {
      await deleteInquiry(oldInquiries[index]);
    }
  } catch (err) {
    app.emit('emitterError', 'error deleting inquiries');
  }
})
// MANAGE INQUIRIES EMITTER END

// ERROR EMITTER
app.on('emitterError', err => {
  const logLevel = 'emitterError';
  log(logLevel, err);
})

module.exports = app;
