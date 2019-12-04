const emitter = require('@emitter');
const { log } = require('@logging');
const getFollowUpEmail = require('@emitter/utils/getFollowUpEmail');
const getInquiryEmail = require('@emitter/utils/getInquiryEmail');
const isProduction = require('@utils/isProduction');
const { saveInquiry, deleteInquiry } = require('@db');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const isPrd = isProduction();
const myEmail = 'maxrbaldwin2328@gmail.com'
const momsEmail = isPrd ? 'baldwin1255@comcast.net' : myEmail

// CONTACT EMITTER
emitter.on('sendInquiry', body => {
  if (process.env.NODE_ENV === 'test') return;

  const msg = {
    to: momsEmail,
    from: myEmail,
    subject: 'New Inquiry from Dance Magic Website',
    html: getInquiryEmail(body),
  };
  
  try {
    sgMail.send(msg);
    emitter.emit('sendFollowUp', body)
  } catch (err) {
    emitter.emit('error', 'Error sending inquiry');
  }
})

emitter.on('sendFollowUp', body => {
  const { email, name } = body;
  const reciever = isPrd ? email : myEmail;
  const followUpEmail = getFollowUpEmail(name);
  const msg = {
    to: reciever,
    from: momsEmail,
    subject: 'Thanks for reaching out to Dance Magic',
    html: followUpEmail,
  };
  
  try {
    sgMail.send(msg);
    emitter.emit('saveInquiry', body);
  } catch (err) {
    emitter.emit('error', 'Error send follow up');
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