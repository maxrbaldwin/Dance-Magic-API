# Dance-Magic-API

## Dependencies
- Node JS 
- Google Cloud Platform

## Summary
This is the API for the Dance Magic web application contact for. This API handles the validation, storing and management for inquiries from that contact form.

## Environmental variables
Environmental variables are injected at runtime of this app. The environmental variables for this project are stored in GCP Datastore. Currently, there is a script in `src/utils/setEnvironment.js` that will fetch the environmental variables async and set them at run time.

## Contact
The API for the contact form is at the route `/api/contact`. Middleware applies validation via the `express-validator` npm. The only input that is not mandatory is `phone`. Requests to this API endpoint are resolved almost immediately because after validation the app passes the user's information off to a series of event emitters that process, email and store the inquiry.

## Emitter
This app extends the express event emitter. It handles the bulk of the operations in this app. The API routes will respond immediately to the user and pass the operation off to the event emitter which will resolve the operation internally.

## Sending emails
When the user's inquiry has passed validation two emails will be fired off via the event emitter and nodemailer. The first email is send to the user verifying that we received and successfully managed their inquiry. The second is to Miss Dawn so that she may know that they user had inquired. Namecheap provides the email server via PrivateEmail. The address that sends the emails is `mail@dancemagicnj.com`. Because this email matches the domain it will be sent from, we shouldn't get sent to spam. The email username, password and host are all environmental variables for this app. HTML templates for each email can be found in the `sandbox` directory.

## Resolve Inquiries
As a part of the inquiry email that is sent to Miss Dawn, a link is generate to resolve the email. This link is to the route `/api/inquiries/resolve`. It includes a UUID is as query parameter that corresponds to the UUID stored with the user when the inquiry was saved. When this link is clicked and the request is verified via middleware the inquiry will be marked as resolved in the database. Being marked as resolved allows a cron job to delete these old inquiries.

## Cron: Manage Inquiries
There is a cron job in this app that runs once a day. This job looks at all of the inquiries in the database, checks if they have been resolved and then will delete them if they are greater than 30 days old.

## Error Handling
There are a handful of different middleware steps that validate each request and the content in the request. Therefore, there is also middleware for handling invalid requests. In `src/utils/responses.js` there is an object with error messages and corresponding keys for each error. The error handling middleware is at the bottom of `src/routes/index.js`. If there is a response from the responses file attached to `res.locals` that response will be returned. If there is an error but nothing attached to `res.locals` the user will receive a `500` response. If there is no error and nothing attached to `res.locals` it is assumed that the user is lost and will receive a `404` response
