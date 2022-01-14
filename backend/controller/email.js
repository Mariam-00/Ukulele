require("dotenv").config();
const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    type: "login",
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = (req, res, next) => {

  req.mailOptions.from = process.env.EMAIL;

  transporter.sendMail(req.mailOptions, (error, info) => {
    if (error) {
      next(error);
    } else next();
  });


};

module.exports = { sendEmail };