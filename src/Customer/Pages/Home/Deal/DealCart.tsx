import { Link } from "react-router-dom";
import { Deals } from "../../../../tpyes/dealType";

interface DealCartProps {
  item: Deals;
}

const DealCart: React.FC<DealCartProps> = ({ item }) => {
  return (
    <Link
      to={`/product/${item.category.categoryId}`}
      className="no-underline"
      aria-label={`Shop ${item.category.name} with ${item.discount}% off`}
    >
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-300 w-full max-w-[160px] mx-auto p-3 text-center group cursor-pointer">
        {/* Image Box */}
        <div className="h-28 sm:h-32 flex items-center justify-center bg-gray-50 rounded-md overflow-hidden">
          <img
            src={item.category.image}
            alt={item.category.name}
            className="h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Text Content */}
        <div className="mt-2 space-y-1">
          <p className="text-sm font-medium text-gray-800 truncate">
            {item.category.name}
          </p>
          <p className="text-lg font-bold text-red-600">
            {item.discount}% OFF
          </p>
          <p className="text-blue-600 text-sm font-medium hover:underline">
            Shop now
          </p>
        </div>
      </div>
    </Link>
  );
};

export default DealCart;
