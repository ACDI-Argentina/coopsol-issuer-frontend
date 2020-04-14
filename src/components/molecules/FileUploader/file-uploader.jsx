import React, { useState } from 'react';
import apiCalls from '../../../services/api-calls/all';
import { processedErrorMessage } from '../../../services/api-calls/helpers';
import { Upload } from 'antd';
import ButtonPrimary from '../../atoms/ButtonPrimary/button-primary';
import './_style.scss';
import MessageLoader from '../MessageLoader/message-loader';

const { uploadFile } = apiCalls();
const { Dragger } = Upload;

const FileUploader = ({ onUploaded, history }) => {
  const [file, setFile] = useState(null);
  const [responseStatus, setResponseStatus] = useState({});
  const [showContainer, setShowContainer] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.set('file', file);
      const response = await uploadFile(formData);
      setResponseStatus(response.status);
      setSuccess('Tu archivo fue subido correctamente!');
      setUploading(false);
    } catch (error) {
      const errorMessage = processedErrorMessage(error);
      setError(errorMessage);
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
    setError(null);
    setSuccess(null);
    setShowContainer(data.fileList.length > 0);
  };

  const handleProcessFile = () => {
    onUploaded('id');
  };

  const renderButtons = () => {
    if (success) {
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
      <ButtonPrimary
        text="Subir archivo"
        theme="ThemePrimary"
        onClick={handleUpload}
        disabled={!showContainer}
      />
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
              <div className="message">
                <div className="result">
                  <label className="process">Lineas procesadas: 1350</label>
                  <label className="r-success">
                    <img src="/img/check.svg" alt="" />
                    1350 líneas
                  </label>
                  <label className="r-error">
                    <img src="/img/error.svg" alt="" />0 líneas
                  </label>
                </div>
                {error && (
                  <div className="error">
                    <h4>Por favor, corregí los errores que se muestran y volvelo a subir</h4>
                    <ul>
                      <li>
                        <img src="/img/error.svg" alt="" />
                        <label htmlFor="">Celda AF2.</label>
                        <p>Error: Sólo caracteres numéricos </p>
                      </li>
                      <li>
                        <img src="/img/error.svg" alt="" />
                        <label htmlFor="">Celda AF2.</label>
                        <p>Error: Sólo caracteres numéricos </p>
                      </li>
                      <li>
                        <img src="/img/error.svg" alt="" />
                        <label htmlFor="">Celda AF2.</label>
                        <p>Error: Sólo caracteres numéricos </p>
                      </li>
                    </ul>
                  </div>
                )}
                {success && (
                  <div className="success">
                    <img src="/img/success-file.svg" alt="" />
                    <h4>Tu archivo fue cargado exitosamente!</h4>
                    <p>Presioná crear credencial para continuar.</p>
                  </div>
                )}
              </div>
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
