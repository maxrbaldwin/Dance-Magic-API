const emitter = require('@emitter');
const { log } = require('@logging');
const isProduction = require('@utils/isProduction');
const { saveInquiry, deleteInquiry } = require('@db');
const getFollowUpEmail = require('@emitter/utils/getFollowUpEmail');
const getInquiryEmail = require('@emitter/utils/getInquiryEmail');
const getEmailTransporter = require('@emitter/utils/getEmailTransporter');

const isPrd = isProduction();
const mailerEmail = process.env.EMAIL_USER;
const myEmail = 'maxrbaldwin2328@gmail.com'
const momsEmail = isPrd ? 'baldwin1255@comcast.net' : myEmail

// CONTACT EMITTER
emitter.on('sendInquiry', async body => {
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
    emitter.emit('sendFollowUp', body)
  } catch (err) {
    emitter.emit('error', `Error sending inquiry: ${err}`);
  }
})

emitter.on('sendFollowUp', async body => {
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
    emitter.emit('saveInquiry', body);
  } catch (err) {
    emitter.emit('error', `Error send follow up: ${err}`);
  }
})

emitter.on('saveInquiry', async body => {
  try {
    await saveInquiry(body);
  } catch (err) {
    emitter.emit('error', 'Error saving inquiry');
  }
});
// CONTACT EMITER END

// MANAGE INQUIRIES EMITTER
emitter.on('manageInquiries', async () => {
  try {
    const resolvedInquries = await fetchResolvedInquiries();
    emitter.emit('deleteOldInquiries', resolvedInquries);
  } catch (err) {
    emitter.emit('error', 'Error fetching resolved inquiries');
  }
})

emitter.on('deleteOldInquiries', async oldInquiries => {
  try {
    for (let index = 0; index < oldInquiries.length; i++) {
      await deleteInquiry(oldInquiries[index]);
    }
  } catch (err) {
    emitter.emit('error', 'error deleting inquiries');
  }
})
// MANAGE INQUIRIES EMITTER END

// ERROR EMITTER
emitter.on('error', err => {
  const logLevel = 'error';
  log(logLevel, err);
})