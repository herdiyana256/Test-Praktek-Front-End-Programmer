import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import { Eye, EyeOff, User, Lock } from 'lucide-react'; // Menambahkan ikon User dan Lock
import logo from '../assets/Logo.png'; // Path logo
import wallpaper from '../assets/Illustrasi_Login.png'; // Path gambar wallpaper
import './RegisterPage.css'; // Mengimpor CSS

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState(''); // State untuk first name
  const [lastName, setLastName] = useState(''); // State untuk last name
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(''); // State untuk menyimpan error

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Cek apakah password dan konfirmasi password cocok
    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok.");
      return;
    }

    // Validasi format email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Format email tidak valid.");
      return;
    }

    // Validasi panjang password
    if (password.length < 8) {
      setError("Password minimal 8 karakter.");
      return;
    }

    try {
      const response = await axios.post('https://take-home-test-api.nutech-integrasi.com/registration', {
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: password,
      });

      console.log('Registrasi berhasil:', response.data);
      // Tambahkan logika lanjutan di sini, seperti redirect ke halaman login
    } catch (error) {
      // Cetak detail kesalahan
      console.error('Terjadi kesalahan:', error.response ? error.response.data : error);
      if (error.response) {
        const { status, message } = error.response.data;
        setError(`Kesalahan (${status}): ${message}`);
      } else {
        setError("Terjadi kesalahan saat registrasi. Silakan coba lagi.");
      }
    }
  };

  return (
    <div className="register-container">
      {/* Form Registrasi */}
      <div className="register-form">
        <div className="register-header">
          <img src={logo} alt="Logo" className="logo" />
          <div className="register-title">
            <h1>SIMS PPOB</h1>
            <h2>Daftar untuk membuat akun</h2>
          </div>
        </div>
        <br />
        <br />
        {/* Register Form */}
        <form onSubmit={handleSubmit} className="form-space">
          <div className="relative">
            <User className="input-icon" />
            <input
              type="text"
              placeholder="masukkan nama depan anda"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input-field"
              required
            />
          </div>
          <div className="relative">
            <User className="input-icon" />
            <input
              type="text"
              placeholder="masukkan nama belakang anda"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input-field"
              required
            />
          </div>
          <div className="relative">
            <span className="input-icon">@</span> {/* Simbol @ */}
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
          <div className="relative flex items-center">
            <Lock className="input-icon" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="konfirmasi password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="eye-button"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {/* Menampilkan error jika ada */}
          {error && <p className="error-message">{error}</p>}

          <br />
          <button type="submit" className="button">
            Daftar
          </button>
        </form>
        <br /> <br />
        {/* Tautan Masuk */}
        <p className="registration-link">
          sudah punya akun? masuk{' '}
          <a href="/login">di sini</a>
        </p>
      </div>

      {/* Sisi Ilustrasi */}
      <div className="illustration-container">
        <img
          src={wallpaper}
          alt="Register illustration"
          className="illustration-image"
        />
      </div>
    </div>
  );
}
