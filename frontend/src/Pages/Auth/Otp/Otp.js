import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { registerSuccess } from '../../../Reducers/auth/authActions';
import './Otp.css';


const OtpModal = ({ isOpen, onRequestClose, email, onSuccess  }) => {
    const [otp, setOtp] = useState('');
    const dispatch = useDispatch();

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`Verifying OTP for email: ${email}, OTP: ${otp}`); // Debug log
        try {
            const response = await axios.post('http://localhost:3001/otp/verify-otp', {
                email, otp
            });
            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Xác minh thành công',
                    text: 'OTP đã được xác minh thành công.',
                });
                dispatch(registerSuccess(response.data));
                onSuccess();
                onRequestClose();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Xác minh thất bại',
                    text: response.data.message || 'OTP không chính xác. Vui lòng thử lại.', 
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Có lỗi xảy ra khi xác minh OTP.',
            });
            console.error('Error verifying OTP:', error.response.data); 
        }
    };
    
    

    const handleResendOtp = async () => {
        try {
            const response = await axios.post('http://localhost:3001/otp/send-otp', { email });
            Swal.fire({
                icon: 'success',
                title: 'Gửi lại OTP thành công',
                text: response.data.message || 'Một OTP mới đã được gửi đến email của bạn.', 
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Có lỗi xảy ra khi gửi lại OTP.', 
            });
            console.error('Error resending OTP:', error);
        }
    };
    

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false} className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-header">Nhập mã OTP</h2>
                <form onSubmit={handleSubmit} className="modal-body">
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Nhập mã OTP của bạn"
                        required
                    />
                    <div className="modal-footer">
                        <button type="submit" className="confirm-otp-button">Xác nhận OTP</button>
                        <button type="button" className="resend-otp-button" onClick={handleResendOtp}>Gửi lại OTP</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default OtpModal;
