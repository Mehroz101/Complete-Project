import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import CustomSidebar from "../components/Sidebar/SideNavbar";

const DashboardLayout = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    console.log(visible);
  }, [visible]);

  return (
    <>
      <div className="navbar">
        <Navbar visible={visible} onShow={() => setVisible(true)} />
      </div>
      <div className="sidebar_components">
        <CustomSidebar visible={visible} onHide={() => setVisible(false)} />
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
