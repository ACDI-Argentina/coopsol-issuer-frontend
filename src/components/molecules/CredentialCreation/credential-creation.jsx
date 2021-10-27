import React from 'react';
import './_styles.scss';

import { useState } from 'react';
import MessageLoader from '../MessageLoader/message-loader';
import { useEffect } from 'react';

// const { endpoint } = api();

const CredentialCreation = ({ uploadedFile, onConnected }) => {
  const [loading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      onConnected();
    }, 1000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="CredentialCreation">
      <MessageLoader loading={loading} message={'Conectando ...'} />
    </div>
  );
};

export default CredentialCreation;
