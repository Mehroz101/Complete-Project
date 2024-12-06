import React, { useEffect, useState } from "react";
import { Menubar } from "primereact/menubar";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ onShow }) {
  const { checkuser } = useAuth();
  const [userStatus, setUserStatus] = useState(null);

  const end = userStatus ? (
    <>
      <Link to="/login" className="login_btn">
        <Button label="Login" className="p-button-text" />
      </Link>
    </>
  ) : (
    <div className="flex align-items-center">
      <span className="mr-2">Admin Dashboard</span>
    </div>
  );
  useEffect(() => {
    const status = checkuser();
    setUserStatus(status);
  }, [checkuser]);
  return (
    <div className="card">
      <Menubar
        end={end}
        start={
          <Button
            icon="pi pi-bars"
            className="p-button-text"
            onClick={onShow} // Call the function to show the sidebar
            aria-label="Show Sidebar"
          />
        }
      />
    </div>
  );
}
