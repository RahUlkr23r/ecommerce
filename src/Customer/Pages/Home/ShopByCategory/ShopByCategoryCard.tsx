import React from 'react';
import { Link } from 'react-router-dom';
import { HomeCategory } from '../../../../tpyes/HomeCategoryType';

export const ShopByCategoryCard = ({ item }: { item: HomeCategory }) => {
  if (!item.categoryId) return null; // Skip if categoryId is missing

  return (
    <Link to={`/product/${item.categoryId}`}>
      <div className="flex flex-col items-center gap-4 sm:gap-6 cursor-pointer group transition-transform duration-200 ease-in-out mb-0">
        <div className="w-[120px] h-[120px] lg:w-[150px] lg:h-[150px] rounded-full p-[3px] sm:p-[4px] bg-gradient-to-tr from-pink-400 via-yellow-400 to-purple-500 group-hover:from-purple-400 group-hover:via-blue-500 group-hover:to-green-400 transition-all duration-700">
          <div className="w-full h-full rounded-full overflow-hidden bg-white shadow-md transform group-hover:scale-105 transition-transform duration-500 ease-in-out">
            <img
              src={item.image}
              alt={item.name || 'Shop Category'}
              loading="lazy"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
        <h1 className="text-base sm:text-lg font-semibold capitalize group-hover:text-pink-600 group-hover:tracking-wide group-hover:scale-105 transition-all duration-500">
          {item.name}
        </h1>
      </div>
    </Link>
  );
};
