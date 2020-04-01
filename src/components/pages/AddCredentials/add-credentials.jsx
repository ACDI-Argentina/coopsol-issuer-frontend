import React from 'react';
import './_style.scss';

import api from '../../../services/api-calls/all';
import FileUploader from '../../molecules/FileUploader/file-uploader';

// const { endpoint } = api();

const AddCredentials = props => {
  const onSubmitted = () => {};

  return (
    <div className="Credentials">
      <FileUploader onSubmitted={onSubmitted} />
    </div>
  );
};

export default AddCredentials;
