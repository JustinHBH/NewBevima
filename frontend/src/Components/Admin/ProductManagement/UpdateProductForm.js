import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../AddNew/AddNew.css';

function UpdateProductForm({ handleCloseForm, productId }) { 
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/products/${productId}`);
                const productData = response.data;
               
                setProductName(productData.product_name);
                setPrice(productData.price.toString());
                setQuantity(productData.quantity.toString());
                setCategory(productData.category_name);
                setDescription(productData.description);
                setImageUrl(productData.image_url);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchProductData(); 
    }, [productId]); 

    const handleSubmit = async (event) => {
      event.preventDefault();

      const updatedProduct = {
        product_name: productName,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        category_name: category,
        description: description,
        image_url: imageUrl,
      };

      try {
        const response = await axios.put(`http://localhost:3001/products/${productId}`, updatedProduct);
        console.log('Product updated successfully:', response.data);
        handleCloseForm();
        Swal.fire({
          icon: 'success',
          title: 'Thành công!',
          text: 'Sản phẩm đã được cập nhật thành công!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.reload(); 
        });
      } catch (error) {
        console.error('Error updating product:', error);
        Swal.fire({
          icon: 'error',
          title: 'Lỗi!',
          text: 'Đã xảy ra lỗi khi cập nhật sản phẩm. Vui lòng thử lại sau.',
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
            />
          </div>
          <div>
            <label htmlFor="price">Giá sản phẩm:</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="quantity">Số lượng tồn:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="category">Danh mục sản phẩm:</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
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
            <button type="submit">Cập nhật</button>
            <button type="button" onClick={handleCloseForm}>Hủy</button>
          </div>
        </form>
      </Modal>
    );
}

export default UpdateProductForm;
