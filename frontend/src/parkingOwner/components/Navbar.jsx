import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";
import { useSetting } from "../../context/WebsiteSetting";
const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const { siteSetting } = useSetting();

  const navbarRef = useRef(null); // Reference to the navbar element

  const location = useLocation(); // Hook to get current location

  // Hide navbar when navigating to a different route
  useEffect(() => {
    setNavbar(false);
  }, [location]);

  // Handle clicks outside the navbar to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setNavbar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <nav className="dashboard_container_nav" ref={navbarRef}>
        <div className="nav_items">
          <div className="nav_left">
            <h1>
              {" "}
              <Link to="/">{siteSetting?.siteName}</Link>
            </h1>
          </div>
          <div className={navbar ? `nav_right nav_show` : `nav_right`}>
            <div className="nav_right_list">
              <ul>
                <li>
                  <Link to="/profile">Go to Profile</Link>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="reservation-request">Reservation Request</Link>
                </li>
                <li>
                  <Link to="manage-space">Manage Space</Link>
                </li>
                <li>
                  <Link to="earning">Earning</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          // className={navbar ? `menu_icon` : ``}
          className="menu_icon"
          onClick={() => {
            setNavbar(!navbar);
          }}
        >
          <i className="fa-solid fa-bars"></i>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
