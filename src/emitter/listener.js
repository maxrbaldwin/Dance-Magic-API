const emitter = require('@emitter');
const getFollowUpEmail = require('@emitter/utils/getFollowUpEmail');
const getInquiryEmail = require('@emitter/utils/getInquiryEmail');
const isProduction = require('@utils/isProduction');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey('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');

const isPrd = isProduction();
const myEmail = 'maxrbaldwin2328@gmail.com'
const momsEmail = isPrd ? 'baldwin1255@comcast.net' : myEmail 

emitter.on('sendFollowUp', body => {
  const { email, name } = body;
  const reciever = isPrd ? email : myEmail;
  const followUpEmail = getFollowUpEmail(name);
  const msg = {
    to: reciever,
    from: momsEmail,
    html: followUpEmail,
  };
  
  try {
    sgMail.send(msg);
  } catch (err) {
    emitter.emit('error', 'Error send follow up');
  }
})

emitter.on('sendInquiry', body => {
  const msg = {
    to: momsEmail,
    from: myEmail,
    subject: 'New Inquiry from Dance Magic Website',
    html: getInquiryEmail(body),
  };
  
  try {
    sgMail.send(msg);
  } catch (err) {
    emitter.emit('error', 'Error sending to receive');
  }
})

emitter.on('error', () => {

})