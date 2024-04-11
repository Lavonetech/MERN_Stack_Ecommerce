import React, { useReducer } from 'react';
import Header from './Header';
import ProductCard from './ProductCard';


const Home = () => {

  return (
    <div>
      <Header  />
      <img
          src="images/18899183.png"
          alt="Header Banner"
          style={{width:"100%", maxWidth: "100%",height:"auto",backgroundRepeat:"no-repeat" }}
        />

        <div className='col-md-12 image-carousel'>
          <div className='carousel-image'><img src="images/image1.jpeg" className='inner-image'/></div>
          <div className='carousel-image'><img src="images/image2.jpeg" className='inner-image'/></div>
          <div className='carousel-image'><img src="images/20423.jpg" className='inner-image'/></div>
          <div className='carousel-image'><img src="images/image6.jpg" className='inner-image'/></div>
          <div className='carousel-image'><img src="images/wired.jpg" className='inner-image'/></div>
          <div className='carousel-image'><img src="images/image-5.jpg" className='inner-image'/></div>
          
         
          
        </div>
      <ProductCard />
    </div>
  );
};

export default Home;
