import { Button } from '@mui/material'
import  { useState } from 'react'
import DealTable from './DealTable'

import DealCategoryTable from './DealCategoryTable'
import CreateDealTable from './CreateDealTable'

const tabs=[
"Deals",
"Category",
"Create Deal"

]
const Deal = () => {
  const[activeTab, setActiveTab]=useState("Deal")
  return (
    <div>
        <div className='flex gap-4'>
          {tabs.map((item) => <Button onClick={()=>setActiveTab(item)} variant={activeTab==item?"contained":"outlined"} >{item}</Button>)}
        </div>
        <div className=''>
          {activeTab=="Deals"?<DealTable/>:activeTab=="Category"?<DealCategoryTable/>:
          <div> <CreateDealTable/></div>
          }

        </div>
    </div>
  )
}

export default Deal