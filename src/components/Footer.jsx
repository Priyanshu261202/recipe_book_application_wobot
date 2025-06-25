import { Link, useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation();

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p>Made By - Priyanshu Shakya using React.js for,</p>
        <p>Wobot Intelligence Private Limited</p>
        
        <div className="footer-links">
          <Link to="/about">About</Link> | 
          <Link to="/contact">Contact</Link> | 
          <span onClick={handleScrollTop} style={{ cursor: 'pointer', color: '#C9A961' }}>
            Back on Top
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
