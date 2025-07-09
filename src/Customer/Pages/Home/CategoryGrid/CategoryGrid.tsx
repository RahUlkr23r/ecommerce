import React from 'react';
import { useAppSelector } from '../../../../State/Store';
import { useNavigate } from 'react-router-dom';

const CategoryGrid = () => {
  const { customer } = useAppSelector((store) => store);
  const gridItems = customer?.homePageData?.grid?.slice(0, 6) || [];
  const navigate = useNavigate();

  const handleCategoryClick = (item) => {
    // Navigate to category page or perform other action
    if (item.categoryId) {
      navigate(`/product/${item.categoryId }`);
    }
  };

  return (
    <div className="px-0 sm:px-6 lg:px-0 py-4 sm:py-16 lg:py-5 bg-gradient-to-b from-gray-300to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            <span className="relative inline-block">
              <span className="absolute bottom-1 left-0 w-full h-1 bg-green-100/60 z-0"></span>
            </span>
          </h2>
          <p className="mt-0 text-lg text-gray-600 max-w-2xl mx-auto">

          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridItems.map((item) => (
            <div
              key={item.categoryId || `${item.section}-${item.name}`}
              className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer transition-all duration-300 hover:shadow-xl"
              onClick={() => handleCategoryClick(item)}
            >
              <div className="aspect-w-4 aspect-h-3 w-full h-full">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  loading="lazy"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6 transition-all duration-500 group-hover:from-black/80">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-xl sm:text-2xl font-bold mb-2 drop-shadow-md">
                    {item.name}
                  </h3>
                  <button 
                    className="mt-2 inline-flex items-center bg-white text-gray-900 text-sm font-medium px-4 py-2 rounded-full hover:bg-gray-100 transition-all duration-300 opacity-0 group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCategoryClick(item);
                    }}
                  >
                    Shop Now
                    <svg 
                      className="ml-1.5 w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Hover overlay effect */}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;