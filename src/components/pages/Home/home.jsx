import React from 'react';
import './_style.scss';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import TabTable from '../../molecules/TabTable/TabTable';

const Home = () => {
  return (
    <div className="CredentialsContent">
      <TitlePage/>
      <TabTable/>
    </div>
  );
};

export default Home;
