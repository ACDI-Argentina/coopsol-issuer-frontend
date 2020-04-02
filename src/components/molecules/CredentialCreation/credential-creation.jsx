import React from 'react';
import './_styles.scss';

import api from '../../../services/api-calls/all';
import FileUploader from '../../molecules/FileUploader/file-uploader';
import { useState } from 'react';
import MessageLoader from '../MessageLoader/message-loader';

// const { endpoint } = api();

const CredentialCreation = ({ uploadedFile }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="CredentialCreation">
      <MessageLoader loading={loading} message={'Conectando con Créditos Bondaria...'} />
    </div>
  );
};

export default CredentialCreation;
