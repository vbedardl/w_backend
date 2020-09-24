const dotenv = require("dotenv");
dotenv.config();
const twilio = require("twilio");

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTHTOKEN;

const client = new twilio(accountSid, authToken);
const cleanPhone = (phone) => {
  return phone.trim().replace(/[- )(]/g, "");
};

const sendNotificationEmail = (owner, id) => {
  const { name, phone } = owner;

  client.messages
    .create({
      body: `Hi ${name}, a package is ready for you to pick up at reception.Pickup code: ${id}`,
      to: `${cleanPhone(phone)}`,
      from: "+17787701746",
    })
    .then((message) => console.log(message.sid));
};

export { sendNotificationEmail as default };
