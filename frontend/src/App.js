import React, { useEffect } from 'react'; // Make sure to import useEffect
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './Pages/Home/Home.js';
import Header from './Components/Header/Header.js';
import Footer from './Components/Footer/Footer.js';
import NavBar from './Components/NavBar/NavBar.js';
import Login from './Pages/Auth/Login/Login.js';
import Register from './Pages/Auth/Register/Register.js';
import ProductDetail from './Components/ProductDetail/ProductDetail.js';
import Profile from './Pages/Profile/Profile.js';
import ProductList from './Pages/ProductList/ProductList.js';
import MainAboutUs from './Pages/MainAboutUs/MainAboutUs.js';
import Favourite from './Pages/Favourite/Favourite.js';
import Cart from './Pages/cart/Cart.js';
import Checkout from './Pages/cart/Checkout.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin from './Pages/Admin/Admin.js';
import OrderHistory from './Pages/Order_history/Order_history.js';
import ForgotPassword from './Pages/Auth/ForgotPassword/ForgotPassword.js';
import AdminLogin from './Pages/Admin/AdminLogin.js';
import { useDispatch } from 'react-redux';
import { loginSuccess } from './Reducers/auth/authActions';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      dispatch(loginSuccess(user.username)); 
    }
  }, [dispatch]);

  function FooterWithCondition() {
    let location = useLocation();
    if (location.pathname !== "/product-list") {
      return <Footer />;
    }
    return null;
  }

  return (
    <div className="app-container">
      <Router>
        <Header />
        <NavBar />
        <ToastContainer />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/product-list" element={<ProductList />} />
            <Route path="/MainAboutUs" element={<MainAboutUs />} />
            <Route path="/favourite" element={<Favourite />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/admin/*" element={<Admin />} />
            <Route path="/admin-login" element={<AdminLogin />} />
          </Routes>
        </div>
        <FooterWithCondition />
      </Router>
    </div>
  );
}

export default App;
