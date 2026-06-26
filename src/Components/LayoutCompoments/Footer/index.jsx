import React from "react";
import "./index.css";

const index = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <img src="/logoDark.png" alt="Logo" className="footer-logo" />
          <p>
            Discover beautiful images from around the world.
            Search, explore, and download high-quality photos.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="#">Explore</a></li>
            <li><a href="#">Favorites</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Connect</h3>
          <div className="social-links">
            <a href="/">LinkedIn</a>
            <a href="/">GitHub</a>
            <a href="/">Twitter</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Image Gallery. All Rights Reserved.
      </div>
    </footer>
  );
};

export default index;