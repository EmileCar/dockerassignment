import { useState, useEffect } from 'react';
import React from 'react';

const HeroSlider = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const images = ['main', 'second', 'third', 'fourth'];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000);

    return () => {
      clearInterval(interval);
    };
  }, [images.length]);

  return (
    <div className="hero__images--container layered-grid">
      {images.map((image, index) => (
        <div
          key={image}
          className={`hero__image ${image} ${index === activeImageIndex ? 'active' : ''}`}
        ></div>
      ))}
      <div className="hero__images--foreground"></div>
    </div>
  );
};

export default HeroSlider;
