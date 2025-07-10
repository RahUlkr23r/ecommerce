
import SellerDrawerList from '../../Component/SellerDrawerList/SellerDrawerList';
import { Outlet } from 'react-router-dom';

const SellerDashboard = () => {
  return (
    // This is a very long Tailwind class string
    <div className="lg:flex lg:h-[90vh] bg-gradient-to-br from-[#e3f2f7] to-[#ffffff] min-h-screen">
      <SellerDrawerList />
      <main className="p-4 sm:p-6 md:p-8 lg:p-10 w-full lg:w-[calc(100%-16rem)] overflow-y-auto h-[calc(100vh-64px)]">
        <Outlet />
      </main>
    </div>
  );
};

export default SellerDashboard;