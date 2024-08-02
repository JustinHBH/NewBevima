//cart.js
import React from 'react';
import { connect } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../../Reducers/cart/cartActions';
import { Link } from 'react-router-dom';
import EmptyCart from './CartImage/EmptyCart.png'
import './Cart.css';

function Cart({ cart, increaseQuantity, decreaseQuantity, removeFromCart }) {
    let totalCart = 0;

    function totalItemPrice(quantity, price) {
        return (quantity * price).toLocaleString('vi-VN');
    }

    if (cart.items.length === 0) {
        return (
            <div className="cart-empty">
                <img src={EmptyCart} alt='EmptyCart' /> 
                <p>Giỏ hàng của bạn đang trống.</p>
                <Link className='link' to="/product-list?filters=">Tiếp tục mua sắm</Link>
            </div>
        );
    }

    return (
        <div className="row">
            <div>
                <table className="table">
                    <thead>
                        <tr>
                        <th className="cart-columns"></th>
                            <th className="cart-column">Name</th>
                            <th className="cart-column">Image</th>
                            <th className="cart-column">Price</th>
                            <th className="cart-column">Quantity</th>
                            <th className="cart-column">Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.items.map((item, index) => {
                            totalCart += item.quantity * item.price;
                            return (
                                <tr key={index}>
                                    <td><button><i className="badge badge-danger" onClick={() => removeFromCart(item.product_id)}>X</i></button></td>
                                    <td>{item.product_name}</td>
                                    <td><img src={item.image_url} style={{ width: '100px', height: '80px' }} alt={item.product_name} /></td>
                                    <td>{(item.price / 1000)}.000 ₫</td>
                                    <td>
                                        <button onClick={() => {
                                            if (item.quantity === 1) {
                                                removeFromCart(item.product_id);
                                            } else {
                                                decreaseQuantity(item.product_id);
                                            }
                                        }}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => increaseQuantity(item.product_id)}>+</button>
                                    </td>
                                    <td>{totalItemPrice(item.quantity, item.price / 1000)}.000 ₫</td>
                                </tr>
                            );
                        })}
                        <tr>
                            <td colSpan="5">Total Cart</td>
                            <td>{(totalCart / 1000).toFixed(0)}.000 ₫</td>
                        </tr>
                    </tbody>
                </table>
                <Link to="/checkout" className="link">Thanh Toán</Link>
            </div>
        </div>
    );
}


const mapStateToProps = state => ({
    cart: state.cart
});

export default connect(mapStateToProps, { increaseQuantity, decreaseQuantity, removeFromCart })(Cart);
