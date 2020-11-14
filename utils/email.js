const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '0de3ffedabf6ae',
      pass: 'd5893ee2b3ad00',
    },
  });

  const mailOptions = {
    from: 'Khrystyna Kovtun <kkovtun@griddynamics.com>',
    to: options.to,
    subject: options.subject,
    text: options.message,
  };

  await transport.sendMail(mailOptions);
};

module.exports = sendEmail;
