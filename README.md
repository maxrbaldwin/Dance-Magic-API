# Dance-Magic-API
<img src="https://brand.heroku.com/static/media/built-on-heroku-light.21a0c1f7.svg" alt="built on heroku" width="200" height="50" style="background-color:#430098" />

## Dependencies
- Node ^8.13.0 || >=10.10.0
- npm >=6

## Summary
A Node JS, Express application that handles the contact form on Dance Magic Web by validating the user using recaptcha v3 and validating the user's input. Post validation, the owner of Dance Magic is notified via email that their website received and inquiry and the user receives an email with basic information about Dance Magic and dance classes.

## Environmental variables
Production environmental variables are set through the Heroku dashboard. Local environmental variables are per local machine.

## Contact
The API for the contact form is at the route `/api/contact`. Middleware applies validation via the `express-validator` npm. The only input that is not mandatory is `phone`. Requests to this API endpoint are resolved almost immediately because after validation the app passes the user's information off to a series of event emitters that process the emails.

## Emitter
This app extends the express event emitter. It handles the bulk of the operations in this app. The API routes will respond immediately to the user and pass the operation off to the event emitter which will resolve the operation internally.

## Sending emails
When the user's inquiry has passed validation two emails will be fired off via the event emitter and nodemailer. The first email is send to the user verifying that we received and successfully managed their inquiry. The second is to the owner of Dance Magic so that they may know that they user had inquired. Namecheap provides the email server via PrivateEmail. The address that sends the emails is `mail@dancemagicnj.com`. Because this email matches the domain it will be sent from, we shouldn't get sent to spam. The email username, password and host are all environmental variables for this app. HTML templates for each email can be found in the `sandbox` directory.

## Error Handling
There are a handful of different middleware steps that validate each request and the content in the request. Therefore, there is also middleware for handling invalid requests. In `src/utils/responses.js` there is an object with error messages and corresponding keys for each error. The error handling middleware is at the bottom of `src/routes/index.js`. If there is a response from the responses file attached to `res.locals` that response will be returned. If there is an error but nothing attached to `res.locals` the user will receive a `500` response. If there is no error and nothing attached to `res.locals` it is assumed that the user is lost and will receive a `404` response

## Tests
Testing uses chai, chai-http and mocha to validate different types of requests that the API might encounter. In the tests directory there is dummy data for valid and invalid use cases.

## Health check
Hit the route /.health to get the application uptime, heroku release version and git commit hash
