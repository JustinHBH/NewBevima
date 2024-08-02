//Checkout.js
import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import EmptyCart from './CartImage/EmptyCart.png';
import './Checkout.css';
import Paypal from './Paypal';
import Invoice from './invoice'; 
import axios from 'axios';
import { clearCart } from '../../Reducers/cart/cartActions';

function Checkout({ cart }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('');
    const [customerInfo, setCustomerInfo] = useState({
        customer_name: '',
        customer_email: '',
        customer_address: '',
        phone: ''
    });
    const [errors, setErrors] = useState({});
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData && userData.user_id) {
            setUserId(userData.user_id);
        } else {
            console.error('User ID not found in local storage.');
        }
    }, []);

    const isFormValid = () => {
        return customerInfo.customer_name && customerInfo.customer_email && customerInfo.customer_address && customerInfo.phone && paymentMethod;
    };

    const validate = (values) => {
        const errors = {};
        if (values.phone.trim() && !/^(0|\+84)(3|5|7|8|9)\d{8}$/.test(values.phone)) {
            errors.phone = "Invalid phone number format";
        }
        return errors;
    };

    const handleCustomerInfoChange = (event) => {
        const { name, value } = event.target;
        setCustomerInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (name === 'phone') {
            const validationErrors = validate({ ...customerInfo, [name]: value });
            setErrors(validationErrors);
        }
    };

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleCheckout = async () => {
        if (!userId) {
            alert('User ID is missing. Please log in again.');
            return;
        }

        if (!isFormValid()) {
            alert('Please fill out all required information and select a payment method.');
            return;
        }

        const orderData = {
            userId: userId,
            customerName: customerInfo.customer_name,
            customerEmail: customerInfo.customer_email,
            customerAddress: customerInfo.customer_address,
            phone: customerInfo.phone,
            items: cart.items,
            totalAmount: cart.items.reduce((total, item) => total + item.quantity * item.price, 0),
            paymentMethod: paymentMethod,
            orderStatus: 'Pending'
        };

        localStorage.setItem('pendingOrder', JSON.stringify(orderData));

        try {
            const createResponse = await axios.post('http://localhost:3001/order/create-order', orderData);
            if (createResponse.status === 201) {
                setOrderPlaced(true);
                setShowModal(true);
            } else {
                console.error('Server responded with an error during order creation:', createResponse);
                alert('Server responded with an error. Please check the logs for more information.');
            }
        } catch (error) {
            console.error('Failed to place order:', error);
            alert('Failed to place order. Please try again later.');
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        dispatch(clearCart());
        navigate('/product-list?filters=');
    };

    const totalAmount = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);

    return (
        <div className="checkout-page">
            {orderPlaced && showModal && 
                <Invoice 
                    cart={cart} 
                    customerInfo={customerInfo} 
                    paymentMethod={paymentMethod} 
                    onClose={handleCloseModal} 
                />}
            {orderPlaced ? (
                <div className="order-success">
                    <h3>Your order has been placed successfully!</h3>
                    <Link className='link' to="/product-list?filters=">Continue Shopping</Link>
                </div>
            ) : (
                <div className="order-summary">
                    <h2>Checkout</h2>
                    {cart.items.length === 0 ? (
                        <div className="cart-empty">
                            <img src={EmptyCart} alt='Empty Cart' /> 
                            <p>Your cart is empty.</p>
                            <Link className='link' to="/product-list?filters=">Continue Shopping</Link>
                        </div>
                    ) : (
                        <div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Sản phẩm</th>
                                        <th>Số lượng</th>
                                        <th>Đơn giá</th>
                                        <th>Tổng đơn giá</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.items.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.product_name}</td>
                                            <td>{item.quantity}</td>
                                            <td>{(item.price / 1000).toFixed(0)}.000 ₫</td>
                                            <td>{((item.price * item.quantity) / 1000).toFixed(0)}.000 ₫</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <h3 className='total'>
                                Tổng hóa đơn: {(totalAmount / 1000).toFixed(0)}.000 ₫
                            </h3>
                            <form className="checkout-form">
                                <div className="customer-info">
                                    <h4>Thông tin khách hàng</h4>
                                    <label htmlFor="name">Tên:</label>
                                    <input type="text" id="customer_name" name="customer_name" onChange={handleCustomerInfoChange} required />

                                    <label htmlFor="email">Email:</label>
                                    <input type="email" id="customer_email" name="customer_email" onChange={handleCustomerInfoChange} required />

                                    <label htmlFor="phone">Số điện thoại:</label>
                                    <input 
                                        type="tel" 
                                        className={`input ${errors.phone ? 'is-invalid' : ''}`}
                                        id="phone" 
                                        name="phone" 
                                        onChange={handleCustomerInfoChange} 
                                        required />
                                    {errors.phone && <div className="error-message">{errors.phone}</div>}

                                    <label htmlFor="address">Địa chỉ:</label>
                                    <textarea id="customer_address" name="customer_address" onChange={handleCustomerInfoChange} required></textarea>
                                </div>
                                <div className="payment-method">
                                    <h3>Phương Thức Thanh Toán</h3>
                                    <div className='labels'>
                                        <label>
                                            <input type="radio" name="paymentMethod" value="paypal" onChange={handlePaymentMethodChange} />
                                            Thanh Toán qua PayPal
                                        </label>
                                        <label>
                                            <input type="radio" name="paymentMethod" value="Thanh toán khi nhận hàng" onChange={handlePaymentMethodChange} />
                                            Thanh Toán khi nhận hàng
                                        </label>
                                    </div>
                                </div>
                                {paymentMethod === 'paypal' && <Paypal totalAmount={totalAmount} />}
                                <button type="button" onClick={handleCheckout} disabled={!isFormValid()}>Đặt hàng</button>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

const mapStateToProps = state => ({
    cart: state.cart
});

export default connect(mapStateToProps)(Checkout);
