const nodeMailer = require("nodemailer");
const dotenv = require("dotenv");
const xoauth2 = require("xoauth2");
dotenv.config();

const sendNotificationEmail = (user, email) => {
  console.log(`nodeMailer : Sent to email: ${email}`);
  console.log(
    `Hi ${user}, a package is ready for you to pick up at reception.`
  );

  // let transporter = nodeMailer.createTransport({
  //   host: "smtp.gmail.com",
  //   port: 465,
  //   secure: true,
  //   auth: {
  //     type: "OAuth2",
  //     user: process.env.USERMAIL,
  //     clientId: process.env.GOOGLE_CLIENT_ID,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  //     refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  //     accessToken: process.env.GOOGLE_ACCESS_TOKEN,
  //   },
  // });
  // let mailOptions = {
  //   from: process.env.USERMAIL,
  //   to: email,
  //   subject: "Welcome to Walter, Here is your temporary password",
  //   text: password,
  // };
  // transporter.sendMail(mailOptions, (error) => {
  //   if (error) {
  //     return console.log("message wasnt sent:", error);
  //   }
  // });
};

export { sendNotificationEmail as default };
