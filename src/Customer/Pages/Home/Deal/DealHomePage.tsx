import React from 'react';
import Slider from "react-slick";
import DealCart from './DealCart';
import { useAppSelector } from '../../../../State/Store';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DealHomePage: React.FC = () => {
  const { customer } = useAppSelector(store => store);

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 5 }
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <section className="py-10 px-0 sm:px-2 lg:px-4 bg-gray-50">
      <div className="mb-0 text-center">
        
      
      </div>

      {customer?.homePageData?.deals?.length > 0 ? (
        <Slider {...settings}>
          {customer.homePageData.deals.map((item, index) => (
            <div key={index} className="px-2">
              <DealCart item={item} />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="text-center text-gray-500">
          No deals available at the moment.
        </div>
      )}
    </section>
  );
};

export default DealHomePage;
