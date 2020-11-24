import React, { useState, useEffect } from 'react';
import apiCalls from '../../../services/api-calls/all';
import { processedErrorMessage, processError } from '../../../services/api-calls/helpers';
import { Upload, Alert, Collapse } from 'antd';
import ButtonPrimary from '../../atoms/ButtonPrimary/button-primary';
import './_style.scss';
import MessageLoader from '../MessageLoader/message-loader';
import { showErrorMessage } from '../../../utils/alertMessages';
const { Panel } = Collapse;

const { uploadFile, validateSancorFile, uploadSancorFile } = apiCalls();
const { Dragger } = Upload;

const FileUploader = ({
  buttonText,
  createCredentials = false,
  source,
  history,
  onChangeSource,
  onUploaded,
  onValidatedFile
}) => {
  const [file, setFile] = useState(null);
  const [showContainer, setShowContainer] = useState(false);
  const [uploadResponse, setUploadResponse] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [validation, setValidation] = useState();

  const handleUpload = async () => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.set('file', file);
      formData.set('createCredentials', createCredentials);
      const uploadAction = source.name === 'sancor' ? uploadSancorFile : uploadFile;
      const response = await uploadAction(formData);
      !createCredentials && setUploadResponse(response.data);
      createCredentials && onUploaded(response);
      setUploading(false);
    } catch (error) {
      showErrorMessage(processedErrorMessage(error), processError(error));
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
    data.file.name.toLowerCase().includes('sancor') && onChangeSource({ key: '1' });
    setUploadResponse(null);
    setValidation(null);
    setShowContainer(data.fileList.length > 0);
    data.fileList.length === 0 && onValidatedFile(false)
  };

  const handleProcessFile = () => {
    onUploaded('id');
  };

  const handleValidate = async () => {
    try {
      setValidation(null);
      const formData = new FormData();
      formData.set('file', file);
      const response = await validateSancorFile(formData);
      setValidation(response.data);
    } catch (error) {
      showErrorMessage(processedErrorMessage(error), processError(error));
    }
  };

  const renderButtons = () => {
    if (uploadResponse && uploadResponse.totalErrorsRows === 0) {
      onValidatedFile(true)
      return (
        <ButtonPrimary
          text="Crear credenciales"
          theme="ThemePrimary"
          onClick={handleUpload}
          disabled={!showContainer}
        />
      );
    }
    return (
      !uploading && (
        <>
          {source.showValidate && (
            <ButtonPrimary
              text="Validar"
              theme="ThemePrimary"
              onClick={handleValidate}
              disabled={!showContainer}
            />
          )}
          <ButtonPrimary
            text={buttonText ?? 'Subir archivo'}
            theme="ThemePrimary"
            onClick={handleUpload}
            disabled={!showContainer}
          />
        </>
      )
    );
  };

  const renderUploadedInfo = () => {
    if (!uploadResponse) return null;

    const {
      totalProcessedForms,
      totalReadRows,
      totalValidRows,
      totalErrorsRows,
      errorRows
    } = uploadResponse;

    const errors = errorRows.map((err, index) => (
      <li key={index}>
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
          </div>
        )}
      </div>
    );
  };

  const renderErrorItem = item => {
    const line = item.errorHeader;
    const message = item.errorBody.split(':')[1];
    return <p className="text-error">{`${line}: ${message}`}</p>;
  };

  const renderValidation = () => {
    return (
      <>
        <Alert
          message="Proceso de validación ejecutado correctamente."
          type="info"
          closable
          showIcon
          className="my-2"
        />
        <div>
          {validation.totalErrorsRows === 0 ? (
            <Alert message="El archivo no tiene errores" type="success" closable showIcon />
          ) : (
            <>
              <Alert
                message={`Se encontraron: ${validation.totalErrorsRows} errores.`}
                type="error"
                showIcon
                className="my-2"
              />
              <Collapse>
                <Panel header="Detalle errores" key="1">
                  {validation.errorRows.map(renderErrorItem)}
                </Panel>
              </Collapse>
            </>
          )}
        </div>
      </>
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

              {validation && renderValidation()}

              <div className="buttonSection">{renderButtons()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
