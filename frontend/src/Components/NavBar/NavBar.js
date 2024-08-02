import React from 'react';
import './NavBar.css';

const NavBar = () => {
  return (
    <div className="navbar">
      <ul>
        <li><a href="/">TRANG CHỦ</a></li>
        <li><a href="/product-list">SẢN PHẨM</a></li>
        <li><a href="/MainAboutUs">VỀ CHÚNG TÔI</a></li>
      </ul>
    </div>
  );
};

export default NavBar;
