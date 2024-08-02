import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBarAdmin from '../SearchBarAdmin/SearchBarAdmin'; 
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

function CustomerManagement() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/user/customer');
        setCustomers(response.data);
        setFilteredCustomers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCustomers();
  }, []);

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSearch = (query) => {
    const filtered = customers.filter((customer) => {
      const userIdMatch = customer.user_id.toString().includes(query);
      const nameMatch = customer.username && typeof customer.username === 'string' ? customer.username.toLowerCase().includes(query.toLowerCase()) : false;
      const emailMatch = customer.email && typeof customer.email === 'string' ? customer.email.toLowerCase().includes(query.toLowerCase()) : false;
      return userIdMatch || nameMatch || emailMatch;
    });
    setFilteredCustomers(filtered);
  };

  const handleViewDetails = async (userId) => {
    setIsModalOpen(true);
    try {
      const response = await axios.get(`http://localhost:3001/profile/${userId}`);
      setSelectedCustomer(response.data);
    } catch (error) {
      console.error('Failed to fetch details:', error);
    }
  };

  return (
    <div>
      <div className='search-and-add'>
        <SearchBarAdmin
          placeholder="Tìm kiếm khách hàng..."
          handleSearch={handleSearch}
        />
      </div>
      <table className="product-table">
        <thead className="product-table-header">
          <tr className="product-table-header-row">
            <th className="product-table-header-cell">ID Người dùng</th>
            <th className="product-table-header-cell">Tên</th>
            <th className="product-table-header-cell">Email</th>
            <th className="product-table-header-cell">Thao tác</th>
          </tr>
        </thead>
        <tbody className="product-table-body">
          {filteredCustomers.map((customer) => (
            <tr className="product-table-row" key={customer.user_id}>
              <td className="product-table-cell">{customer.user_id}</td>
              <td className="product-table-cell">{customer.username}</td>
              <td className="product-table-cell">{customer.email}</td>
              <td className="product-table-cell">
              <FontAwesomeIcon icon={faEye} onClick={() => handleViewDetails(customer.user_id)} style={{ cursor: 'pointer' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Thông Tin Khách Hàng</h2>
        <p>ID: {selectedCustomer?.user_id}</p>
        <p>Tên: {selectedCustomer?.fullname}</p>
        <p>Số điện thoại: {selectedCustomer?.phone}</p>
        <p>Địa chỉ: {selectedCustomer?.address}</p>
        <p>Sinh nhật: {selectedCustomer ? formatDate(selectedCustomer.birthdate) : ''}</p>
        
      </Modal>
    </div>
  );
}

export default CustomerManagement;
