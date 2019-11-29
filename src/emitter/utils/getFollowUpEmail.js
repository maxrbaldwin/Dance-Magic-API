const getFollowUpEmail = name => `
<div style="text-align: center; max-width: 600px;">
  <h1>Thank you for reaching out to Dance Magic</h1>
  <div style="text-align: left;">
    <h2 style="font-size: 14px;">Hi ${name},</h2>
    <p>Thank you for your interest in Dance Magic. We will get back to you as soon as we can. In the meantime please follow us on <a href="https://www.facebook.com/Dance-Magic-424482520956394" target="_blank">Facebook</a> for community updates.</p>
  </div>
  <div style="margin: 20px 0px;">
    <img alt="Dance Class Image" src="https://storage.googleapis.com/dance-magic-images/home/classes.gif" />
  </div>
  <div style="padding: 10px 0px;">609-561-1414</div>
  <div style="padding: 10px 0px;">750 S White Horse Pike, Hammonton, NJ, 08037</div>
</div>
`

module.exports = getFollowUpEmail;