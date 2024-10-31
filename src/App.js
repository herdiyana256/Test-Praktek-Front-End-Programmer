import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import TopUpPage from './pages/TopUpPage';
import PaymentPage from './pages/PaymentPage';
import TransactionPage from './pages/TransactionPage';
import ListrikPraPage from './pages/ListrikPra'; // Import ListrikPraPage

function App() {
  return (
    <div className="app-container">
      <main>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/akun" element={<ProfilePage />} />
          <Route path="/topup" element={<TopUpPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/transaction" element={<TransactionPage />} />
          <Route path="/listrik-pra" element={<ListrikPraPage />} /> 
        </Routes>
      </main>
    </div>
  );
}

export default App;
