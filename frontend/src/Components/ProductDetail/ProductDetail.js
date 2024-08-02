//ProductDetail.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import './ProductDetail.css';
import QuantitySelector from './QuantitySelector/QuantitySelector';
// import Rating from './Rating/Rating';
// import CommentList from './Comment/CommentList';
import { connect } from 'react-redux';
import { addToCart } from '../../Reducers/cart/cartActions';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'

const ProductDetail = ({ 
  product, 
  onClose, 
  addToCart,
}) => {

  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  // const [rating, setRating] = useState(product.rating || 0);

  const checkLogin = () => {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      Swal.fire({
        icon: 'error',
        title: 'Unauthorized',
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
    addToCart({ ...product, quantity });
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

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= product.quantity) {
      setQuantity(newQuantity);
    } else {
      
      setQuantity(product.quantity);
    }
  };

  // const handleRatingChange = (value) => {
  //   setRating(value);
  // };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      contentLabel="Product Detail"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '70%',
          height: '80vh',
          marginTop: '10vh',
          marginLeft: '15%',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          padding: '20px',
        },
      }}
    >
      <div className="product-detail-container">
        <div className="product-detail-image-container">
          <img src={product.image_url} alt={product.product_name} className="product-image" />
        </div>
        <div className='product-detail'>
          <p className="product-detail-category">{product.category_name}</p>
          <h3 className="product-detail-name">{product.product_name}</h3>
          <p className="product-detail-description">{product.description}</p>
          <p className="product-detail-stock">Số lượng tồn: {product.quantity}</p>
          <p className="product-detail-price">
            {(product.price / 1000).toFixed(0)}{".000 ₫"}
          </p>
          <div className='product-detail-actions'>
            <QuantitySelector 
              quantity={quantity} 
              onQuantityChange={handleQuantityChange} 
              maxQuantity={product.quantity} 
            />
            <div className="product-detail-add-cart">
              <div className="product-detail-icon-btn" onClick={handleAddToCartClick}>
                <i className="fas fa-cart-plus"></i>
              </div>
            </div>
          </div>
          {/* <Rating rating={rating} onRate={handleRatingChange} /> */}
          <hr/>
          <br/>
          {/* <CommentList/> */}
        </div>
      </div>
    </Modal>
  );
};

ProductDetail.propTypes = {
  product: PropTypes.shape({
    product_id: PropTypes.number.isRequired,
    image_url: PropTypes.string.isRequired,
    category_name: PropTypes.string.isRequired,
    product_name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default connect(null, { addToCart })(ProductDetail);
