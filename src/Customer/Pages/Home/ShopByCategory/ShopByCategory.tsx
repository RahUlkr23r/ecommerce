import React from 'react';
import { ShopByCategoryCard } from './ShopByCategoryCard';
import { useAppSelector } from '../../../../State/Store';

function ShopByCategory() {
  const { customer } = useAppSelector((store) => store);
  const categories = customer?.homePageData?.shopByCategories?.slice(0, 15) || [];

  return (
    <div className="py-10 px-1 sm:px-6 lg:px-10">
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-10 text-gray-800">
        Shop by Category
      </h2>

      {/* Responsive Grid for Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 place-items-center">
        {categories.map((item) => (
          <ShopByCategoryCard key={item.categoryId || item.name} item={item} />
        ))}
      </div>
    </div>
  );
}

export default ShopByCategory;
