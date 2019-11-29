const emitter = require('@emitter');
const isProduction = require('@utils/isProduction');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey('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');

const isPrd = isProduction();
const myEmail = 'maxrbaldwin2328@gmail.com'
const momsEmail = isPrd ? 'baldwin1255@comcast.net' : myEmail 

emitter.on('sendFollowUp', body => {
  const { email } = body;
  const reciever = isPrd ? email : myEmail;
  const msg = {
    to: reciever,
    from: momsEmail,
    subject: 'Thanks for reaching out to Dance Magic',
    text: 'Here is text follow up',
  };
  
  try {
    sgMail.send(msg);
  } catch (err) {
    console.log('Error send follow up');
  }
})

emitter.on('sendToReceiver', body => {
  const msg = {
    to: momsEmail,
    from: myEmail,
    subject: 'New Inquiry from Dance Magic Website',
    text: 'here is text recieve',
  };
  
  try {
    sgMail.send(msg);
  } catch (err) {
    console.log('Error send follow up');
  }
})
emitter.on('error', () => {

})