import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Header = (props) => {
  return (
    <div className="header">
      <Outlet />
      <Link to="/">
       <h1>Hacker News</h1>
      </Link>
     
      
    </div>
  );
};

export default Header;
