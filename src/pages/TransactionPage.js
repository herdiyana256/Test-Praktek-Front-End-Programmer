import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import './transactionPage.css'; 
import ProfilePhoto from '../assets/Profile_Photo.png';
import LogoSIMSPPOB from '../assets/Logo.png';

export default function TransactionPage() {
  const [balance, setBalance] = useState('');
  const [userName, setUserName] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    } else {
      const decodedToken = jwtDecode(token);
      setUserName(decodedToken.email);
      setBalance(decodedToken.balance);
      fetchTransactionHistory(token);
    }
  }, []);

  const fetchTransactionHistory = async (token) => {
    try {
      const response = await fetch('https://api-doc-tht.nutech-integrasi.com/transaction/history', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log('Transaction History Response:', data);

      if (response.ok) {
        setTransactions(data.data); // Mengambil data transaksi dari response
      } else {
        setNotification(data.message || 'Terjadi kesalahan saat mengambil riwayat transaksi.');
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
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

        <h2 className="text-lg font-semibold mb-4">Riwayat Transaksi</h2>
        <div className="transaction-list">
          {transactions.slice(0, showMore ? transactions.length : 3).map((transaction, index) => (
            <div key={index} className="transaction-item flex justify-between">
              <span>{transaction.description}</span>
              <span className={transaction.type === 'topup' ? 'text-green-600' : 'text-red-600'}>
                {transaction.type === 'topup' ? `+Rp ${transaction.amount.toLocaleString()}` : `-Rp ${transaction.amount.toLocaleString()}`}
              </span>
            </div>
          ))}
        </div>
        
        <button className="show-more" onClick={() => setShowMore(!showMore)}>
          {showMore ? 'Tutup' : 'Show More'}
        </button>

        {/* Notifikasi */}
        {notification && (
          <div className="mt-4 text-red-600">{notification}</div>
        )}
      </main>
    </div>
  );
}
