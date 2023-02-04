const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transproter = nodemailer.createTransport({
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transproter.sendMail(mailOptions);
};

module.exports = sendEmail;
