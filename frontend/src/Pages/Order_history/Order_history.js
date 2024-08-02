import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import './Order.css'; 
import { setOrderCount } from '../../Reducers/order/orderAction';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoading(true);
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (!userData || !userData.user_id) {
                setError('User ID is missing. Please log in.');
                setIsLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:3001/order/history/${userData.user_id}`);
                if (response.data.length === 0) {
                    setError('No orders found.');
                    dispatch(setOrderCount(0));
                } else {
                    const parsedOrders = response.data.map(order => ({
                        ...order,
                        items: parseItems(order.items) 
                    }));
                    setOrders(parsedOrders);
                    dispatch(setOrderCount(parsedOrders.length));

                }
                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching order history:', err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error Loading Orders',
                    text: 'Failed to load order history. Please try again later.'
                });
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [dispatch]);

    function getStatusStyle(status) {
        switch (status) {
            case 'Chờ xác nhận':
                return { backgroundColor: 'green', color: 'white' };
            case 'Đang giao hàng':
                return { backgroundColor: 'yellow', color: 'black' };
            case 'Đã hoàn thành':
                return { backgroundColor: 'darkblue', color: 'white' };
            case 'Đã hủy':
                return { backgroundColor: 'red', color: 'white' };
            default:
                return {};
        }
    }


    function parseItems(itemsString) {
        try {
            return JSON.parse(itemsString);
        } catch (error) {
            console.error('Error parsing items:', error);
            return []; 
        }
    }

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className='order-container'>
            <h1>Lịch sử đặt hàng</h1>
            {orders.length > 0 ? (
                <table className="order-table">
                    <thead className="product-table-header">
                        <tr className="product-table-header-row">
                            <th className="product-table-header-cell">Order ID</th>
                            <th className="product-table-header-cell">Tên người đặt</th>
                            <th className="product-table-header-cell">Số điện thoại người đặt </th>
                            <th className="product-table-header-cell">Email người đặt</th>
                            <th className="product-table-header-cell">Địa chỉ</th>
                            <th className="product-table-header-cell">Sản phẩm</th>
                            <th className="product-table-header-cell">Tổng tiền</th>
                            <th className="product-table-header-cell">Ngày đặt</th>
                            <th className="product-table-header-cell">Trạng thái đơn hàng</th>
                        </tr>
                    </thead>
                    <tbody className="product-table-body">
                        {orders.map(order => (
                            <tr className="product-table-row" key={order.order_id}>
                                <td className="product-table-cell">{order.order_id}</td>
                                <td className="product-table-cell">{order.customer_name}</td>
                                <td className="product-table-cell">{order.phone}</td>
                                <td className="product-table-cell">{order.customer_email}</td>
                                <td className="product-table-cell">{order.customer_address}</td>
                                <td className="product-table-cell">
                                    {Array.isArray(order.items) ? order.items.map(item => `${item.product_name} (x${item.quantity})`).join(', ') : 'No items'}
                                </td>
                                <td className="product-table-cell">{order.total_amount / 1000}.000 đ</td>
                                <td className="product-table-cell">{new Date(order.created_at).toLocaleDateString()}</td>
                                <td className="product-table-cell" style={getStatusStyle(order.order_status)}>
                                    {order.order_status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : <p>Bạn không có đơn hàng nào</p>}
        </div>
    );
};

export default OrderHistory;
