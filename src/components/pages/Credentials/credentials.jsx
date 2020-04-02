import React from 'react';
import './_style.scss';

import api from '../../../services/api-calls/all';
import { useApi } from '../../../services/useApi';
import { useState } from 'react';
import { useEffect } from 'react';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import TabTable from '../../molecules/TabTable/TabTable';

const { getCredentials } = api();

const Credentials = () => {
  const getCredentialData = useApi();

  const [credentials, setCredentials] = useState([]);

  useEffect(() => {
    getCredentialData(getCredentials, setCredentials, () => {});
  }, []);

  return (
    <div className="Credentials">
      <TitlePage />
      <TabTable />
    </div>
  );
};

export default Credentials;
