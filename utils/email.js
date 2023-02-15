const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config({ path: '../config.env' });

const sendEmail = async options => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'Ivan Cirkovic <cirko007ivan@gmail.com>',
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
