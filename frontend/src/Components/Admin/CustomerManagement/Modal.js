import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: '20%', left: '30%', right: '30%', backgroundColor: 'white', padding: '20px', zIndex: 1000 }}>
      {children}
      <button onClick={onClose}>Đóng</button>
    </div>
  );
};

export default Modal;
