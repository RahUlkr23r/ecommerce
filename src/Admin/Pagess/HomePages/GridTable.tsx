import React from 'react';
import HomeCategoryTable from './HomeCategoryTable';
import { useAppSelector, useAppDispatch } from '../../../State/Store';
import { createHomecategories } from '../../../State/Customers/customerSlice';
import { homeCategories } from '../../../data/HomeCategories';

const GridTable = () => {
  const dispatch = useAppDispatch();
  const { customer } = useAppSelector(store => store);

  const handleSeed = () => {
    dispatch(createHomecategories(homeCategories))
      .unwrap()
      .then(() => alert("✅ Categories added or already present!"))
      .catch(() => alert("❌ Already added or failed"));
  };

  return (
    <div className="p-4">
      {/* Seed Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleSeed}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
        >
          Seed Categories
        </button>
      </div>

      {/* Table Component */}
      <HomeCategoryTable data={customer.homePageData?.grid} />
    </div>
  );
};

export default GridTable;
