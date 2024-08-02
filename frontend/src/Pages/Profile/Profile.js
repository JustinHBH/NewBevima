import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Profile.css';

const ProfileModal = ({ isOpen, onClose }) => {
  const [profileData, setProfileData] = useState({
    fullname: '',
    phone: '',
    address: '',
    birthdate: new Date(),
    profile_description: ''
  });
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    if (!isOpen) return;
    setIsLoading(true);
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.user_id) {
      setUserId(userData.user_id);
      axios.get(`http://localhost:3001/profile/${userData.user_id}`)
        .then(response => {
          const data = response.data;
          setProfileData({
            ...data,
            birthdate: new Date(data.birthdate || new Date())
          });
        })
        .catch(err => {
          console.error('Error fetching profile:', err);
          Swal.fire({
            icon: 'error',
            title: 'Lỗi tải hồ sơ',
            text: 'Không thể tải thông tin hồ sơ. Vui lòng thử lại sau.'
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setErrors({ general: 'UserID not found in Local Storage.' });
      setIsLoading(false);
    }
  }, [isOpen]);

  const validate = (values) => {
    const errors = {};
    if (values.phone.trim() && !/^(0|\+84)(3|5|7|8|9)\d{8}$/.test(values.phone)) {
        errors.phone = "Định dạng số điện thoại không hợp lệ";
    }
    return errors;
  };

  const handleUpdateProfile = (event) => {
    event.preventDefault();
    const formData = {
        fullname: event.target.fullname.value,
        phone: event.target.phone.value,
        address: event.target.address.value,
        birthdate: profileData.birthdate,
        profile_description: event.target.profile_description.value,
    };

    const formErrors = validate(formData);
    if (Object.keys(formErrors).length === 0) {
      axios.put(`http://localhost:3001/profile/${userId}`, formData)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Cập nhật thành công',
            text: 'Thông tin hồ sơ đã được cập nhật thành công.'
          });
          setIsEditing(false);
          setProfileData(formData);
        })
        .catch(error => {
          console.error('Failed to update profile:', error);
          Swal.fire({
            icon: 'error',
            title: 'Cập nhật thất bại',
            text: 'Đã xảy ra lỗi khi cập nhật hồ sơ. Vui lòng thử lại.'
          });
        });
    } else {
      setErrors(formErrors);
    }
  };

  if (!isOpen) return null;
  if (isLoading) return <p className='loading'>Loading...</p>;
  if (errors.general) {
    return <p className='errorMessage'>{errors.general}</p>;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>User Profile</h2>
        {!isEditing ? (
          <>
            <p>Name: {profileData.fullname}</p>
            <p>Phone: {profileData.phone}</p>
            <p>Address: {profileData.address}</p>
            <p>Birthdate: {profileData.birthdate.toISOString().split('T')[0]}</p>
            <p>Bio: {profileData.profile_description}</p>
            <div className='update-back'>
            <button onClick={() => setIsEditing(true)}>Chỉnh sửa</button>
            <button onClick={onClose}>Đóng</button>
            </div>
          </>
        ) : (
          <form onSubmit={handleUpdateProfile}>
            <input name="fullname" defaultValue={profileData.fullname} placeholder="Name" />

            <input
             name="phone"
             defaultValue={profileData.phone}
             placeholder="Phone"
             type="tel"
             inputMode="numeric"
             pattern="[0-9]*"
             maxLength="10"
             onChange={(e) => {
            if (e.target.validity.valid) {
            setProfileData({ ...profileData, phone: e.target.value });
          }
             }}
          />

            {errors.phone && <div className="error-message">{errors.phone}</div>}

            <input name="address" defaultValue={profileData.address} placeholder="Address" />

            <DatePicker
          selected={profileData.birthdate}
          onChange={(date) => setProfileData({ ...profileData, birthdate: date })}
          dateFormat="dd-MM-yyyy"
          customInput={
          <input
            onKeyDown={(event) => {
        if (!/[0-9]/.test(event.key) && event.key !== '-' && event.key !== "Backspace" && event.key !== "Tab" && event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
          event.preventDefault();
        }
      }}
    />
  }
/>


            <textarea 
              name="profile_description"
              defaultValue={profileData.profile_description}
              placeholder="Bio"
              rows="3"
              style={{ width: '100%' }}
            />
            <div className='update-back'>
            <button type="submit">Cập nhật</button>
            <button type="button" onClick={() => setIsEditing(false)}>Trở về</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;
