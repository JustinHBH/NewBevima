//AddNewProductForm
import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Swal from 'sweetalert2'; 
import '../AddNew/AddNew.css';

function AddNewProductForm({ handleCloseForm }) {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (event) => {
      event.preventDefault();

      if (!productName || !price || !quantity || !category) {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Vui lòng nhập đầy đủ thông tin vào các trường bắt buộc!',
        });
        return; 
      }

      const newProduct = {
        product_name: productName,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        category_name: category,
        description: description,
        image_url: imageUrl,
      };

      try {
        const response = await axios.post('http://localhost:3001/products/', newProduct);
        console.log('Product created successfully:', response.data);
        handleCloseForm();
        Swal.fire({
          icon: 'success',
          title: 'Thành công!',
          text: 'Sản phẩm đã được thêm thành công!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.reload(); 
        });
      } catch (error) {
        console.error('Error creating product:', error);
        Swal.fire({
          icon: 'error',
          title: 'Lỗi!',
          text: 'Đã xảy ra lỗi khi thêm sản phẩm. Vui lòng thử lại sau.',
        });
      }
    };
  
    return (
      <Modal
        isOpen={true}
        onRequestClose={handleCloseForm}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <span className="close" onClick={handleCloseForm}>&times;</span>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="productName">Tên sản phẩm:</label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="price">Giá sản phẩm:</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="quantity">Số lượng tồn:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div>
  <label htmlFor="category">Danh mục sản phẩm:</label>
  <select
    id="category"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    required
  >
    <option value="">CHỌN DANH MỤC</option>
    <option value="NƯỚC NGỌT">NƯỚC NGỌT</option>
    <option value="NƯỚC TĂNG LỰC">NƯỚC TĂNG LỰC</option>
    <option value="CÀ PHÊ">CÀ PHÊ</option>
    <option value="TRÀ">TRÀ</option>
    <option value="BIA">BIA</option>
    <option value="RƯỢU">RƯỢU</option>
    <option value="NƯỚC ÉP">NƯỚC ÉP</option>
    <option value="CHẾ PHẨM SỮA">CHẾ PHẨM SỮA</option>
    <option value="HÀNG KHÔ">HÀNG KHÔ</option>
  </select>
</div>



          <div>
            <label htmlFor="description">Mô tả sản phẩm:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="imageUrl">Đường link hình ảnh:</label>
            <input
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">Thêm mới</button>
            <button type="button" onClick={handleCloseForm}>Hủy</button>
          </div>
        </form>
      </Modal>
    );
}

export default AddNewProductForm;
