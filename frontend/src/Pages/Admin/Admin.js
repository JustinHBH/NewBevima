import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SidebarAdmin from '../../Components/Admin/SidebarAdmin/SidebarAdmin';
import Dashboard from '../../Components/Admin/Dashboard/Dashboard';
import CustomerManagement from '../../Components/Admin/CustomerManagement/CustomerManagement';
import StaffManagement from '../../Components/Admin/StaffManagement/StaffManagement';
import ProductManagement from '../../Components/Admin/ProductManagement/ProductManagement';
import InvoiceManagement from '../../Components/Admin/InvoiceManagement/InvoiceManagement';
import './Admin.css';

function Admin() {
  const userData = JSON.parse(localStorage.getItem('userData'));

  const isAuthorized = userData && (userData.role_name === 'admin' || userData.role_name === 'employee');

  if (!isAuthorized) {
    return <Navigate to="/admin-login"/>;
  }

  return (
    <div className="admin-container">
      <SidebarAdmin />
      <div className="admin-content">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="customer-management" element={<CustomerManagement />} />
          <Route path="invoice-management" element={<InvoiceManagement />} />
          <Route path="staff-management" element={<StaffManagement />} />
          <Route path="product-management" element={<ProductManagement />} />
        </Routes>
      </div>
    </div>
  );
}
export default Admin;
