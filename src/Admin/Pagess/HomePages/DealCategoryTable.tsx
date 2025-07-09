
import HomeCategoryTable from './HomeCategoryTable';
import { useAppSelector } from '../../../State/Store';
import { HomeCategory } from '../../../tpyes/HomeCategoryType';
import { Deals } from '../../../tpyes/dealType';

const DealCategoryTable = () => {
  const { customer } = useAppSelector((store) => store);
  const dealCategories: Deals[] = customer.homePageData?.deals || [];

  const mappedDealCategories: HomeCategory[] = dealCategories.map((deal) => ({
    categoryId: deal.category?.categoryId || deal.id?.toString() || '',
    id: deal.id,
    section: deal.section || '',
    name: deal.name || '',  
    image: deal.category?.image || '',
    parentCategoryId: deal.category.parentCategoryId || '',
  }));

  return (
    <div>
      <HomeCategoryTable data={mappedDealCategories} />
    </div>

  );
};

export default DealCategoryTable;
