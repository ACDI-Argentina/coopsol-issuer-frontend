import React, { useContext } from 'react';
import NavBar from '../NavBar/navbar';
import { UserContext } from '../../../services/providers/user-context';
import './_style.scss';
import '../../../css/app.scss';


const Header = () => {
  return (
    <div className="header">
      <div className="RightSide">
          <NavBar />
      </div>
    </div>
  );
};

export default Header;