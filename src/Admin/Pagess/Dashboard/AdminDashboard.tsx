import React, { useEffect } from 'react';
import AdminDrawerList from '../../Component/AdminDrawerList';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { fetchAllHomeCategories } from '../../../State/Admins/adminSlice';

const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { auth } = useAppSelector((state) => state);

  useEffect(() => {
    if (!auth || (auth.user && String(auth.user.role) !== 'ADMIN')) {
      navigate('/unauthorized');
    } else {
      dispatch(fetchAllHomeCategories());
    }
  }, [dispatch, auth, navigate]);

  return (
    <div className="lg:flex lg:h-[90vh]">
      <AdminDrawerList />
      <main className="p-4 sm:p-6 md:p-8 lg:p-10 w-full lg:w-[calc(100%-16rem)] overflow-y-auto h-[calc(100vh-64px)]">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
