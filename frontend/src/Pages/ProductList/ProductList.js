import React, { useState, useEffect } from 'react';
import './ProductList.css';
import ProductCard from '../../Components/ProductCard/ProductCard';
import { useLocation, useNavigate } from 'react-router-dom';
import Checkbox from './checkbox'; 
import SearchBar from './Search';
import axios from 'axios';

const ProductList = () => {
  const [favouriteProducts, setFavourites] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState({});
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000000);
  const [sortOption, setSortOption] = useState('price-low-to-high');
  const [visibleProductCount, setVisibleProductCount] = useState(30);
  const [isUserChangingMinPrice, setIsUserChangingMinPrice] = useState(false);
  const [isUserChangingMaxPrice, setIsUserChangingMaxPrice] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

   useEffect(() => {
    const params = new URLSearchParams(location.search);
    const minPriceParam = params.get('minPrice');
    const maxPriceParam = params.get('maxPrice');
    const sortOptionParam = params.get('sortOption');
    const selectedFiltersParam = params.get('filters');

    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3001/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    async function fetchCategories() {
      try {
        const response = await axios.get('http://localhost:3001/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    fetchData();
    fetchCategories();

    setSelectedCategories(
      selectedFiltersParam
        ? selectedFiltersParam.split(',').reduce((acc, curr) => {
            acc[curr] = true;
            return acc;
          }, {})
        : {}
    );

    if (!isUserChangingMinPrice) {
      setMinPrice(minPriceParam ? parseInt(minPriceParam, 10) : 0);
    }

    if (!isUserChangingMaxPrice) {
      setMaxPrice(maxPriceParam ? parseInt(maxPriceParam, 10) : 5000000);
    }

    setSortOption(sortOptionParam || 'price-low-to-high');
  }, [location.search, isUserChangingMinPrice, isUserChangingMaxPrice]);

  useEffect(() => {
    const updatedFilters = Object.keys(selectedCategories)
      .filter((cat) => selectedCategories[cat])
      .join(',');
    const params = new URLSearchParams(location.search);
    params.set('filters', updatedFilters);
    navigate(`?${params.toString()}`);
  }, [selectedCategories, location.search, navigate]);

  const handleAddToCart = (productId) => {
    console.log(`Sản phẩm ${productId} đã được thêm vào giỏ hàng`);
  };

  const handleAddToFavorites = (productId) => {
    const productToAdd = products.find((p) => p.id === productId);
    setFavourites((prevFavourites) => [...prevFavourites, productToAdd]);
  };

  const handleRemoveFromFavorites = (productId) => {
    console.log('Removing product with id:', productId);
    setFavourites((prevFavourites) =>
      prevFavourites.filter((p) => p.id !== parseInt(productId, 10))
    );
  };

  const handleCheckboxChange = (category_name) => {
    setSelectedCategories(prev => {
        const updatedCategories = { ...prev, [category_name]: !prev[category_name] };
        console.log('Updated categories:', updatedCategories);
        return updatedCategories;
    });
};

  const handleSortOptionChange = (option) => {
    const params = new URLSearchParams(location.search);
    params.set('sortOption', option);
    navigate(`?${params.toString()}`);
    setSortOption(option);
  };

  const handleMinPriceChange = (event) => {
    const rawValue = event.target.value;
    const value = rawValue.trim() !== '' ? parseInt(rawValue.replace(/[^\d]/g, ''), 10) : 0;
    setMinPrice(value);
    setIsUserChangingMinPrice(true);
  };

  const handleMaxPriceChange = (event) => {
    const rawValue = event.target.value;
    const value = rawValue.trim() !== '' ? parseInt(rawValue.replace(/[^\d]/g, ''), 10) : 0;
    setMaxPrice(value);
    setIsUserChangingMaxPrice(true);
  };

  const handleLoadMore = () => {
    setVisibleProductCount((prevCount) => prevCount + 30);
  };

  const sortProducts = (a, b) => {
    if (sortOption === 'price-low-to-high') {
      return a.price - b.price;
    } else if (sortOption === 'price-high-to-low') {
      return b.price - a.price;
    }
    return 0;
  };

  const filterProductsByCategory = (products) => {
    console.log('Selected Categories:', selectedCategories); 
    if (Object.keys(selectedCategories).length === 0) return products;
    return products.filter(product => {
        console.log('Product Category:', product.category_name); 
        return selectedCategories[product.category_name];
    });
};


const filteredProducts = products
    .filter(product => 
        (Object.keys(selectedCategories).length === 0 || selectedCategories[product.category_name]) &&
        product.price >= minPrice &&
        product.price <= maxPrice &&
        (!searchQuery || product.product_name.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort(sortProducts)
    .slice(0, visibleProductCount);


  return (
    <>
      <div className="product-list-container">
        <div className="sidebar">
          <div>
            <label>
              Giá tối thiểu:{' '}
              <input type="text" value={minPrice} onChange={handleMinPriceChange} />
            </label>
            <label>
              Giá tối đa:{' '}
              <input type="text" value={maxPrice} onChange={handleMaxPriceChange} />
            </label>
            <div className="checkbox-container">
              {categories.map((category) => (
                <Checkbox
                  key={category.category_id}
                  id={category.category_id}
                  title={category.category_name}
                  name={category.category_name}
                  handleChange={() => handleCheckboxChange(category.category_name)}
                  checked={selectedCategories[category.category_name] || false}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="product-list">
          <div className="search-and-sort-container">
            <div>
              <SearchBar
                setSearchQuery={setSearchQuery}
                Data={products}
                Placeholder="Vui lòng nhập tên sản phẩm"
              />
            </div>
            <div className="sort-by">
              <span>Lọc theo:</span>
              <select onChange={(e) => handleSortOptionChange(e.target.value)}>
                <option value="price-low-to-high">--Giá Tăng Dần--</option>
                <option value="price-high-to-low">--Giá Giảm Dần--</option>
              </select>
            </div>
          </div>
          <div className="product-cards-container">
          {
  filteredProducts.length > 0 ? (
    <div className="product-cards">
     {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            favouriteProducts={favouriteProducts}
            product={product}
            onAddToCart={handleAddToCart}
            onAddToFavorites={handleAddToFavorites}
            onRemoveFromFavorites={handleRemoveFromFavorites}
            isFavorite={product.id && favouriteProducts.some((p) => p.id === product.id)}
            filterByCategory={filterProductsByCategory}
            selectedCategory={selectedCategories[product.category_name]}
            handleCheckboxChange={handleCheckboxChange}
          />
        ))
      }
    </div>
  ) : (
    <div className="no-products-message">Không tìm thấy sản phẩm nào phù hợp.</div>
  )
}

            {visibleProductCount < products.length && products.length > 0 && (
              <button className="load-more-button" onClick={handleLoadMore}>
                Xem thêm sản phẩm
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
