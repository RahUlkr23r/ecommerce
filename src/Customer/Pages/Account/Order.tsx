import React, { useEffect } from 'react';
import OrderItemCard from './OrderItemCard';
import { fetchUserOrderHistory } from '../../../State/Customers/OrderSlice';
import { useAppSelector, useAppDispatch } from '../../../State/Store';

const Order = () => {
  const dispatch = useAppDispatch();
  // Removed unused and incorrect 'auth' destructuring
  const { orders } = useAppSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchUserOrderHistory(localStorage.getItem('jwt') || ''));
  }, [dispatch]);

  return (
    <div className='text-sm min-h-screen'>
      <div className='pb-5'>
        <h1 className='font-semibold text-lg'>All Orders</h1>
        <p>From anytime</p>
      </div>

      <div className='space-y-4'>
        {orders.length === 0 ? (
          <div className='text-center text-gray-500'>No orders found</div>
        ) : (
          orders.map((order) =>
            order.orderItems.map((item) => (
              <OrderItemCard key={item.id} item={item} order={order} />
            ))
          )
        )}
      </div>
    </div>
  );
};

export default Order;
