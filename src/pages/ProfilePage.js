import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import logo from '../assets/Logo.png';
import ProfilePhoto from '../assets/Profile_Photo.png';
import { Link } from 'react-router-dom';
import './ProfilePage.css';

function ProfilePage() {
  const [profile, setProfile] = useState({
    email: '',
    firstName: '',
    lastName: '',
    balance: 0,
  });
  const [profileImage, setProfileImage] = useState(ProfilePhoto);
  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      const decodedToken = jwtDecode(token);
      setProfile({
        email: decodedToken.email,
        firstName: decodedToken.first_name || '',
        lastName: decodedToken.last_name || '',
        balance: decodedToken.balance || 0,
      });
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('file', selectedImage);

    try {
      const response = await axios.put(
        'https://take-home-test-api.nutech-integrasi.com/profile/image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === 0) {
        setMessage('Update Profile Image berhasil');
        setProfileImage(URL.createObjectURL(selectedImage)); // Set new profile image
      }
    } catch (error) {
      setMessage('Error: ' + (error.response ? error.response.data.message : 'Unable to update profile image.'));
    }
  };

  return (
    <div className="profile-page-container">
      {/* Navigation */}
      <nav className="navbar">
        <img src={logo} alt="Logo" className="logo" />
        <h1>SIMS PPOB</h1>
        <ul className="nav-links">
          <li><Link to="/topup">TopUp</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/transaction">Transaction</Link></li>
          <li><Link to="/akun">Akun</Link></li>
          <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
        </ul>
      </nav>

      {/* Profile Form */}
      <div className="profile-form">
        <h2>Profil</h2>
        <div className="profile-image-container">
          <img src={profileImage} alt="Profile" className="profile-image" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Nama Depan</label>
            <input
              type="text"
              name="firstName"
              value={profile.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Nama Belakang</label>
            <input
              type="text"
              name="lastName"
              value={profile.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Upload Foto Profil</label>
            <input
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleImageChange}
            />
            <p>Choose a new photo if you want to update it</p>
          </div>
          <button type="submit">Edit Profil</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default ProfilePage;