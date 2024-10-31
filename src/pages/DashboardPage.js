import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; 
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
import LogoSIMSPPOB from '../assets/Logo.png';
import PBBIcon from '../assets/PBB.png';
import ListrikIcon from '../assets/Listrik.png';
import PulsaIcon from '../assets/Pulsa.png';
import PDAMIcon from '../assets/PDAM.png';
import PGNIcon from '../assets/PGN.png';
import TVLanggananIcon from '../assets/Televisi.png';
import MusikIcon from '../assets/Musik.png';
import VoucherGameIcon from '../assets/Game.png';
import VoucherMakananIcon from '../assets/Voucher Makanan.png';
import KurbanIcon from '../assets/Kurban.png';
import ZakatIcon from '../assets/Zakat.png';
import PaketDataIcon from '../assets/Paket Data.png';
import ProfilePhoto from '../assets/Profile_Photo.png';
import Banner1 from '../assets/Banner1.png';
import Banner2 from '../assets/Banner2.png';
import Banner3 from '../assets/Banner3.png';
import Banner4 from '../assets/Banner4.png';
import Banner5 from '../assets/Banner5.png';
import './dashboardPage.css';

export default function DashboardPage() {
  const [showBalance, setShowBalance] = useState(false);
  const [balance, setBalance] = useState(''); 
  const [userName, setUserName] = useState(''); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      const decodedToken = jwtDecode(token);
      setUserName(decodedToken.email); 
      setBalance(decodedToken.balance); 
    }
  }, [navigate]);

  const services = [
    { icon: PBBIcon, name: 'PBB', route: '/pbb' },
    { icon: ListrikIcon, name: 'Listrik', route: '/listrik-pra' }, 
    { icon: PulsaIcon, name: 'Pulsa', route: '/pulsa' },
    { icon: PDAMIcon, name: 'PDAM', route: '/pdam' },
    { icon: PGNIcon, name: 'PGN', route: '/pgn' },
    { icon: TVLanggananIcon, name: 'TV Langganan', route: '/tv-langganan' },
    { icon: MusikIcon, name: 'Musik', route: '/musik' },
    { icon: VoucherGameIcon, name: 'Voucher Game', route: '/voucher-game' },
    { icon: VoucherMakananIcon, name: 'Voucher Makanan', route: '/voucher-makanan' },
    { icon: KurbanIcon, name: 'Kurban', route: '/kurban' },
    { icon: ZakatIcon, name: 'Zakat', route: '/zakat' },
    { icon: PaketDataIcon, name: 'Paket Data', route: '/paket-data' },
  ];

  const banners = [
    {
      title: 'Saldo Gratis!',
      description: 'Saldo SIMS PPOB gratis maksimal Rp25.000 untuk pengguna pertama',
      image: Banner1,
      bgColor: 'bg-red-500',
    },
    {
      title: 'Diskon listrik!',
      description: 'Diskon untuk setiap pembayaran listrik prabayar 10%',
      image: Banner2,
      bgColor: 'bg-pink-300',
    },
    {
      title: 'Promo makan!',
      description: 'Dapatkan voucher makan di restoran favorit anda dengan melakukan transaksi pulsa',
      image: Banner3,
      bgColor: 'bg-blue-400',
    },
    {
      title: 'Promo baru!',
      description: 'Jangan lewatkan promo menarik lainnya',
      image: Banner4,
      bgColor: 'bg-green-500',
    },
    {
      title: 'Cek promo terbaru!',
      description: 'Temukan berbagai penawaran menarik setiap harinya',
      image: Banner5,
      bgColor: 'bg-purple-400',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-4 bg-white shadow">
        <div className="flex items-center">
          <img src={LogoSIMSPPOB} alt="SIMS PPOB Logo" className="h-8 mr-2" />
          <span className="font-semibold text-xl">SIMS PPOB</span>
        </div>
        <div className="nav-links flex space-x-4">
          <button className="text-sm" onClick={() => navigate('/topup')}>
            Top Up
          </button>
          <button className="text-sm" onClick={() => navigate('/transaction')}>Transaction</button>
          <button className="text-sm" onClick={() => navigate('/akun')}>Akun</button>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Profile Section */}
        <div className="profile-section mb-8">
          <div className="flex items-center gap-4">
            <img src={ProfilePhoto} alt="Profile" className="profile-image h-12 w-12 rounded-full" />
            <div>
              <p className="profile-welcome text-sm">Selamat datang,</p>
              <h1 className="profile-name text-lg font-semibold">{userName}</h1>
            </div>
          </div>

          {/* Balance Card */}
          <div className="balance-card relative overflow-hidden rounded-xl p-6 bg-white shadow-md mt-4">
            <div className="relative z-10">
              <p className="mb-4 text-sm">Saldo anda</p>
              <div className="balance-amount mb-4 text-2xl font-bold">
                Rp {showBalance ? balance : '•••••••'}
              </div>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="show-balance-button flex items-center gap-2 text-sm text-blue-500"
              >
                Lihat Saldo
                {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="services-grid mb-12 grid grid-cols-3 gap-4">
          {services.map((service, index) => (
            <button
              key={index}
              className="service-button flex flex-col items-center gap-2 p-4 border rounded-lg bg-white shadow-sm hover:bg-gray-100"
              onClick={() => navigate(service.route)} // Mengarahkan ke route yang sesuai
            >
              <img src={service.icon} alt={service.name} className="service-icon h-6 w-6" />
              <span className="text-center text-xs">{service.name}</span>
            </button>
          ))}
        </div>

        {/* Promotions Section */}
        <section className="promotions-section">
          <h2 className="mb-6 text-xl font-semibold">Temukan promo menarik</h2>
          <div className="banners-container overflow-hidden">
            <div className="banners-wrapper flex transition-transform duration-300">
              {banners.map((banner, index) => (
                <div
                  key={index}
                  className={`${banner.bgColor} promo-card group relative overflow-hidden rounded-xl p-6 transition-all`}
                >
                  <div className="relative z-10">
                    <h3 className="promo-title mb-2 text-lg font-semibold">{banner.title}</h3>
                    <p className="promo-description text-sm opacity-90">{banner.description}</p>
                  </div>
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-20 transition-all group-hover:opacity-30"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
