import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import validator from 'validator';
import OtpModal from '../Otp/Otp';


const Register = () => {
  const [buttonColor, setButtonColor] = useState('#333');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const navigate = useNavigate()
  
  
  const handleOtpSuccess = () => {
    navigate('/login');
};

  const preventCopyPaste = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: 'warning',
      title: 'Không được phép',
      text: 'Không cho phép sao chép và dán ở trường mật khẩu.',
    });
  };

  const handleRegister = () => {
    if (!validator.isEmail(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Email không hợp lệ',
        text: 'Vui lòng nhập một địa chỉ email hợp lệ.',
      });
      return;
    }

    if (password.length < 6 || password.length > 20) {
      Swal.fire({
        icon: 'error',
        title: 'Mật khẩu không hợp lệ',
        text: 'Mật khẩu phải từ 6 đến 20 ký tự.',
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Mật khẩu xác nhận không khớp',
        text: 'Mật khẩu và mật khẩu xác nhận phải giống nhau.',
      });
      return;
    }
  
    axios.post('http://localhost:3001/user/register', { username, email, password })
    .then(() => {
      return axios.post('http://localhost:3001/otp/send-otp', { email });
    })
    
    .then(response => {
      Swal.fire({
        icon: 'success',
        title: response.data.title || 'OTP đã gửi!',
        text: response.data.message || 'Vui lòng kiểm tra email của bạn để lấy OTP.',
      });
      setIsOtpModalOpen(true);
    })
    
    .catch(error => {
      if (error.response && error.response.data) {
        const errorMsg = error.response.data.error || 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.';
        Swal.fire({
          icon: 'error',
          title: 'Đăng ký thất bại',
          text: errorMsg,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Gửi OTP thất bại',
          text: 'Có lỗi xảy ra khi gửi OTP. Vui lòng thử lại.',
        });
      }
      console.error('Error during the registration or OTP sending process:', error);
    });
};



  return (
    <div id="root">
      <div className="register-container">
        <h2>Đăng ký</h2>
        <form>
          <label>Username:</label>
          <input
            type="text"
            placeholder="Nhập username của bạn"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Email:</label>
          <input
            type="email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Mật khẩu:</label>
          <input
            type="password"
            placeholder="Nhập mật khẩu của bạn"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onPaste={preventCopyPaste}
            onCopy={preventCopyPaste}
          />

          <label>Xác nhận mật khẩu:</label>
          <input
            type="password"
            placeholder="Nhập lại mật khẩu của bạn"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onPaste={preventCopyPaste}
            onCopy={preventCopyPaste}
          />

          <button
            type="button"
            onClick={handleRegister}
            style={{ backgroundColor: buttonColor }}
            onMouseEnter={() => setButtonColor('#DDC89B')}
            onMouseLeave={() => setButtonColor('#333')}
          >
            Đăng ký
          </button>
        </form>

        {isOtpModalOpen && <OtpModal 
                isOpen={isOtpModalOpen}
                onRequestClose={() => setIsOtpModalOpen(false)}
                email={email}
                onSuccess={handleOtpSuccess}
            />}

        <p>
          Bạn đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
