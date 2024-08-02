import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../AddNew/AddNew.css'; 

function AddNewStaffForm({ handleCloseForm }) {
  const [staffName, setStaffName] = useState('');
  const [staffEmail, setStaffEmail] = useState('');
  const [staffRole, setStaffRole] = useState('');
  const [staffPassword, setStaffPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!staffName || !staffEmail || !staffRole || !staffPassword) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Please fill in all required fields!',
      });
      return;
    }

    const newStaff = {
      username: staffName,
      email: staffEmail,
      role_name: staffRole,
      password: staffPassword,
    };

    try {
      const response = await axios.post('http://localhost:3001/user/create-staff', newStaff);
      console.log('Staff added successfully:', response.data);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Staff member has been added successfully!',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        window.location.reload(); 
      });
      handleCloseForm();
    } catch (error) {
      console.error('Error adding staff:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'There was an error adding the staff member. Please try again.',
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
          <label htmlFor="staffName">Staff Name:</label>
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
          <label htmlFor="staffPassword">Mật khẩu:</label>
          <input
            type="password" 
            id="staffPassword"
            value={staffPassword}
            onChange={(e) => setStaffPassword(e.target.value)}
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
            <option value="manager">Admin</option>
            <option value="employee">Employee</option>
           
          </select>
        </div>

        <div>
          <button type="submit">Xác nhận</button>
          
          <button 
          className='add-new-button' 
          type="button" 
          onClick={handleCloseForm}>
            Hủy bỏ
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AddNewStaffForm;
