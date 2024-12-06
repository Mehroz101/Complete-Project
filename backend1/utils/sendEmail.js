const nodemailer = require("nodemailer");
require("dotenv").config();

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your Gmail password or App Password
  },
});

// Function to send email
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    const isSend = await transporter.sendMail(mailOptions);
    if (isSend) {
      return 200;
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
