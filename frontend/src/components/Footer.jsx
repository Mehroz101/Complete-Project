import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";
const Footer = ({ siteName }) => {
  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo">
            <h1>{siteName}</h1>
            <p>Your smart solution for parking.</p>
          </div>
          <div className="footer-links">
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/aboutus">About</Link>
                </li>

                <li>
                  <Link to="/profile/listyourspace">List your Space</Link>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Contact Us</h3>
              <ul>
                <li>
                  <Link to="" mailTo>
                    info@example.com
                  </Link>
                </li>
                <li>
                  <Link to="123456789">+123 456 789</Link>
                </li>
                <li>123 Main Street, City</li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Follow Us</h3>
              <div className="social-media">
                <Link to="">
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link to="">
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link to="">
                  <i className="fab fa-instagram"></i>
                </Link>
                <Link to="">
                  <i className="fab fa-linkedin-in"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Smart Parking. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
