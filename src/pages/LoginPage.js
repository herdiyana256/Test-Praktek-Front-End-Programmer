import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import { Eye, EyeOff, Lock } from 'lucide-react';
import logo from '../assets/Logo.png';
import wallpaper from '../assets/Illustrasi_Login.png';
import './LoginPage.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post('https://take-home-test-api.nutech-integrasi.com/login', {
        email: email,
        password: password,
      });

      // Jika login sukses, simpan token dan arahkan ke DashboardPage
      console.log('Login berhasil:', response.data);
      localStorage.setItem('token', response.data.data.token); // Simpan token ke local storage
      navigate('/dashboard'); // Arahkan ke DashboardPage
    } catch (error) {
      console.error('Terjadi kesalahan:', error.response ? error.response.data : error);
      setError("Email atau password salah.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Form Login */}
      <div className="login-form">
        <div className="login-header">
          <img src={logo} alt="Logo" className="logo" />
          <div className="login-title">
            <h1>SIMS PPOB</h1>
            <h2>Masuk atau buat akun</h2>
          </div>
        </div>
        <br />
        <br />
        {/* Login Form */}
        <form onSubmit={handleSubmit} className="form-space">
          <div className="relative">
            <span className="input-icon">@</span>
            <input
              type="email"
              placeholder="masukan email anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              required
            />
          </div>
          <div className="relative flex items-center">
            <Lock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="masukan password anda"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="eye-button"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {error && <p className="error-message">{error}</p>}

          <br />
          <button type="submit" className="button" disabled={loading}>
            {loading ? 'Memuat...' : 'Masuk'}
          </button>
        </form>
        <br /> <br />
        {/* Tautan Registrasi */}
        <p className="registration-link">
          belum punya akun? registrasi{' '}
          <a href="/register">di sini</a>
        </p>
      </div>

      {/* Sisi Ilustrasi */}
      <div className="illustration-container">
        <img
          src={wallpaper}
          alt="Login illustration"
          className="illustration-image"
        />
      </div>
    </div>
  );
}
