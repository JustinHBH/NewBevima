import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import classNames from 'classnames';
import Swal from 'sweetalert2';
import './Header.css';
import { logoutSuccess } from '../../Reducers/auth/authActions';
import ProfileModal from '../../Pages/Profile/Profile'; 

const Header = ({ cart, favorites, isLoggedIn, username  }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const dispatch = useDispatch();


  const handleLogout = () => {
    localStorage.removeItem('userData');
    dispatch(logoutSuccess());
    Swal.fire({
      icon: 'success',
      title: 'Đăng xuất thành công',
      text: 'Bạn đã đăng xuất khỏi hệ thống.',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location = '/';
      }
    });
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  let totalItems = 0;
  if (cart && cart.items) {
    totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
  }

  let totalFavorites = 0;
  if (favorites) {
    totalFavorites = favorites.length;
  }

  return (
    <header className='header'>
      
      <div className="logo">
        <h1><Link to="/">BEVIMA</Link></h1>
      </div>
      <nav>
        <ul>
          <li>
            <div className={classNames('icon-container', { 'active': isDropdownOpen })} onClick={toggleDropdown}>
              <i title='Tài khoản' className={classNames('fas', 'fa-user', 'icon')}></i>
              {isLoggedIn ? (
                <ul>
                  <li>
                    <button title='Thông tin cá nhân' className='link-button' onClick={() => setProfileModalOpen(true)}>
                      {username}
                    </button>
                  </li>
                  <li><Link to="/" onClick={handleLogout}>Đăng xuất</Link></li>
                </ul>
              ) : (
                <ul>
                  <li><Link to="/login">Đăng nhập</Link></li>
                </ul>
              )}
            </div>
          </li>
          <li>
            <div className="icon-container">
              <Link to="/cart">
                <i
                title='Giỏ hàng' 
                className={classNames('fas', 'fa-shopping-cart', 'icon')}></i>
                <span style={{ color: 'white', marginLeft:'-10px' }}>({totalItems})</span>
              </Link>
            </div>
          </li>
          <li>
            <div className="icon-container">
              <Link to="/favourite">
                <i 
                title='Sản phẩm yêu thích'
                className={classNames('fas', 'fa-heart', 'icon')}></i>
                <span style={{ color: 'white', fontSize: '25px', marginLeft:'-10px' }}>({totalFavorites})</span>
              </Link>
            </div>
          </li>

          <li>
            <div className="icon-container">
              <Link to="/order-history">
                <i 
                title='Đơn hàng'
                className={classNames('fas', 'fa-file-invoice', 'icon')}></i>
                {/* <span style={{ color: 'white', marginLeft:'-10px' }}>({orderCount})</span> */}
              </Link>
            </div>
          </li>
          
        </ul>
      </nav>
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />
    </header>
  );
};

const mapStateToProps = state => ({
  cart: state.cart,
  favorites: state.cart.favorites,
  isLoggedIn: state.auth.isLoggedIn, 
  username: state.auth.username,
 // orderCount: state.order ? state.order.count : 0
});

export default connect(mapStateToProps)(Header);
