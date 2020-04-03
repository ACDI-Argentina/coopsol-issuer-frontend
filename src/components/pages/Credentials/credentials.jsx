import React from 'react';
import './_style.scss';

import api from '../../../services/api-calls/all';
import { useApi } from '../../../services/useApi';
import { useState } from 'react';
import { useEffect } from 'react';
import { ADD_CREDENTIALS } from '../../../utils/constants';
import { Button } from 'antd';

const { getCredentials } = api();

const Credentials = ({ history }) => {
  const getCredentialData = useApi();

  const [credentials, setCredentials] = useState([]);

  useEffect(() => {
    getCredentialData(getCredentials, setCredentials, () => {});
  }, []);

  const addCredential = () => {
    history.push(ADD_CREDENTIALS);
  };

  return (
    <div className="Credentials">
      <Button onClick={addCredential}>Nueva credencial</Button>
    </div>
  );
};

export default Credentials;
