import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function ImageCarousel({ images }) {
  return (
    <Carousel>
      {images.map((image, index) => (
        <div key={index}>
          <img src={URL.createObjectURL(image)} alt={`Image ${index}`} />
        </div>
      ))}
    </Carousel>
  );
}

export default ImageCarousel;