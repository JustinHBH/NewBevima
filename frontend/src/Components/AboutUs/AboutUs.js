// AboutUs.js
import React from 'react';
import './AboutUs.css';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h2>Về Chúng Tôi</h2>
      <p>
        Bevima, không chỉ là nơi bạn tìm thấy những đồ uống tuyệt vời, 
        mà còn là chuyến phiêu lưu qua hương vị, câu chuyện về sự 
        sáng tạo và đam mê cho việc mang lại trải nghiệm thưởng thức
        các thức uống đặc biệt 
      </p>
      <Link to="/MainAboutUs" className="view-more-btn">
            Xem Thêm
          </Link>
    </div>
  );
};

export default AboutUs;
