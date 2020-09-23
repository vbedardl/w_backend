const nodeMailer = require("nodemailer");
const dotenv = require("dotenv");
const xoauth2 = require("xoauth2");
dotenv.config();

const sendOnBoardingEmail = (email, password) => {
  console.log(`nodeMailer : sent to email: ${email}`);
  console.log(`Hi, your temporary password is:${password}. Login to update it`);

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

export { sendOnBoardingEmail as default };
