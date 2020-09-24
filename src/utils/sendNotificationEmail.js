const dotenv = require("dotenv");
dotenv.config();

var accountSid = "AC12a95fa05626623848fca57b0c7e3c94";
var authToken = "cfea809a9bd3e33141d5618448dc849c";

var twilio = require("twilio");
var client = new twilio(accountSid, authToken);
const sendNotificationEmail = (email, user) => {
  console.log(`nodeMailer : sent to email: ${email}`);

  client.messages
    .create({
      body: `Hi ${user}, a package is ready for you to pick up at reception.`,
      to: "+14385807252", // Text this number
      from: "+17787701746", // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));
};

export { sendNotificationEmail as default };
