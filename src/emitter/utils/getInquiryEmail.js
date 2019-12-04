const url = require('url');
const isProduction = require('@utils/isProduction');
const isPrd = isProduction();

const getDeleteRoute = ref => {
  const host = process.env.HOST;
  const deleteHost = isPrd ? host : 'http://localhost:9000';
  return url.resolve(deleteHost, `/api/inquiries/resolve?ref=${ref}`);
}

const getInquiryEmail = ({ email, message, phone, name, ref }) => `
  <div>
    <h2>Miss Dawn!</h2>
    <h2>This is the BoBo cloud! You have a new inquiry from your website!</h2>
    <p>Name: ${name}</p>
    <p>Email: ${email}</p>
    <p>Phone: ${phone}</p>
    <p>Message:</p>
    <p>${message}</p>
    <h2>Please click this link below when you have followed up with the client</h2>
    <a href=${getDeleteRoute(ref)}>Resolve inquiry</a>
  </div>
`

module.exports = getInquiryEmail;