import React from 'react';
import './_style.scss';

import TitlePage from '../../atoms/TitlePage/TitlePage';
import TabTable from '../../molecules/TabTable/TabTable';

const Credentials = ({ history }) => {
  return (
    <div className="Credentials">
      <TitlePage history={history} />
      <TabTable />
    </div>
  );
};

export default Credentials;
