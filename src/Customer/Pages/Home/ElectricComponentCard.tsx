import React from 'react';
import { HomeCategory } from '../../../tpyes/HomeCategoryType';
import { Link } from 'react-router-dom';

const ElectricComponentCard = ({ item }: { item: HomeCategory }) => {
  return (
       <Link to={`/product/${item.categoryId}`}>  
    <div className="flex flex-col items-center space-y-2 p-2 hover:shadow-md transition-shadow duration-200 rounded-md cursor-pointer">
      <img
        className="object-contain h-16 w-16"
        src={item.image}
        alt={item.name}
        loading="lazy"
      />
      <h1 className="font-semibold text-sm text-center">{item.name}</h1>
    </div>
     </Link>
  );
};

export default ElectricComponentCard;
