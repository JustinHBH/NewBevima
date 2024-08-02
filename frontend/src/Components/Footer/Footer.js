// Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="contact-follow-container">
        <div className="contact">
          <h3 >Liên hệ chúng tôi:</h3>
          <p>Email: customerservice@bevima.com</p>
          <p>Số điện thoại: +123 456 789</p>
          <p>Địa chỉ: The Emporium Tower, 184 Đ. Lê Đại Hành, Phường 15, Quận 11, Thành phố Hồ Chí Minh </p>
        </div>
        <div className="follow">
          <h3>Theo dõi chúng tôi</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com/profile.php?id=61554364357398" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>    
          </div>
          <p className="footer-text">© 2023 BEVIMA. All rights reserved.</p>
        </div>
      </div> 
    </footer>
  );
};

export default Footer;
