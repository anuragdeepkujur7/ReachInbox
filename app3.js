const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const dotenv = require("dotenv").config();

exports.handler = async function (event, context) {
  try {

    const { name, email, _subject, message } = JSON.parse(event.body);

    const oAuth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URI
    );

    oAuth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_ADDRESS,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: oAuth2Client.getAccessToken(),
      },
    });

    const mailOptions = {
      from: 'Anurag Deep Kujur <anuragdeepkujur758@gmail.com>',
      to: 'adkujur.mtech2021.it@nitrr.ac.in',
      subject: " Hello from gmail api",
      text: 'Hello Myself',
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully" }),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error sending email" }),
    };
  }
};