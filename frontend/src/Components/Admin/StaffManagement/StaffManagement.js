import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import SearchBarAdmin from '../SearchBarAdmin/SearchBarAdmin';
import AddNewStaffForm from './AddNewStaffForm'; 
import UpdateStaffForm from './UpdateStaffForm';
import Swal from 'sweetalert2';
import '../AddNew/AddNew.css'
import  '../ProductManagement/ProductManagement.css'

function StaffManagement() {
  const [staff, setStaff] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false)
  const [showUpdateForm, setShowUpdateForm] = useState(false); 
  const [selectedStaffId, setSelectedStaffId] = useState(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get('http://localhost:3001/user/staff');
        setStaff(response.data);
        setFilteredStaff(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchStaff();
  }, []);

  const handleSearch = (query) => {
    const filtered = staff.filter((staff) =>
    staff.user_id.toString().includes(query) ||
      (staff.username?.toLowerCase().includes(query.toLowerCase())) ||
      (staff.role_name?.toLowerCase().includes(query.toLowerCase())) ||
      (staff.email?.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredStaff(filtered);
  };

  const handleShowAddForm = () => setShowAddForm(true);
  const handleCloseAddForm = () => setShowAddForm(false);

  const handleShowUpdateForm = (staffId) => {
    setSelectedStaffId(staffId); // Lưu trữ ID nhân viên để chỉnh sửa
    setShowUpdateForm(true); // Hiển thị form chỉnh sửa
  };

  const handleCloseUpdateForm = () => {
    setShowUpdateForm(false);
    setSelectedStaffId(null); // Xóa lựa chọn ID khi đóng form
  };

  const handleDeleteStaff = async (staffId) => {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa nhân viên này không?',
      text: "Bạn không thể hoàn tác hành động này!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có, xóa nó!',
      cancelButtonText: 'Không, hủy bỏ!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteStaff(staffId);
      }
    });
  };
  
  const deleteStaff = async (staffId) => {
    try {
      await axios.delete(`http://localhost:3001/user/${staffId}`);
      Swal.fire(
        'Đã xóa!',
        'Nhân viên đã được xóa thành công.',
        'success'
      );
    
      const updatedStaffList = filteredStaff.filter((staff) => staff.user_id !== staffId);
      setFilteredStaff(updatedStaffList);
      setStaff(updatedStaffList);
    } catch (error) {
      console.error('Error deleting staff:', error);
      Swal.fire(
        'Lỗi!',
        'Có lỗi xảy ra khi xóa nhân viên.',
        'error'
      );
    }
  };
  
  return (
    <div>
      <div className='search-and-add'>
        <SearchBarAdmin
          placeholder="Tìm kiếm nhân viên..."
          handleSearch={handleSearch}
        />
        <button className='add-new-button' onClick={handleShowAddForm}>+ Thêm nhân viên mới</button>
      </div>
      {showAddForm && <AddNewStaffForm handleCloseForm={handleCloseAddForm} />}
      {showUpdateForm && <UpdateStaffForm handleCloseForm={handleCloseUpdateForm} staffId={selectedStaffId} />}

      <table className="product-table">
        <thead className="product-table-header">
          <tr className="product-table-header-row">
            <th className="product-table-header-cell">ID nhân viên</th>
            <th className="product-table-header-cell">Tên nhân viên</th>
            <th className="product-table-header-cell">Chức vụ</th>
            <th className="product-table-header-cell">Email</th>
            <th className="product-table-header-cell">Thao tác</th>
          </tr>
        </thead>
        <tbody className="product-table-body">
          {filteredStaff.map((staff) => (
            <tr className="product-table-row" key={staff.user_id}>
              <td className="product-table-cell">{staff.user_id}</td>
              <td className="product-table-cell">{staff.username}</td>
              <td className="product-table-cell">{staff.role_name}</td>
              <td className="product-table-cell">{staff.email}</td>
              <td className="product-table-cell">

              <FontAwesomeIcon 
              icon={faEdit} 
              className="edit-icon" 
              onClick={() => handleShowUpdateForm(staff.user_id)} 
              />

                <FontAwesomeIcon 
                icon={faTrash} 
                className="delete-icon" 
                onClick={() => handleDeleteStaff(staff.user_id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default StaffManagement;
