import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import logo from './assets/logo.jpeg'
import './App.css'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Packages from './pages/Packages'
import PackageDetails from './pages/PackageDetails'
import AdminPanel from './pages/AdminPanel'
import Payment from './pages/Payment'
import DigitalProducts from './pages/DigitalProducts'

import API_BASE_URL from './config'


function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const [packages, setPackages] = useState([]);
  const [digitalProducts, setDigitalProducts] = useState([]);
  const [stats, setStats] = useState({ students: 0, earnings: 0, rating: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/' && !location.hash;
    if (path.startsWith('/#')) return location.hash === path.substring(1);
    if (path === '/packages') return location.pathname === '/packages' || location.pathname.startsWith('/package/');
    if (path === '/digital-products') return location.pathname === '/digital-products';
    return location.pathname === path;
  };

  const navigateAndScroll = (path, targetId) => {
    setIsMenuOpen(false);
    if (window.location.pathname !== path) {
      navigate(path);
      if (targetId) {
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    } else if (targetId) {
      const element = document.getElementById(targetId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/packages`)
      .then(res => res.json())
      .then(data => setPackages(data))
      .catch(err => console.error("Error fetching packages:", err));


    fetch(`${API_BASE_URL}/api/digital-products`)
      .then(res => res.json())
      .then(data => setDigitalProducts(data))
      .catch(err => console.error("Error fetching digital products:", err));

    const timer = setInterval(() => {
      setStats(prev => ({
        students: Math.min(prev.students + 200, 12000),
        earnings: Math.min(prev.earnings + 0.1, 3.5),
        rating: 4.9
      }));
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="app-container">
      <header className="navbar">
        <div className="logo-container" onClick={() => navigateAndScroll('/')} style={{ cursor: 'pointer' }}>
          <img src={logo} alt="SatyaInfotech Academy Logo" className="logo-img" />
          <div className="logo-text">SatyaInfotech Academy</div>
        </div>

        <button className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Menu" style={{ zIndex: 10000 }}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav-links ${isMenuOpen ? 'mobile-active' : ''}`}>
          <a href="/" className={isActive('/') ? 'active-link' : ''} onClick={(e) => { e.preventDefault(); navigateAndScroll('/'); }}>Home</a>
          <a href="/about-us" className={isActive('/about-us') ? 'active-link' : ''} onClick={(e) => { e.preventDefault(); navigateAndScroll('/about-us'); }}>About Us</a>
          <a href="/packages" className={isActive('/packages') ? 'active-link' : ''} onClick={(e) => { e.preventDefault(); navigateAndScroll('/packages'); }}>Our Packages</a>
          <a href="/digital-products" className={isActive('/digital-products') ? 'active-link' : ''} onClick={(e) => { e.preventDefault(); navigateAndScroll('/digital-products'); }}>Digital Products</a>
          <a href="/packages" className="btn-primary dashboard-btn" style={{ padding: '0.6rem 1.25rem' }} onClick={(e) => { e.preventDefault(); navigateAndScroll('/packages'); }}>Join Now</a>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home packages={packages} stats={stats} digitalProducts={digitalProducts} />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/packages" element={<Packages packages={packages} />} />
          <Route path="/digital-products" element={<DigitalProducts products={digitalProducts} />} />
          <Route path="/package/:id" element={<PackageDetails />} />
          <Route path="/payment/:id" element={<Payment />} />
          <Route path="/AdminPanel" element={<AdminPanel />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="logo-text" style={{ marginBottom: '1rem' }}>SatyaInfotech Academy</div>
            <p style={{ fontSize: '0.9rem' }}>Empowering students to gain financial freedom through practical skill mastery.</p>
          </div>
          <div className="footer-col">
            <h4>Academy</h4>
            <ul>
              <li><a href="/" onClick={(e) => { e.preventDefault(); navigateAndScroll('/'); }}>Home</a></li>
              <li><a href="/packages" onClick={(e) => { e.preventDefault(); navigateAndScroll('/packages'); }}>Our Packages</a></li>
              <li><a href="/digital-products" onClick={(e) => { e.preventDefault(); navigateAndScroll('/digital-products'); }}>Digital Products</a></li>
              <li><a href="/about-us" onClick={(e) => { e.preventDefault(); navigateAndScroll('/about-us'); }}>About Us</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Refund Policy</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Connect</h4>
            <div style={{ fontSize: '0.9rem', marginBottom: '1rem', lineHeight: '1.6' }}>
              <p>📍 Hyderabad, India</p>
              <p>📞 <a href="https://wa.me/919014091291" style={{ color: 'inherit', textDecoration: 'none' }}>+91 90140 91291</a></p>
              <p>✉️ support@satyainfotech.com</p>
              <p style={{ marginTop: '0.5rem', opacity: 0.7 }}>⚡ We respond in 24 hours</p>
            </div>
            <div style={{ display: 'flex', gap: '1.25rem', fontSize: '1.2rem', justifyContent: 'flex-start' }}>
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
              <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
              <a href="#" aria-label="Twitter"><i className="fa-brands fa-x-twitter"></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; 2026 SatyaInfotech Academy. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  )
}

export default App
