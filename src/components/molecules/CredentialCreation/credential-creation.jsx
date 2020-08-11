import React from 'react';
import './_styles.scss';

import api from '../../../services/api-calls/all';
import FileUploader from '../../molecules/FileUploader/file-uploader';
import { useState } from 'react';
import MessageLoader from '../MessageLoader/message-loader';
import { useEffect } from 'react';

// const { endpoint } = api();

const CredentialCreation = ({ uploadedFile, onConnected }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      onConnected();
    }, 1000);
  }, []);

  return (
    <div className="CredentialCreation">
      <MessageLoader loading={loading} message={'Conectando ...'} />
    </div>
  );
};

export default CredentialCreation;
