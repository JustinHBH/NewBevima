//emailService.js
const nodemailer = require('nodemailer');

const sendOtpEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'noreply.bevima@gmail.com',
        pass: 'mbsl qamh hutb gekq',
      },
    });

    await transporter.sendMail({
      from: 'noreply.bevima@gmail.com',
      to: email,
      subject: 'Xác thực OTP của bạn',
      html: 
      `<b>Mã OTP của bạn là: ${otp}</b>
      <p>Bevima xin chào, hãy xác thực email của quý khách đây nha</p>
      <p>Mã Otp sẽ có hiệu lực trong vòng 5 phút</p>`,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};


module.exports = { sendOtpEmail };
