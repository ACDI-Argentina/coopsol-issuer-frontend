import React, { useState } from 'react';
import apiCalls from '../../../services/api-calls/all';
import { processedErrorMessage } from '../../../services/api-calls/helpers';
import { Upload, message } from 'antd';
import ButtonPrimary from '../../atoms/ButtonPrimary/button-primary';

const { uploadFile } = apiCalls();
const { Dragger } = Upload;

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [responseStatus, setResponseStatus] = useState({});

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.set('file', file);
      const response = await uploadFile(formData);
      setResponseStatus(response.status);
      message.success('El archivo se ha subido correctamente');
    } catch (error) {
      const errorMessage = processedErrorMessage(error);
      message.error(errorMessage);
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

  return (
    <div>
      <div className="mainSectionReport">
        <div className="UploadReport">
          <div className="title">
            <h2>Upload Report</h2>
            <div className="buttonSection">
              <ButtonPrimary text="Upload" theme="ThemePrimary" onClick={handleSubmit} />
            </div>
          </div>
          <div className="preview">
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">{/* <Icon type="inbox" /> */}</p>
              <p className="ant-upload-text">
                Haga clic o arrastre un archivo a este área para cargar
              </p>
              <p className="ant-upload-hint">Formatos aceptados: .xlsx</p>
            </Dragger>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
