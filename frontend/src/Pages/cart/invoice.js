import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './invoice.css';

function Invoice({ cartProp, customerInfo, paymentMethod, onClose }) {
  useEffect(() => {
    console.log("Cart loaded: ", cartProp);
    console.log("Customer Info loaded: ", customerInfo);
  }, [cartProp, customerInfo, paymentMethod]);

  const renderItems = () => {
    if (!cartProp || !cartProp.items) {
      console.error("Cart or items are undefined");
      return null;
    }

    return cartProp.items.map((item, index) => (
      <tr key={index}>
        <td>{item.product_name}</td>
        <td>{item.quantity}</td>
        <td>{(item.price / 1000).toFixed(0)}.000 đ</td>
        <td>{((item.quantity * item.price) / 1000).toFixed(0)}.000 đ</td>
      </tr>
    ));
  };

  const calculateSubtotal = () => {
    if (!cartProp || !cartProp.items) {
      return "0.000 đ";
    }

    let subtotal = 0;
    cartProp.items.forEach(item => {
      subtotal += item.quantity * item.price;
    });
    return (subtotal / 1000).toFixed(0) + ".000 đ";
  };

  return (
    <div className="invoice">
      <h3>HÓA ĐƠN THANH TOÁN</h3>
      <div className="customer-details">
        <p><strong>Tên Khách hàng:</strong> {customerInfo?.customer_name}</p>
        <p><strong>Email:</strong> {customerInfo?.customer_email}</p>
        <p><strong>Địa chỉ:</strong> {customerInfo?.customer_address}</p>
        <p><strong>Số điện thoại:</strong> {customerInfo?.phone}</p>
        <p><strong>Hình thức thanh toán:</strong> {paymentMethod === 'paypal' ? 'PayPal' : 'Thanh toán khi nhận hàng'}</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Số lượng</th>
            <th>Giá</th>
            <th>Tổng đơn giá</th>
           
          </tr>
        </thead>
        <tbody>
          {renderItems()}
        </tbody>
        <tfoot>
          <tr>
            <td className='invoice-total' colSpan="3">Tổng giá:</td>
            <td className='invoice-total'>{calculateSubtotal()}</td>
          </tr>
        </tfoot>
      </table>
      <button onClick={onClose}>Đóng</button>
    </div>
  );
}

const mapStateToProps = state => ({
    cartProp: state.cart,
    customerInfoProp: state.customerInfo,
    paymentMethodProp: state.paymentMethod
});

export default connect(mapStateToProps)(Invoice);
