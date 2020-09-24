const dotenv = require("dotenv");
dotenv.config();
const twilio = require("twilio");

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTHTOKEN;

const client = new twilio(accountSid, authToken);
const cleanPhone = (phone) => {
  return phone.trim().replace(/[- )(]/g, "");
};

const sendOnBoardingEmail = (args) => {
  const { phone, password, name, email } = args;

  client.messages
    .create({
      body: `Hi ${name}. Download the app at: www.walter.com. Login into your account with email:${email} and your temporary password: <${password}>.`,
      to: `${cleanPhone(phone)}`,
      from: "+17787701746",
    })
    .then((message) => console.log(message.sid));
};

export { sendOnBoardingEmail as default };
