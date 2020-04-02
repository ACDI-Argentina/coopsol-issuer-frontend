import React from 'react';
import NavBar from '../NavBar/navbar';
import './_style.scss';
import '../../../css/app.scss';

const Header = () => {
  return (
    <div className="header">
      <div className="RightSide">
        <img src="img/sem-logo.svg" alt="" />
        <NavBar />
      </div>
    </div>
  );
};

export default Header;
