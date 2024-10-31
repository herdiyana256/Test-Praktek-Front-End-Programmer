import axios from 'axios';

export const login = async (email, password) => {
  return await axios.post('/api/login', { email, password });
};
