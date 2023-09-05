const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground/";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN, SENDER_EMAIL_ADDRESS } = process.env;

const oauth2Client = new OAuth2(
    GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN, OAUTH_PLAYGROUND
);

const mail = ( subject, message) => {

   oauth2Client.setCredentials({
    refresh_token: GOOGLE_REFRESH_TOKEN
   });

    const accessToken = oauth2Client.getAccessToken();
    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: "OAuth2",
            user: SENDER_EMAIL_ADDRESS,
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            refreshToken: GOOGLE_REFRESH_TOKEN,
            accessToken
        }
    });

    const mailOptions = {
        from: SENDER_EMAIL_ADDRESS,
        to: process.env.ADMIN_EMAIL_ADDRESS,
        subject: subject,
        html: message
    };

    return new Promise((resolve, reject) => {
        smtpTransport.sendMail(mailOptions, (err, info) => {
            if (err) {
                reject(err.message);
            } else {
                resolve(info);
            }
        });
    });
};

module.exports = mail;
