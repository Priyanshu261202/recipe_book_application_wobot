import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import chefHat from '../assets/chefhat.png';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

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

  const isRecipeDetails = location.pathname.startsWith('/recipe/');

  return (
    <header className={`nav-bar ${isScrolled ? 'scrolled' : ''}`}>
      <div className={`nav-content ${isScrolled ? 'scrolled' : ''}`}>
        <Link to="/" className={`nav-logo ${isScrolled ? 'scrolled' : ''}`}>
          <img src={chefHat || '/assets/chefhat.png'} alt="Chef Hat" className="chef-hat" onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }} />
          Recipe Book .
        </Link>
        <div className={`nav-links ${isScrolled ? 'scrolled' : ''}`}>
          {isRecipeDetails ? (
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>← Back to Recipes</Link>
          ) : (
            <>
              <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
              <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;