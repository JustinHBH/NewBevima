//Home.js
import React from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import Banner from '../../Components/Banner/Banner';
import Category from '../../Components/Category/Category';
import AboutUs from '../../Components/AboutUs/AboutUs';
import "./Home.css";

const Home = () => {
  return (
    <div>
      <NavBar />
      <main>
        <Banner />
      
        <Category/>
        <br/>
        <AboutUs />
      </main>
    </div>
  );
};

export default Home;
