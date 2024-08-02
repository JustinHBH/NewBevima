// MainAboutUs.js

import React from "react";
import './MainAboutUs.css';
import Lounge from './MainAboutUsImage/lounge.jpg';
import Quality from './MainAboutUsImage/quality_of_products.jpg'
import Value from './MainAboutUsImage/value.jpg';


const MainAboutUs = () => {
  return (
    <div>
    
      <div className="MainAboutUs-container">
        <h2 className="MainAboutUs-title" >About Us</h2>
        
        <div className="table-container">
          <table>
            <tbody>
              <tr className="row1">
                <td className="content1">
                <img src={Lounge} style={{ width: "100%" }} alt="Lounge" />
                </td>
                <td className="content2"> 
                <p className="slogan">Live well, drink well</p>
                </td>
              </tr>
              <tr>
                <td className="content3" colSpan="2"><p>
                  Chào mừng bạn đến với Bevima - nơi cung cấp những thức uống tuyệt vời nhất!
                  </p>
                  <p>
                  Bevima là một trang web chuyên cung cấp các loại thức uống phong phú và đa dạng.
                  Chúng tôi cam kết mang đến cho khách hàng những trải nghiệm thưởng thức thú vị
                  và độc đáo thông qua các sản phẩm chất lượng cao và dịch vụ tận tâm.
                 </p>
                 <p>
                  Hãy cùng chúng tôi khám phá thế giới của hương vị và sự sáng tạo trong từng giọt thức uống!
                 </p>
              </td>
              </tr>
              <tr>
                <td className="content4">
                <img src={Quality} style={{ width: "100%" }} alt="Quality" />
                <h2>Chất Lượng Của Sản Phẩm</h2>
                <p>Bevima tự hào là địa chỉ tin cậy cho những người yêu thưởng thức hương vị và chất lượng tuyệt vời trong thế giới nước uống. Chúng tôi cam kết mang đến cho khách hàng những sản phẩm tinh tế và chất lượng cao nhất, từ những chai nước ngọt độc đáo đến những hạt cà phê hảo hạng và các loại thảo mộc trân trọng.</p>
                </td>
                <td className="content5">
                <img src={Value} style={{ width: "100%" }} alt="Value" />
                <h2>Ý nghĩa của khẩu hiệu</h2>
                <p>Slogan của chúng tôi, 'Live well, drink well,' không chỉ là một khẩu hiệu, mà còn là triết lý sống đẹp và thưởng thức cuộc sống mỗi ngày. Chúng tôi tin rằng việc sống một cuộc sống khỏe mạnh và hạnh phúc bắt nguồn từ những lựa chọn thông minh và tận hưởng những điều tuyệt vời nhất. Cuộc sống chỉ thực sự đầy đủ khi chúng ta sống đẹp và thưởng thức mọi khoảnh khắc, và chúng tôi tận tụy hướng dẫn mọi người theo đuổi mục tiêu này qua slogan 'Live well, drink well'</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>      
      </div>
    </div>
  );
};

export default MainAboutUs;
