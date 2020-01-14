const url = require('url');
const isProduction = require('@utils/isProduction');
const isPrd = isProduction();

const getDeleteRoute = ref => {
  const protocol = isPrd ? 'https' : 'http';
  const hostname = isPrd ? 'dance-magic-api-dot-dance-magic-259922.appspot.com' : 'localhost';
  const pathname = '/api/inquiries/resolve';
  const query = { ref }
  return url.format({
    protocol,
    hostname,
    pathname,
    query,
    ... !isPrd && { port: 9000 }
  });
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