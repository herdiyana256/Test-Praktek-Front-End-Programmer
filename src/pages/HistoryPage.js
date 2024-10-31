import React, { useEffect, useState } from 'react';
import { getTransactionHistory } from '../services/transactionService'; // Import fungsi dari service
import { useDispatch, useSelector } from 'react-redux';
import { setTransactionHistory } from '../store/transactionSlice';

const HistoryPage = () => {
  const [loading, setLoading] = useState(true);
  const transactionHistory = useSelector((state) => state.transaction.history);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await getTransactionHistory();
        dispatch(setTransactionHistory(response.data));
      } catch (error) {
        console.error('Failed to fetch transaction history', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Transaction History</h2>
      <ul>
        {transactionHistory.map((transaction) => (
          <li key={transaction.id}>{transaction.description}: {transaction.amount}</li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryPage;
