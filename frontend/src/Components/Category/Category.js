// Category.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Category.css';
import milk_icon from './CategoryImages/milk.png';
import energydrink_icon from './CategoryImages/energydrink.png';
import softdrink_icon from './CategoryImages/softdrink.png';
import tea_icon from './CategoryImages/tea.png';
import coffee_icon from './CategoryImages/coffee.png';
import beer_icon from './CategoryImages/beer.png';
import wine_icon from './CategoryImages/wine.png';
import other_icon from './CategoryImages/other.png';
import juice_icon from './CategoryImages/juice.png';

const categories = [
  { id: 1, name: 'NƯỚC NGỌT', image: softdrink_icon },
  { id: 2, name: 'NƯỚC TĂNG LỰC', image: energydrink_icon },
  { id: 3, name: 'CÀ PHÊ', image: coffee_icon },
  { id: 4, name: 'TRÀ', image: tea_icon }, 
  { id: 5, name: 'BIA', image: beer_icon }, 
  { id: 6, name: 'RƯỢU', image: wine_icon },
  { id: 7, name: 'NƯỚC ÉP', image: juice_icon },
  { id: 8, name: 'CHẾ PHẨM SỮA', image: milk_icon },
  { id: 9, name: 'HÀNG KHÔ', image: other_icon },
];

const Category = () => {
  const navigate = useNavigate();

  const handleCategoryChange = (category) => {
    navigate(`/product-list?filters=${encodeURIComponent(category.name)}`);
  };

  return (
    <div>
      <h2 className='Category-title'>Danh mục sản phẩm</h2>
      <div className="category-container">
        <div className="category-list">
          {categories.map((category) => (
            <div key={category.id} className="category-item" onClick={() => handleCategoryChange(category)}>
              <img src={category.image} alt={category.name} className="category-image" />
              <p className="category-name">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
