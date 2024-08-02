// Favorite.js
import React from 'react';
import { connect } from 'react-redux';
import ProductCard from '../../Components/ProductCard/ProductCard';
import { removeFromFavorites } from '../../Reducers/cart/cartActions';
import './Favourite.css';

const Favorite = ({ favoriteProducts, removeFromFavorites }) => {
  const handleRemoveFromFavorites = (productId) => {
    removeFromFavorites(productId); 
  };

  return (
    <div className="favorite-page">
      <h2>Sản phẩm yêu thích</h2>
      <div className="product-cards">
        {favoriteProducts.map((product) => (
          <ProductCard
            key={product.product_id}
            product={product}
            isFavorite={favoriteProducts.some(fav => fav.product_id === product.product_id)}
            removeFromFavorites={() => handleRemoveFromFavorites(product.product_id)}
            productId={product.product_id}
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    favoriteProducts: state.cart.favorites, 
  };
};

export default connect(mapStateToProps, { removeFromFavorites })(Favorite);