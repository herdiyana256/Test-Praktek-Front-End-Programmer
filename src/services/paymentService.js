import axios from 'axios';

export const makePayment = async (amount) => {
  return await axios.post('/api/payments', { amount });
};
