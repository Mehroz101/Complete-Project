import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";
import locationIcon from "../assets/gps.png";
const Footer = ({ siteName }) => {
  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo">
            <div className="logo">
              <img src={locationIcon} alt="" />
              <h1>{siteName || "Smart Parking"}</h1>
            </div>
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
              <h3>Contact Info</h3>
              <ul>
                <li>
                  <Link to="" mailTo>
                    mehrozfarooq127@gmail.com
                  </Link>
                </li>
                <li>
                  <Link to="123456789">+92 123 456 789</Link>
                </li>
                <li>Chnugi No. 06, Gulgusht Colony, Lahore</li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Follow Us</h3>
              <div className="social-media">
                <Link to="https://www.facebook.com/mehroz.farooq.7/">
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link to="https://github.com/Mehroz101/">
                  <i className="fab fa-github"></i>
                </Link>
                <Link to="https://www.instagram.com/mehrozfarooq/">
                  <i className="fab fa-instagram"></i>
                </Link>
                <Link to="https://www.linkedin.com/in/mehroz-farooq-0ba92b223/">
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
