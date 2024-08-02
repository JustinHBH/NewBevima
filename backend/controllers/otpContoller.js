// otpController.js
const db = require('../db');
const crypto = require('crypto');
const { sendOtpEmail } = require('../services/emailService');
const { emailExistRegister } = require('./userController'); 


const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString();
};


const createAndSendOtp = (email, otp, otpExpiry, res) => {
  const sql = 'UPDATE user SET otp = ?, otpExpiry = ? WHERE email = ?';
  db.query(sql, [otp, otpExpiry, email], async (err, result) => {
      if (err) {
          console.log(err);
          return res.status(500).json({ error: 'Internal Server Error' });
      }

      try {
          await sendOtpEmail(email, otp);
          res.json({ message: 'OTP đã được gửi đến email của bạn.' });
      } catch (error) {
          console.error('Lỗi khi gửi email:', error);
          return res.status(500).json({ error: 'Không thể gửi email OTP.' });
      }
  });
};

const sendOtp = async (req, res) => {
  const { email } = req.body;
  const exists = await emailExistRegister(email);
  if (!exists) {
      return res.status(400).json({ error: 'Email không tồn tại trong hệ thống' });
  }

  const otp = generateOtp();
  const otpExpiry = new Date();
  otpExpiry.setMinutes(otpExpiry.getMinutes() + 5);

  const checkOtpSql = 'SELECT otp FROM user WHERE email = ?';
  db.query(checkOtpSql, [email], (checkErr, checkResults) => {
      if (checkErr) {
          console.log(checkErr);
          return res.status(500).json({ error: 'Internal Server Error' });
      }
      
      if (checkResults[0] && checkResults[0].otp !== null) {
          const resetOtpSql = 'UPDATE user SET otp = NULL WHERE email = ?';
          db.query(resetOtpSql, [email], (resetErr, resetResult) => {
              if (resetErr) {
                  console.log(resetErr);
                  return res.status(500).json({ error: 'Lỗi khi cập nhật OTP.' });
              }
              createAndSendOtp(email, otp, otpExpiry, res);
          });
      } else {
          createAndSendOtp(email, otp, otpExpiry, res);
      }
  });
};


  

const verifyOtp = async (req, res) => {
    const { email, otp } = req.body; 

    const sqlSelect = 'SELECT * FROM user WHERE email = ? AND otp = ? AND otpExpiry > NOW()';
    db.query(sqlSelect, [email, otp], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Lỗi server khi xác thực OTP.' });
        }
        if (results.length > 0) {
            const sqlUpdate = 'UPDATE user SET otp = NULL, otpExpiry = NULL WHERE email = ?';
            db.query(sqlUpdate, [email], (updateErr, updateResult) => {
                if (updateErr) {
                    console.error(updateErr);
                    return res.status(500).json({ error: 'Lỗi server khi cập nhật người dùng.' });
                }
                res.json({ success: true, message: 'OTP đã được xác minh thành công.' });
            });
        } else {

            res.status(400).json({ success: false, message: 'OTP không hợp lệ hoặc đã hết hạn.' });
        }
    });
};


module.exports = {
  sendOtp,
  verifyOtp,
};
