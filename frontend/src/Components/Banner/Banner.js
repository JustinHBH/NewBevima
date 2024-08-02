import React, { useState, useEffect, useCallback } from 'react';
import './Banner.css';
import sting from './images/sting.jpg';
import whey from './images/whey.jpg';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const showSlides = useCallback((n) => {
    let newSlideIndex = n;
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    if (n >= slides.length) {
      newSlideIndex = 0;
    } else if (n < 0) {
      newSlideIndex = slides.length - 1;
    }

    setCurrentSlide(newSlideIndex);

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[newSlideIndex].style.display = "block";
    dots[newSlideIndex].className += " active";
  }, [setCurrentSlide]);

  const plusSlides = useCallback((n) => {
    showSlides(currentSlide + n);
  }, [currentSlide, showSlides]);

  const currentSlideHandler = useCallback((n) => {
    showSlides(n - 1);
  }, [showSlides]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      plusSlides(1);
    }, 3500);

    return () => clearInterval(intervalId);
  }, [currentSlide, plusSlides]);

  return (
    <div className="slideshow-container">
      {/* Slide sting */}
      <div className="mySlides fade">
        <img src={sting} style={{ width: "100%" }} alt="Slide 1" />
      </div>

      {/* Slide whey */}
      <div className="mySlides fade">
        <img src={whey} style={{ width: "100%" }} alt="Slide 2" />
      </div>

    
      <button className="prev" onClick={() => plusSlides(-1)}>&#10094;</button>
      <button className="next" onClick={() => plusSlides(1)}>&#10095;</button>

    
      <div style={{ textAlign: "center" }}>
        <span className="dot" onClick={() => currentSlideHandler(1)}></span>
        <span className="dot" onClick={() => currentSlideHandler(2)}></span>
      </div>
    </div>
  );
};

export default Banner;
