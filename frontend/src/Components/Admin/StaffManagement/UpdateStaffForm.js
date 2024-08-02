import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../AddNew/AddNew.css';

function UpdateStaffForm({ handleCloseForm, staffId }) {
    const [staffName, setStaffName] = useState('');
    const [staffEmail, setStaffEmail] = useState('');
    const [staffRole, setStaffRole] = useState('');
    const [staffPassword, setStaffPassword] = useState('');

    useEffect(() => {
        const fetchStaffData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/user/staff/${staffId}`);
                const staffData = response.data;
                setStaffName(staffData.username);
                setStaffEmail(staffData.email);
                setStaffRole(staffData.role_name);
            } catch (error) {
                console.error('Error fetching staff data:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi!',
                    text: 'Không thể tải dữ liệu nhân viên. Vui lòng thử lại.',
                });
            }
        };

        fetchStaffData();
    }, [staffId]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedStaff = {
            username: staffName,
            email: staffEmail,
            role_name: staffRole,
            ...(staffPassword && { password: staffPassword }),
        };

        try {
            await axios.put(`http://localhost:3001/user/staff/${staffId}`, updatedStaff);
            Swal.fire({
                icon: 'success',
                title: 'Thành công!',
                text: 'Thông tin nhân viên đã được cập nhật thành công!',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.reload();
            });
            handleCloseForm();
        } catch (error) {
            console.error('Error updating staff:', error.response);
            Swal.fire({
                icon: 'error',
                title: 'Lỗi!',
                text: 'Đã xảy ra lỗi khi cập nhật thông tin nhân viên. Vui lòng thử lại sau.',
            });
        }
    };

    return (
        <Modal
            isOpen={true}
            onRequestClose={handleCloseForm}
            className="modal-content"
            overlayClassName="modal-overlay"
        >
            <span className="close" onClick={handleCloseForm}>&times;</span>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="staffName">Tên Nhân Viên:</label>
                    <input
                        type="text"
                        id="staffName"
                        value={staffName}
                        onChange={(e) => setStaffName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="staffEmail">Email:</label>
                    <input
                        type="email"
                        id="staffEmail"
                        value={staffEmail}
                        onChange={(e) => setStaffEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="staffRole">Chức vụ:</label>
                    <select
                        id="staffRole"
                        value={staffRole}
                        onChange={(e) => setStaffRole(e.target.value)}
                        required
                        className="select-style"
                    >
                        <option value="">--Chọn chức vụ--</option>
                        <option value="admin">Admin</option>
                        <option value="employee">Employee</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="staffPassword">Mật khẩu mới (để trống nếu không đổi):</label>
                    <input
                        type="password"
                        id="staffPassword"
                        value={staffPassword}
                        onChange={(e) => setStaffPassword(e.target.value)}
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="submit-btn">Cập Nhật</button>
                    <button type="button" onClick={handleCloseForm} className="cancel-btn">Hủy</button>
                </div>
            </form>
        </Modal>
    );
}

export default UpdateStaffForm;
