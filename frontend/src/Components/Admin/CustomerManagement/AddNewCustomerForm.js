// import React, { useState } from 'react';
// import Modal from 'react-modal';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import '../AddNew/AddNew.css'; // Assuming the CSS is applicable here too

// function AddNewCustomerForm({ handleCloseForm }) {
//   const [customerName, setCustomerName] = useState('');
//   const [customerEmail, setCustomerEmail] = useState('');
//   const [customerPhone, setCustomerPhone] = useState('');
//   const [customerAddress, setCustomerAddress] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!customerName || !customerEmail) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Oops...',
//         text: 'Vui lòng nhập đầy đủ thông tin bắt buộc!',
//       });
//       return;
//     }

//     const newCustomer = {
//       name: customerName,
//       email: customerEmail,
//       phone: customerPhone,
//       address: customerAddress,
//     };

//     try {
//       const response = await axios.post('http://localhost:3001/user/customer', newCustomer);
//       console.log('Customer added successfully:', response.data);
//       handleCloseForm();
//       Swal.fire({
//         icon: 'success',
//         title: 'Thành công!',
//         text: 'Khách hàng đã được thêm thành công!',
//         showConfirmButton: false,
//         timer: 1500
//       }).then(() => {
//         window.location.reload();
//       });
//     } catch (error) {
//       console.error('Error adding customer:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Lỗi!',
//         text: 'Đã xảy ra lỗi khi thêm khách hàng. Vui lòng thử lại sau.',
//       });
//     }
//   };

//   return (
//     <Modal
//       isOpen={true}
//       onRequestClose={handleCloseForm}
//       className="modal-content"
//       overlayClassName="modal-overlay"
//     >
//       <span className="close" onClick={handleCloseForm}>&times;</span>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="customerName">Tên khách hàng:</label>
//           <input
//             type="text"
//             id="customerName"
//             value={customerName}
//             onChange={(e) => setCustomerName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="customerEmail">Email:</label>
//           <input
//             type="email"
//             id="customerEmail"
//             value={customerEmail}
//             onChange={(e) => setCustomerEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="customerPhone">Số điện thoại:</label>
//           <input
//             type="text"
//             id="customerPhone"
//             value={customerPhone}
//             onChange={(e) => setCustomerPhone(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="customerAddress">Địa chỉ:</label>
//           <input
//             type="text"
//             id="customerAddress"
//             value={customerAddress}
//             onChange={(e) => setCustomerAddress(e.target.value)}
//           />
//         </div>
//         <div>
//           <button type="submit">Thêm mới</button>
//           <button type="button" onClick={handleCloseForm}>Hủy</button>
//         </div>
//       </form>
//     </Modal>
//   );
// }

// export default AddNewCustomerForm;
