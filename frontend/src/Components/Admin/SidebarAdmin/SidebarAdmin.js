import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faUsers, faFileInvoice, faUser, faBox } from '@fortawesome/free-solid-svg-icons';
import './SidebarAdmin.css';

function SidebarAdmin() {
  const location = useLocation();
  
  const userData = JSON.parse(localStorage.getItem('userData'));
  const role = userData?.role_name;

  const items = [
    { name: 'Dashboard', icon: faDashboard, link: '/admin/dashboard', roles: ['admin'] },
    { name: 'Quản lý khách hàng', icon: faUsers, link: '/admin/customer-management', roles: ['admin', 'employee'] },
    { name: 'Quản lý hóa đơn', icon: faFileInvoice, link: '/admin/invoice-management', roles: ['admin', 'employee'] },
    { name: 'Quản lý nhân viên', icon: faUser, link: '/admin/staff-management', roles: ['admin'] },
    { name: 'Quản lý sản phẩm', icon: faBox, link: '/admin/product-management', roles: ['admin', 'employee'] },
  ];

  const filteredItems = items.filter(item => item.roles.includes(role));

  return (
    <div className="sidebarAdmin">
      <ul className="sidebarList">
        {filteredItems.map(({ name, icon, link }) => (
          <li
            key={name}
            className={`sidebarListItem ${location.pathname === link ? "active" : ""}`}
          >
            <Link to={link} className="sidebarLink">
              <FontAwesomeIcon icon={icon} className="sidebarIcon" />
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SidebarAdmin;
