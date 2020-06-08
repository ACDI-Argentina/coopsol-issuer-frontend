import React, { useState, useContext } from 'react';
import apiCalls from '../../../services/api-calls/all';
import { processedErrorMessage } from '../../../services/api-calls/helpers';
import { Upload, message } from 'antd';
import ButtonPrimary from '../../atoms/ButtonPrimary/button-primary';
import './_style.scss';
import MessageLoader from '../MessageLoader/message-loader';
import { UserContext } from '../../../services/providers/user-context';
import { processError } from '../../../services/api-calls/helpers';

const { uploadFile } = apiCalls();
const { Dragger } = Upload;

const FileUploader = ({ onUploaded, history }) => {
  const [file, setFile] = useState(null);
  const [showContainer, setShowContainer] = useState(false);
  const [uploadResponse, setUploadResponse] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { setUser } = useContext(UserContext);

  const handleUpload = async () => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.set('file', file);
      const response = await uploadFile(formData);
      setUploadResponse(response.data);
      //setSuccess('Tu archivo fue subido correctamente!');
      setUploading(false);
    } catch (error) {
      processError(error, setUser);
      message.error(processedErrorMessage(error));
      setUploadResponse(null);
      setUploading(false);
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
    setUploadResponse(null);
    setShowContainer(data.fileList.length > 0);
  };

  const handleProcessFile = () => {
    onUploaded('id');
  };

  const renderButtons = () => {
    if (uploadResponse && uploadResponse.totalErrorsRows === 0) {
      return (
        <ButtonPrimary
          text="Crear credencial"
          theme="ThemePrimary"
          onClick={handleProcessFile}
          disabled={!showContainer}
        />
      );
    }
    return (
      !uploading && (
        <ButtonPrimary
          text="Subir archivo"
          theme="ThemePrimary"
          onClick={handleUpload}
          disabled={!showContainer}
        />
      )
    );
  };

  const renderUploadedInfo = () => {
    if (!uploadResponse) return null;

    const { totalProcessedForms, totalReadRows, totalValidRows, totalErrorsRows, errorRows } = uploadResponse;

    const errors = errorRows.map(err => (
      <li>
        {err.errorHeader && (
          <span>
            <img src="/img/error.svg" alt="" />
            <label htmlFor="">{err.errorHeader} </label>
          </span>
        )}
        <p>{err.errorBody} </p>
      </li>
    ));

    return (
      <div className="result-container">
        <div className="result">
          <label className="process">Lineas procesadas: {totalReadRows}</label>
          <label className="r-success">
            <img src="/img/check.svg" alt="" />
            {totalProcessedForms} formulario(s)
          </label>
          <label className="r-success">
            <img src="/img/check.svg" alt="" />
            {totalValidRows} líneas
          </label>
          <label className="r-error">
            <img src="/img/error.svg" alt="" />
            {totalErrorsRows} líneas
          </label>
        </div>
        {totalErrorsRows > 0 && (
          <div className="error">
            <h4>Por favor, corregí los errores que se muestran y volvelo a subir</h4>
            <ul>{errors}</ul>
          </div>
        )}
        {totalErrorsRows === 0 && (
          <div className="success">
            <img src="/img/success-file.svg" alt="" />
            <h4>Tu archivo fue cargado exitosamente!</h4>
            <p>Presioná crear credencial para continuar.</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="FileUploader">
      <div className="mainSectionReport">
        <div className="UploadReport">
          <div className="preview">
            <Dragger {...props} onChange={onFileChanged} className={showContainer ? 'hidden' : ''}>
              <img src="/img/upload-file.svg" alt="" />
              <p className="ant-upload-text">
                Haga clic o arrastre un archivo a este área para cargar
              </p>
              <p className="ant-upload-hint">Formatos aceptados: .xlsx</p>
            </Dragger>

            <div className="title">
              {renderUploadedInfo()}
              <MessageLoader loading={uploading} message={'Subiendo archivo...'} />

              <div className="buttonSection">{renderButtons()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
