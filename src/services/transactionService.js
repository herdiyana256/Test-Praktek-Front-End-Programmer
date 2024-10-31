import axios from 'axios';

export const getTransactionHistory = async () => {
  return await axios.get('/api/transactions/history');
};
