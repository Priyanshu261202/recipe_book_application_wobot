import React from 'react';

function Contact() {
  return (
    <div className="about-wrapper">
      <h1 className="about-heading">Contact</h1>
      <p className="about-para">
        I've built this application from scratch using React.js, Spoonacular API, and custom UI styling. I’d love to hear your feedback or suggestions!
      </p>

      <div className="about-section">
        <h2 className="about-section-title">Gmail</h2>
        <p className="about-para">
          <a href="mailto:priyanshushakya.work@gmail.com" className="about-link">
            priyanshushakya.work@gmail.com
          </a>
        </p>
      </div>

      <div className="about-section">
        <h2 className="about-section-title">LinkedIn</h2>
        <p className="about-para">
          <a
            href="https://www.linkedin.com/in/priyanshu-shakya-129455246/"
            target="_blank"
            rel="noopener noreferrer"
            className="about-link"
          >
            linkedin.com/in/priyanshu-shakya-129455246/
          </a>
        </p>
      </div>
    </div>
  );
}

export default Contact;
