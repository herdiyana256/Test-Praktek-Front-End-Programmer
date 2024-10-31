import axios from 'axios';

// Ambil token dari local storage atau tempat lain yang Anda gunakan
const getToken = () => {
  return localStorage.getItem('token'); // Pastikan Anda menyimpan token setelah login
};

export const getUserProfile = async () => {
  try {
    const token = getToken(); // get token
    const response = await axios.get('https://take-home-test-api.nutech-integrasi.com/profile', {
      headers: {
        Authorization: `Bearer ${token}`, // add  Bearer Token ke header
      },
    });
    return response.data; // callback data dari respons
  } catch (error) {
    throw error; // Menangkap dan melempar kesalahan agar bisa ditangani di ProfilePage
  }
};
