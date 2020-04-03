import React from 'react';
import './_style.scss';

import api from '../../../services/api-calls/all';
import FileUploader from '../../molecules/FileUploader/file-uploader';
import { useState } from 'react';
import CredentialCreation from '../../molecules/CredentialCreation/credential-creation';

// const { endpoint } = api();

const AddCredentials = ({ history }) => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const onUploaded = fileId => {
    setUploadedFile(fileId);
  };

  return (
    <div className="Credentials">
      {!uploadedFile ? (
        <FileUploader onUploaded={onUploaded} history={history} />
      ) : (
        <CredentialCreation uploadedFile={uploadedFile} />
      )}
    </div>
  );
};

export default AddCredentials;
