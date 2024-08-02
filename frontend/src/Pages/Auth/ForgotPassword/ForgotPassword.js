import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './ForgotPassword.css';
import OtpModal from '../Otp/Otp';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [isPasswordResetFormOpen, setIsPasswordResetFormOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false); 
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const checkResponse = await axios.get(`http://localhost:3001/user/check-customer-email?email=${email}`);
            if (checkResponse.data.success) {
                const otpResponse = await axios.post('http://localhost:3001/otp/send-otp', { email });
                if (otpResponse.data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'OTP đã gửi!',
                        text: 'Mã OTP đã được gửi tới email của bạn.',
                    });
                    setIsOtpModalOpen(true);
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'OTP đã gửi!',
                        text: 'Mã OTP đã được gửi tới email của bạn.',
                    });
                    setIsOtpModalOpen(true);

                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Email không tồn tại',
                    text: checkResponse.data.message,
                });
            }
        } catch (error) {
            console.error('Error checking email or sending OTP:', error);
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Email không tồn tại. Vui lòng đăng ký',
            });
        }
    };

    const handleOtpModalClose = () => {
        setIsOtpModalOpen(false);
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
          Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Mật khẩu mới và mật khẩu xác nhận không khớp.'
          });
          return;
        }
        console.log('New Password:', newPassword);

        const requestBody = {
          email,
          newPassword
        };
      
        console.log('Sending request with body:', requestBody);
      
        try {
          const response = await axios.post('http://localhost:3001/user/reset-password', requestBody);
          Swal.fire({
            icon: 'success',
            title: response.data.message || 'Đặt lại mật khẩu thành công',
            text: 'Mật khẩu của bạn đã được đặt lại thành công.'
          });
          setIsPasswordResetFormOpen(false);
          navigate('/login');
        } catch (error) {
          console.error('Error resetting password:', error.response.data);
          Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Có lỗi xảy ra khi đặt lại mật khẩu. Vui lòng thử lại.'
          });
        }
      };
      
    return (
        <div className="forgot-password-page">
            <h2>Quên mật khẩu</h2>
            {!isPasswordResetFormOpen && (
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Hãy điền email của bạn"
                        required
                    />
                    <button type="submit">Kiểm tra email</button>
                </form>
            )}
            {isOtpModalOpen && (
                <OtpModal
                    isOpen={isOtpModalOpen}
                    onRequestClose={handleOtpModalClose}
                    email={email}
                    onSuccess={() => setIsPasswordResetFormOpen(true)}
                />
            )}
            {isPasswordResetFormOpen && (
                <form onSubmit={handlePasswordReset}>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Nhập mật khẩu mới"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Xác nhận mật khẩu mới"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                    />
                    <button className='show-password'
                    onClick={() => setShowPassword(!showPassword)} type="button">
                        {showPassword ? 'Ẩn Mật Khẩu' : 'Hiện Mật Khẩu'}
                    </button>
                    <button type="submit">Đặt lại mật khẩu</button>
                </form>
            )}
        </div>
    );
}

export default ForgotPassword;
