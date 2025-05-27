const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function sendMail(to, subject, body, attachment = null) {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to,
    subject,
    text: body
  };

  if (attachment) {
    mailOptions.attachments = [
      {
        filename: attachment,
        path: `./attachments/${attachment}`
      }
    ];
  }

  await transporter.sendMail(mailOptions);
}

module.exports = {
  sendMail
};
