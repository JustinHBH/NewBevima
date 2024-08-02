import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import '../ProductManagement/ProductManagement.css';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faShippingFast, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import './InvoiceManagement.css';
import SearchBarAdmin from '../SearchBarAdmin/SearchBarAdmin';

function InvoiceManagement() {
    const [invoices, setInvoices] = useState([]);
    const [filteredInvoices, setFilteredInvoices] = useState([]);

    const fetchInvoices = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3001/order/get');
            const formattedInvoices = response.data.map(invoice => ({
                ...invoice,
                items: parseItems(invoice.items)
            }));
            setInvoices(formattedInvoices);
            setFilteredInvoices(formattedInvoices);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    useEffect(() => {
        fetchInvoices();
    }, [fetchInvoices]);

    function parseItems(itemsString) {
        try {
            return JSON.parse(itemsString);
        } catch (error) {
            console.error('Error parsing items:', error);
            return [];
        }
    }

    function handleSearch(query) {
        if (!query) {
            setFilteredInvoices(invoices);
            return;
        }
        const filtered = invoices.filter(invoice =>
            invoice.order_id.toString().includes(query) ||
            invoice.customer_name.toLowerCase().includes(query.toLowerCase()) ||
            invoice.customer_email.toLowerCase().includes(query.toLowerCase()) ||
            (invoice.phone && invoice.phone.includes(query)) ||
            (invoice.customer_address && invoice.customer_address.toLowerCase().includes(query.toLowerCase())) ||
            invoice.total_amount.toString().includes(query) ||
            format(new Date(invoice.created_at), 'dd/MM/yyyy').includes(query)
        );
        setFilteredInvoices(filtered);
    }

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

    function handleAction(orderId, newStatus) {
        Swal.fire({
            title: 'Bạn có chắc không?',
            text: `Bạn có muốn chuyển trạng thái sang '${newStatus}'?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có, đổi nó!',
            cancelButtonText: 'Không, hủy bỏ!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`http://localhost:3001/order/update/${orderId}`, { status: newStatus })
                    .then(() => {
                        Swal.fire(
                            'Cập nhật!',
                            `Trạng thái đơn hàng đã được chuyển sang '${newStatus}'.`,
                            'success'
                        );
                        fetchInvoices();
                    })
                    .catch(error => {
                        console.error('Error updating order status:', error);
                        Swal.fire(
                            'Lỗi!',
                            'Không cập nhật được trạng thái đơn hàng.',
                            'error'
                        );
                    });
            }
        });
    }

    return (
        <div className="invoice-container">
            <SearchBarAdmin
                placeholder="Tìm kiếm hóa đơn..."
                handleSearch={handleSearch}
            />
            <table className="invoice-table">
                <thead className="product-table-header">
                    <tr className="product-table-header-row">
                        <th className="product-table-header-cell" style={{ width: '10%' }}>Mã hóa đơn</th>
                        <th className="product-table-header-cell">Tên người đặt</th>
                        <th className="product-table-header-cell">Số điện thoại người đặt</th>
                        <th className="product-table-header-cell" style={{ width: '10%' }}>Địa chỉ giao hàng</th>
                        <th className="product-table-header-cell">Email người đặt</th>
                        <th className="product-table-header-cell">Sản phẩm</th>
                        <th className="product-table-header-cell" style={{ width: '10%' }}>Tổng tiền</th>
                        <th className="product-table-header-cell">Ngày đặt hàng</th>
                        <th className="product-table-header-cell">Trạng thái</th>
                        <th className="product-table-header-cell" style={{ width: '10%' }}>Thao tác</th>
                    </tr>
                </thead>
                <tbody className="product-table-body">
                    {filteredInvoices.map(invoice => (
                        <tr className="product-table-row" key={invoice.order_id}>
                            <td className="product-table-cell">{invoice.order_id}</td>
                            <td className="product-table-cell">{invoice.customer_name}</td>
                            <td className="product-table-cell">{invoice.phone}</td>
                            <td className="product-table-cell">{invoice.customer_address}</td>
                            <td className="product-table-cell">{invoice.customer_email}</td>
                            <td className="product-table-cell">
                                {Array.isArray(invoice.items) ? invoice.items.map(item => `${item.product_name} (x${item.quantity})`).join(', ') : 'No items'}
                            </td>
                            <td className="product-table-cell">{invoice.total_amount / 1000}.000 đ</td>
                            <td className="product-table-cell">{format(new Date(invoice.created_at), 'd/M/yyyy')}</td>
                            <td className="product-table-cell" style={getStatusStyle(invoice.order_status)}>
                                {invoice.order_status}
                            </td>
                            <td className="product-table-cell" style={{ textAlign: 'center' }}>
                                {invoice.order_status !== 'Đã hoàn thành' && invoice.order_status !== 'Đã hủy' ? (
                                    <>
                                        <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green', cursor: 'pointer' }}
                                            onClick={() => handleAction(invoice.order_id, 'Đã hoàn thành')} title="Hoàn thành" />
                                        <FontAwesomeIcon icon={faShippingFast} style={{ color: 'orange', cursor: 'pointer', marginLeft: '10px' }}
                                            onClick={() => handleAction(invoice.order_id, 'Đang giao hàng')} title="Đang giao hàng" />
                                        <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'red', cursor: 'pointer', marginLeft: '10px' }}
                                            onClick={() => handleAction(invoice.order_id, 'Đã hủy')} title="Hủy" />
                                    </>
                                ) : (
                                    <span style={{ color: getStatusStyle(invoice.order_status).color }}>
                                        {invoice.order_status}
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default InvoiceManagement;
