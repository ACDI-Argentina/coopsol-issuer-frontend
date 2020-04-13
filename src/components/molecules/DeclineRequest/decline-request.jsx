import React from 'react';
import { useApi } from '../../../services/useApi';
import api from '../../../services/api-calls/all';
const { revokeCredentials } = api();

const DeclineRequest = () => {
  const credentialCall = useApi();

  const onDecline = e => {
    e.preventDefault();
  };

  return (
    <div className="DeclineRequest">
      <a className="ant-dropdown-link" href="/" onClick={onDecline}>
        Rechazar solicitud
      </a>
    </div>
  );
};

export default DeclineRequest;
