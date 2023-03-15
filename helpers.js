const nodemailer = require("nodemailer");

const { SMTP_USER, SMTP_PASS, MAIL_PORT, MAIL_HOST } = process.env;

const transport = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

/**
 * ####################
 * ## Generate Error ##
 * ####################
 */

const generateError = (msg, status) => {
  const err = new Error(msg);
  err.httpStatus = status;
  throw err;
}

/**
 * ###############
 * ## Send Mail ##
 * ###############
 */

const sendMail = async (to, subject, text) => {
  try {
    await transport.sendMail({
      from: SMTP_USER,
      to,
      bcc: ['amigosttgandra@gmail.com'],
      subject,
      text,
    });
  } catch (err) {
    console.error(err);
    generateError('Error ao enviar o email de reserva');
  }
};

module.exports = { sendMail, generateError };