//productcard.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProductCard.css';
import ProductDetail from '../ProductDetail/ProductDetail';
import { connect } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { addOneToCart, addToFavorites, removeFromFavorites } from '../../Reducers/cart/cartActions';

const ProductCard = ({ 
  product, 
  isFavorite,
  addOneToCart,
  addToFavorites,
  removeFromFavorites, 
}) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [productDetail, setProductDetail] = useState(null);
  const navigate = useNavigate();

  const checkLogin = () => {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      Swal.fire({
        icon: 'error',
        title: 'Chưa đăng nhập',
        text: 'Bạn cần phải đăng nhập để thực hiện thao tác này',
        willClose: () => {
          navigate('/login');
        }
      });
      return false;
    }
    return true;
  };


  const handleAddToCartClick = () => {
    if (!checkLogin()) return;
    addOneToCart(product);
    toast.success('Sản phẩm đã được thêm vào giỏ hàng!', {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  
  const handleShowProductInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/products/${product.product_id}`);
      setProductDetail(response.data); 
      setIsDetailOpen(true); 
    } catch (error) {
      console.error('Lỗi khi lấy thông tin sản phẩm:', error);
      toast.error('Không thể lấy thông tin sản phẩm. Vui lòng thử lại sau.', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
  };

  const handleFavoriteClick = () => {
    if (!checkLogin()) return;
    if (!isFavorite) {
      addToFavorites(product); 
      toast.success('Sản phẩm đã được thêm vào danh sách yêu thích!', {
        position: 'bottom-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      removeFromFavorites(product); 
      toast.success('Sản phẩm đã được bỏ khỏi danh sách yêu thích!', {
        position: 'bottom-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };



  return (
    <div className="product-card">
      <div className="product-info">
        <div className="product-image-container">
          <img src={product.image_url} alt={product.product_name} className="product-image"/>
        </div>
        <button className="product-info-button" onClick={handleShowProductInfo}>
          Xem chi tiết
        </button>
        {isDetailOpen && productDetail && (
        <ProductDetail product={productDetail} onClose={() => setIsDetailOpen(false)} />
      )}
      </div>
      <div>
        <p className="product-category">{product.category_name}</p>
        <h3 className="product-name">{product.product_name}</h3>
        <p className="product-price">
          {(product.price / 1000).toFixed(0)} 
          {".000 ₫"}
        </p>
      </div>
      <div className="product-icons">
        <div className="product-icon-btn" onClick={handleAddToCartClick}>
          <i className="fas fa-cart-plus"></i>
        </div>
        <div className="product-icon-btn" onClick={handleFavoriteClick}>
          {isFavorite ? (
            <i className="fas fa-heart" style={{ color: 'red' }}></i>
          ) : (
            <i className="far fa-heart"></i>
          )}
        </div>
      </div>
  
      {isDetailOpen && 
      <ProductDetail 
        product={product} 
        onClose={handleCloseDetail}
        addOneToCart={addOneToCart} 
       />}
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    product_id: PropTypes.number.isRequired,
    image_url: PropTypes.string.isRequired,
    category_name: PropTypes.string.isRequired,
    product_name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired, 
  isFavorite: PropTypes.bool.isRequired,
  addOneToCart: PropTypes.func.isRequired, 
  addToFavorites: PropTypes.func.isRequired,
  removeFromFavorites: PropTypes.func.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired 
};

const mapStateToProps = (state, ownProps) => ({
  isFavorite: state.cart.favorites.some(fav => fav.product_id === ownProps.product.product_id),
});


export default connect(mapStateToProps, { addOneToCart, addToFavorites, removeFromFavorites })(ProductCard);
