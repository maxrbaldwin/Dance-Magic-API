const getFollowUpEmail = name => `
<div style="text-align: center; max-width: 600px;">
  <h1>Thank you for reaching out to Dance Magic</h1>
  <div style="text-align: left;">
    <h2>Hi ${name},</h2>
    <p>Thank you for your interest in Dance Magic. We will get back to you as soon as we can. In the meantime, information about class tuition, class structure and recitals is below. Our studio policies are outlined on our policy page. Please follow us on <a href="https://www.facebook.com/Dance-Magic-424482520956394" target="_blank">Facebook</a> for community updates.</p>
  </div>
  <div style="margin: 20px 0px;">
    <img alt="Dance Class Image" src="https://storage.googleapis.com/dance-magic-images/home/classes.gif" />
  </div>
  <div style="text-align: left;">
    <h2>Tuition</h2>
    <p>Tuition is $55.00 per month. $55.00 is for one class per week for a total of 4 weeks or 1 month. If a student wishes to attend more than 1 class per week, tuition will be an additional $43.00 per month for that additional class. Tuition is due by the first week of every month. Tuition paid after the 15th day of each month will be charged an additional $25.00 late fee. There will be a total of 8 ½ payments from September to the end of May. The June payment is determined by the date of our annual recital. All technique classes will be $40.00. Please see our policy page for tuition information about holidays and missed classes.</p>
  </div>
  <div style="text-align: left;">
    <h2>Class Structure</h2>
    <ol>
      <li style="padding: 0px 0px 10px 0px;"><b>Warm-up:</b> The warm-up is very important to all students. They are used to warm up students body, muscles and mind. To prevent serious injury. Students are encouraged to take the warm-up portion of the class very seriously.</li>
      <li style="padding: 10px 0px;"><b>Across the floor:</b> This section of the class is still part of warm-up time. It is also used to teach students ways of using dance to travel across the floor. Students are taught different combinations of steps that will help them with the idea of traveling while dancing.</li>
      <li style="padding: 10px 0px;"><b>Dance Combinations:</b> At the end of the class students are given a group of steps put together by the teacher. For a few weeks these steps are used and more steps are added. Students are encouraged to practice these steps and small combinations.</li>
    </ol>
    <p>The students are taught to train their minds as well as their bodies. No student will be asked to do anything they are not capable of or feel uncomfortable doing. Students should be encouraged to practice at home.</p>
  </div>
  <div style="text-align: left;">
    <h2>Dress Code</h2>
    <ul>
      <li style="padding: 0px 0px 10px 0px;"><b>Tap:</b> Solid color leotard with suntan tights or black jazz pants with leotard or t-shirt. Black tap shoes with elastic.</li>
      <li style="padding: 10px 0px;"><b>Jazz and Modern:</b> Solid color leotard with suntan tights or black jazz pants with leotard or t-shirt. Tan jazz shoes or foot undeez.</li>
      <li style="padding: 10px 0px;"><b>Ballet:</b> Solid color leotard, pink tights, pink ballet shoes, hair in a bun.</li>
      <li style="padding: 10px 0px;"><b>Creative:</b> Pink leotard, pink tights, pink ballet shoes.</li>
      <li style="padding: 10px 0px;"><b>Hip hop:</b> Black dance pants or capri length pants, t-shirt and sneakers.</li>
    </ul>
  </div>
  <div style="text-align: left;">
    <h2>Annual Recital</h2>
    <p>In June Dance Magic students perform in our annual recital. In January students receive letters concerning a costume that must be purchased. Each class is taught a routine that they perform in the show. Our recital is scheduled for 2 shows and 1 dress rehearsal. Dates and times are announced in mid April. Not all students perform in both shows. Performances schedule will be posted in the studio.</p>
  </div>
  <div style="padding: 10px 0px;">609-561-1414</div>
  <div style="padding: 10px 0px;">750 S White Horse Pike, Hammonton, NJ, 08037</div>
</div>
`

module.exports = getFollowUpEmail;