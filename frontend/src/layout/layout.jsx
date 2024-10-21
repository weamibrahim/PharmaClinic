import React from 'react';
import Sidebar from '../Components/sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
       
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
