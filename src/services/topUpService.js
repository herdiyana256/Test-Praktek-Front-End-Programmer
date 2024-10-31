import axios from 'axios';

export const topUpBalance = async (amount) => {
  return await axios.post('/api/topup', { amount });
};
