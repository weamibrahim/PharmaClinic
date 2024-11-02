import React,  from 'react';
import Sidebar from '../Components/sidebar';
import { Outlet } from 'react-router-dom';
import ModelForChat from '../Components/ModelForChat';
const Layout = () => {


  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <Outlet />
        <ModelForChat />

      </div>
    </div>
  );
};

export default Layout;
