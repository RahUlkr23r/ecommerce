import React from 'react';
import { Box } from '@mui/material';
import { menLevelTwo } from '../../../data/category/level two/menLevelTwo';
import { womenLevelTwo } from '../../../data/category/level two/womenLevelTwo';
import { electronicsLevelTwo } from '../../../data/category/level two/electronicsLevelTwo';
import { homeFurnitureLevelTwo } from '../../../data/category/level two/homeFurnitureLevelTwo';

import { menLevelThree } from '../../../data/category/level three/menLevelThree';
import { womenLevelThree } from '../../../data/category/level three/womenLevelThree';
import { electronicsLevelThree } from '../../../data/category/level three/electronicsLevelThree';
import { homeFurnitureLevelThree } from '../../../data/category/level three/homeFurnitureLevelThree';
import { useNavigate } from 'react-router-dom';

const categoryTwo = {
  men: menLevelTwo,
  women: womenLevelTwo,
  electronics: electronicsLevelTwo,
  home_furniture: homeFurnitureLevelTwo,
};

const categoryThree = {
  men: menLevelThree,
  women: womenLevelThree,
  electronics: electronicsLevelThree,
  home_furniture: homeFurnitureLevelThree,
};

interface CategorySheetProps {
  category: 'men' | 'women' | 'electronics' | 'home_furniture';
}

const CategorySheet: React.FC<CategorySheetProps> = ({ category }) => {
  const navigate= useNavigate()
  const levelTwoData = categoryTwo[category];
  const levelThreeData = categoryThree[category];

  // Color variants based on category
  const colorVariants = {
    men: 'bg-gradient-to-br from-blue-500 to-purple-600',
    women: 'bg-gradient-to-br from-pink-500 to-red-500',
    electronics: 'bg-gradient-to-br from-cyan-500 to-blue-600',
    home_furniture: 'bg-gradient-to-br from-amber-500 to-orange-600',
  };

  return (
    <Box 
      className={`shadow-2xl p-8 max-h-[80vh] overflow-y-auto w-[1000px]  ${colorVariants[category]} text-white`}
      sx={{
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(255,255,255,0.3)',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: 'rgba(255,255,255,0.5)',
        }
      }}
    >
      <div className="flex flex-wrap gap-10">
        {levelTwoData?.map((level2) => (
          <div
            key={level2.categoryId}
            className="group hover:bg-white/10 p-5 rounded-xl transition-all duration-300 ease-out backdrop-blur-sm hover:backdrop-blur-none w-[200px]"
          >
            <p className="text-white font-bold text-lg mb-5 pb-2 border-b border-white/20 group-hover:border-white/40 transition-colors duration-300">
              {level2.name}
            </p>
            <ul className="space-y-4">
              {levelThreeData
                .filter((lvl3) => lvl3.parentCategoryId === level2.categoryId)
                .map((lvl3) => (
                  <li
                  onClick={()=>navigate("/product/"+lvl3.categoryId)}
                    key={lvl3.categoryId}
                    className="text-white/70 hover:text-white font-medium text-sm transition-all duration-200 hover:pl-2 hover:scale-105 cursor-pointer flex items-center"
                  >
                    <span className="w-2 h-2 bg-white/50 rounded-full mr-2 group-hover:bg-white transition-colors duration-300"></span>
                    {lvl3.name}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
    </Box>
  );
};

export default CategorySheet;