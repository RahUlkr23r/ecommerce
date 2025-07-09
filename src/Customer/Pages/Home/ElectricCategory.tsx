import ElectricComponentCard from './ElectricComponentCard';
import { useAppSelector } from '../../../State/Store';

const ElectricCategory = () => {
  const electricCategories = useAppSelector(
    (store) => store.customer.homePageData?.electricCategories
  );

  if (!electricCategories || electricCategories.length === 0) {
    return null; // or show a fallback UI
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-10 gap-4 px-4 sm:px-6 lg:px-24 py-6 mt-8 ml-1">
      {electricCategories.slice(3, 13).map((item, index) => (
        <ElectricComponentCard key={item.id || index} item={item} />
      ))}
    </div>
  );
};

export default ElectricCategory;
