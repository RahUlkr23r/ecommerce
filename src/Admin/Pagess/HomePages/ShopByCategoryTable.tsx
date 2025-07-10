
import HomeCategoryTable from './HomeCategoryTable'
import { useAppSelector } from '../../../State/Store'

const ShopByCategoryTable = () => {
  const {customer}=useAppSelector(store => store)
  return (
    <div>
        <HomeCategoryTable data={customer.homePageData?.shopByCategories}/>
    </div>
  )
}

export default ShopByCategoryTable