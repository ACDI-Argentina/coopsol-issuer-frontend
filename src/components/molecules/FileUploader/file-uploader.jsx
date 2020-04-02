import React, { useState } from 'react';
import apiCalls from '../../../services/api-calls/all';
import { processedErrorMessage } from '../../../services/api-calls/helpers';
import { Upload, message } from 'antd';
import ButtonPrimary from '../../atoms/ButtonPrimary/button-primary';
import './_style.scss';

const { uploadFile } = apiCalls();
const { Dragger } = Upload;

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [responseStatus, setResponseStatus] = useState({});
  const [showContainer, setShowContainer] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.set('file', file);
      const response = await uploadFile(formData);
      setResponseStatus(response.status);
      setSuccess('Archivo subido correctamente!');
    } catch (error) {
      const errorMessage = processedErrorMessage(error);
      setError(errorMessage);
    }
  };

  const props = {
    name: 'file',
    accept: '.xlsx',
    multiple: false,
    beforeUpload: fileTemporary => {
      setFile(fileTemporary);
      return false;
    }
  };

  const onFileChanged = data => {
    setError(null);
    setSuccess(null);
    setShowContainer(data.fileList.length > 0);
  };

  return (
    <div className="FileUploader">
      <div className="mainSectionReport">
        <div className="UploadReport">
          <div className="preview">
            <Dragger {...props} onChange={onFileChanged} className={showContainer ? 'hidden' : ''}>
              <p className="ant-upload-text">
                Haga clic o arrastre un archivo a este área para cargar
              </p>
              <p className="ant-upload-hint">Formatos aceptados: .xlsx</p>
            </Dragger>

            <div className="title">
              <div className="message">
                {error && <div className="error">{error}</div>}
                {success && <div className="success">{success}</div>}
              </div>
              <div className="buttonSection">
                <ButtonPrimary
                  text="Upload"
                  theme="ThemePrimary"
                  onClick={handleSubmit}
                  disabled={!showContainer}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
