import React, { useEffect, useState } from "react";
import "../styles/Profile.css";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

import { Link, Outlet, useLocation } from "react-router-dom";
import { useSetting } from "../context/WebsiteSetting";
const Profile = () => {
  const location = useLocation(); // Get the current location (URL)
  const [activeLink, setActiveLink] = useState("profile");
  const { siteSetting } = useSetting();
  useEffect(() => {
    const pathParts = location.pathname.split("/"); // Split the path by "/"
    const lastPart = pathParts[pathParts.length - 1] || "profile"; // Get the last part, fallback to "profile"
    setActiveLink(lastPart);
  }, []);
  const { logout } = useAuth();
  const profileLinkClick = (link) => {
    setActiveLink(link);
  };
  const logoutFun = () => {
    logout();
  };
  return (
    <>
      <Navbar siteName={siteSetting?.siteName || "Parking Owner"} />
      <div className="profile_page">
        <div className="profile_left">
          <ul>
            <li>
              <Link
                className={`${activeLink === "profile" ? "active" : ""}`}
                to="/profile"
                onClick={() => profileLinkClick("profile")}
              >
                My Profile
              </Link>
            </li>
            <li>
              <Link
                className={`${activeLink === "booking" ? "active" : ""}`}
                to="booking"
                onClick={() => profileLinkClick("booking")}
              >
                Booking
              </Link>
            </li>
            <li>
              <Link
                className={`${activeLink === "message" ? "active" : ""}`}
                to="message"
                onClick={() => profileLinkClick("message")}
              >
                Notifications
              </Link>
            </li>
            <li>
              <Link
                className={`${activeLink === "listyourspace" ? "active" : ""}`}
                to="listyourspace"
                onClick={() => profileLinkClick("listyourspace")}
              >
                List Your Space
              </Link>
            </li>
            <li>
              <Link onClick={() => logoutFun()}>Logout</Link>
            </li>
          </ul>
        </div>
        <div className="profile_right">
          <Outlet />

          {/* <AccountInformation/>
        <ReservationHistory/> 
        <ListyourSpace/> */}
        </div>
      </div>
    </>
  );
};

export default Profile;
