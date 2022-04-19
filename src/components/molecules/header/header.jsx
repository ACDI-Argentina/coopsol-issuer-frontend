import React from 'react';
import NavBar from '../NavBar/navbar';
import './_style.scss';
import '../../../css/app.scss';

const Header = () => {
  return (
    <div className="header">
      <div className="TopNav">
        <img src="img/sem-logo.png" alt="" style={{margin:15}} />
      </div>
      <NavBar />
    </div>
  );
};

export default Header;
