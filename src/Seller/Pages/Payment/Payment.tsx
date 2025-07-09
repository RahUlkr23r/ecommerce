import { Button, Card, Divider } from '@mui/material';
import React, { useEffect } from 'react';
import TransactionTable from './TransactionTable';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { fetchSellerTransactions } from '../../../State/Sellers/transactionSlice';
import dayjs from 'dayjs';

const Payment = () => {
  const dispatch = useAppDispatch();
  const { transactions, loading } = useAppSelector((store) => store.transactions);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt') || '';
    dispatch(fetchSellerTransactions(jwt));
  }, [dispatch]);

  // ✅ Calculate total earnings from transactions
  const totalEarning = transactions.reduce((sum: number, txn: any) => {
    return sum + parseFloat(txn.order?.totalSellingPrice || 0);
  }, 0);

  // ✅ Get the most recent transaction date
  const lastPaymentDate = transactions.length
    ? dayjs(
        transactions
          .map((txn) => new Date(txn.date))
          .sort((a, b) => b.getTime() - a.getTime())[0]
      ).format('DD MMM YYYY')
    : 'No transactions';

  return (
    <div className="space-y-5">
      <Card className="rounded-md space-y-4 p-5">
        <h1 className="text-gray-600">Total Earning</h1>
        <h1 className="text-gray-600 font-bold text-xl pb-1">
          ₹ {totalEarning.toFixed(2)}
        </h1>
        <Divider />
        <p className="text-gray-600 font-medium pt-1">
          Last Payment: <strong>{lastPaymentDate}</strong>
        </p>
      </Card>

      <div className="pt-20 space-y-3">
        <Button variant="contained">Transactions</Button>
        <TransactionTable />
      </div>
    </div>
  );
};

export default Payment;
