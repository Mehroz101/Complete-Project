import React from "react";
import { Link } from "react-router-dom";
import "../styles/AboutUs.css"; // Make sure to create this CSS file
import Navbar from "../components/Navbar";
import AboutusImg from "../assets/aboutus.jpg";
import AboutusTopImg from "../assets/aboutustop.png";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="about_us_section">
        <div className="aboutus_top">
          <div className="about_us_image">
            <img src={AboutusTopImg} alt="About Us Illustration" />
          </div>
          <div className="top_text">
            <h1>About Us</h1>
          </div>
        </div>
        <div className="about_us">
          <div className="text">
            <h1>Passionate Minds Crafting Digital Experiences</h1>
            <p>
              As a team, we believe in the power of innovation and technology to
              transform the way businesses connect with their audience. Our
              journey began with a simple idea: to create digital solutions that
              are as unique as the people behind them. Today, we stand as a team
              of creative thinkers, developers, and designers united by a shared
              passion for excellence.
            </p>
          </div>

          <img src={AboutusImg} alt="" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
