const getInquiryEmail = ({ email, message, phone = 'not provided', name, ref }) => `
  <div>
    <h2>Miss Dawn!</h2>
    <h2>This is the BoBo cloud! You have a new inquiry from your website!</h2>
    <p>Name: ${name}</p>
    <p>Email: ${email}</p>
    <p>Phone: ${phone}</p>
    <p>Message:</p>
    <p>${message}</p>
  </div>
`

module.exports = getInquiryEmail;