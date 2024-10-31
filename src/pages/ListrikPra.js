import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import './listrikPraPage.css'; 
import ProfilePhoto from '../assets/Profile_Photo.png';
import LogoSIMSPPOB from '../assets/Logo.png';

export default function ListrikPraPage() {
  const [balance, setBalance] = useState('');
  const [userName, setUserName] = useState('');
  const [listrikAmount, setListrikAmount] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    } else {
      const decodedToken = jwtDecode(token);
      setUserName(decodedToken.email); // Ambil email dari payload token
      setBalance(decodedToken.balance); // Ambil saldo dari payload token
    }
  }, []);

  const handleListrikChange = (amount) => {
    setListrikAmount(amount);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setNotification('Token tidak valid.');
      return;
    }

    try {
      const response = await fetch('https://api-doc-tht.nutech-integrasi.com/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ listrik_amount: Number(listrikAmount) }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setNotification(`Pembayaran listrik berhasil. Saldo baru: Rp ${data.data.balance.toLocaleString()}`);
        setBalance(data.data.balance);
      } else {
        setNotification(data.message || 'Terjadi kesalahan saat melakukan pembayaran.');
      }
    } catch (error) {
      console.error('Error:', error);
      setNotification('Terjadi kesalahan dalam permintaan.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="flex items-center justify-between p-4 bg-white shadow">
        <div className="flex items-center">
          <img src={LogoSIMSPPOB} alt="Logo SIMS PPOB" className="h-8" />
          <span className="font-semibold text-xl ml-2">SIMS PPOB</span>
        </div>
        <div className="nav-links flex space-x-4">
          <button className="text-sm" onClick={() => window.location.href = '/topup'}>Top Up</button>
          <button className="text-sm" onClick={() => window.location.href = '/transaction'}>Transaction</button>
          <button className="text-sm" onClick={() => window.location.href = '/akun'}>Akun</button>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="profile-section mb-8">
          <div className="flex items-center gap-4">
            <img src={ProfilePhoto} alt="Profile" className="profile-image" />
            <div>
              <p className="profile-welcome text-sm">Selamat datang,</p>
              <h1 className="profile-name text-lg font-semibold">{userName}</h1>
            </div>
          </div>

          <div className="balance-card mt-4">
            <p className="mb-4 text-sm">Saldo anda</p>
            <div className="balance-amount">
              Rp {balance}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="listrik-form">
          <h2 className="text-lg font-semibold mb-4">Silahkan masukkan</h2>
          <label className="block text-sm font-bold mb-2"> Listrik Prabayar</label>
          <div className="flex flex-col space-y-2">
            {[10000, 20000, 50000, 100000, 250000, 500000].map((amount) => (
              <button
                key={amount}
                type="button"
                className={`listrik-button ${listrikAmount === amount ? 'selected' : ''} p-4 rounded-md border border-gray-300 hover:bg-gray-100 transition duration-150`}
                onClick={() => handleListrikChange(amount)}
              >
                Rp {amount.toLocaleString()}
              </button>
            ))}
          </div>
          <div className="mt-4">
            <h3 className="text-md font-bold">Jumlah yang dipilih: Rp {listrikAmount.toLocaleString() || '0'}</h3>
          </div>
          <button
            type="submit"
            className="submit-button"
            disabled={!listrikAmount}
          >
            Bayar
          </button>
        </form>

        {/* Notifikasi */}
        {notification && (
          <div className="mt-4 text-green-600">{notification}</div>
        )}
      </main>
    </div>
  );
}
