import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import SearchBarAdmin from '../SearchBarAdmin/SearchBarAdmin';
import AddNewProductForm from './AddNewProductForm';
import UpdateProductForm from './UpdateProductForm';
import './ProductManagement.css'


function truncateString(str, num) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
}

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false); 
  const [selectedProductId, setSelectedProductId] = useState(null); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (query) => {
    const filtered = products.filter((product) =>
      product.product_id.toString().includes(query) ||
      product.product_name.toLowerCase().includes(query.toLowerCase()) ||
      product.category_name.toLowerCase().includes(query.toLowerCase()) ||
      product.price.toString().includes(query) ||
      product.quantity.toString().includes(query) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleShowAddForm = () => {
    setShowAddForm(true);
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
  };

  const handleUpdateProduct = (productId) => {
    setSelectedProductId(productId); 
    setShowUpdateForm(true); 
  };

  const handleDeleteProduct = async (productId) => {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
      text: 'Hành động này không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy bỏ'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3001/products/${productId}`);
          const updatedProducts = products.filter(product => product.product_id !== productId);
          setProducts(updatedProducts);
          setFilteredProducts(updatedProducts);
          Swal.fire(
            'Xóa thành công!',
            'Sản phẩm đã được xóa.',
            'success'
          );
        } catch (error) {
          console.error('Error deleting product:', error);
          Swal.fire(
            'Lỗi!',
            'Đã có lỗi xảy ra khi xóa sản phẩm.',
            'error'
          );
        }
      }
    });
  };

  return (
    <div>
      <div className='search-and-add'>
        <SearchBarAdmin
          placeholder="Tìm kiếm sản phẩm..."
          handleSearch={handleSearch}
        />
        <button className='add-new-button'onClick={handleShowAddForm}>+ Tạo sản phẩm mới</button>
      </div>
      {showUpdateForm && <UpdateProductForm handleCloseForm={() => setShowUpdateForm(false)} productId={selectedProductId} />}
      {showAddForm && <AddNewProductForm handleCloseForm={handleCloseAddForm} />}
      <table className="product-table">
        <thead className="product-table-header">
          <tr className="product-table-header-row">
            <th className="product-table-header-cell">Mã sản phẩm</th>
            <th className="product-table-header-cell">Tên sản phẩm</th>
            <th className="product-table-header-cell">Loại sản phẩm</th>
            <th className="product-table-header-cell">Giá sản phẩm</th>
            <th className="product-table-header-cell">Số lượng tồn</th>
            <th className="product-table-header-cell">Hình ảnh</th>
            <th className="product-table-header-cell">Diễn tả</th>
            <th className="product-table-header-cell">Thao tác</th>
          </tr>
        </thead>
        <tbody className="product-table-body">
          {filteredProducts.map((product) => (
            <tr className="product-table-row" key={product.product_id}>
              <td className="product-table-cell">{product.product_id}</td>
              <td className="product-table-cell">{product.product_name}</td>
              <td className="product-table-cell">{product.category_name}</td>
              <td className="product-table-cell">{(product.price / 1000).toFixed(0)}.000 ₫</td>
              <td className="product-table-cell">{product.quantity}</td>
              <td className="product-table-cell">
                <img src={product.image_url}
                  alt={product.product_name}
                  className="image" />
              </td>
              <td className="product-table-cell"
                title={product.description}>
                {truncateString(product.description, 50)}
              </td>
              <td className="product-table-cell">
                <FontAwesomeIcon 
                icon={faEdit} 
                className="edit-icon"
                onClick={() => handleUpdateProduct(product.product_id)}/>

                <FontAwesomeIcon
                  icon={faTrash}
                  className="delete-icon"
                  onClick={() => handleDeleteProduct(product.product_id)}
                />

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductManagement;
