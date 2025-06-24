import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 50);
    };

    let ticking = false;
    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
        setTimeout(() => { ticking = false; }, 10);
      }
    };

    window.addEventListener('scroll', requestTick);
    return () => window.removeEventListener('scroll', requestTick);
  }, []);

  return (
    <header className={`nav-bar ${isScrolled ? 'scrolled' : ''}`}>
      <div className={`nav-content ${isScrolled ? 'scrolled' : ''}`}>
        <Link to="/" className={`nav-logo ${isScrolled ? 'scrolled' : ''}`}>Recipe Haven</Link>
        <div className={`nav-links ${isScrolled ? 'scrolled' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;