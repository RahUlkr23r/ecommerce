import { Divider } from '@mui/material'


const ProfileFieldCard = ({key,value}:{key:string , value:string}) => {
  return (
    <div className='p-5 flex item-center bg-slate-50'>
<p className='w-20 lg:w-36 pr-5'>{key}</p>
<Divider orientation='vertical' flexItem/>
<p className='pl-4 lg:pl-10 fonts-semiBold lg:text-lg'>{value}</p>
    </div>
  )
}

export default ProfileFieldCard;