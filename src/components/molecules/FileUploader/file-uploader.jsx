import React, { useState } from 'react';
import { Upload, Alert, Collapse, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import apiCalls from '../../../services/api-calls/all';
import { processedErrorMessage, processError } from '../../../services/api-calls/helpers';
import ButtonPrimary from '../../atoms/ButtonPrimary/button-primary';
import MessageLoader from '../MessageLoader/message-loader';
import UploadedInfo from './uploaded-info';
import { showErrorMessage } from '../../../utils/alertMessages';
import { DUPLICATED_CREDENTIAL } from '../../../utils/constants';
import { CREDENTIAL_CATEGORIES } from '../../../utils/credential-definitions';

import './_style.scss';

const { Panel } = Collapse;
const { Dragger } = Upload;

const { uploadFile, validateSancorFile, uploadSancorFile } = apiCalls();

const FileUploader = ({ buttonText, source, onChangeSource, onUploaded, onSuccessRequest }) => {
  const [file, setFile] = useState(null);
  const [showContainer, setShowContainer] = useState(false);
  const [uploadResponse, setUploadResponse] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [validation, setValidation] = useState();

  const handleUpload = async (createCredentials = false, skipIdentityCredentials = false) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.set('file', file);
      formData.set('createCredentials', createCredentials);
      formData.set('skipIdentityCredentials', skipIdentityCredentials);
      const uploadAction = source.name === 'sancor' ? uploadSancorFile : uploadFile;
      const response = await uploadAction(formData);
      if (onSuccessRequest && response.data.downloadableFileName) {
        onSuccessRequest(response);
      } else {
        !createCredentials && setUploadResponse(response.data);
        createCredentials && onUploaded(response);
      }
      setUploading(false);
    } catch (error) {
      showErrorMessage(processedErrorMessage(error), processError(error));
      setUploadResponse(null);
      setUploading(false);
    }
  };

  const handleUploadSkipping = () => {
    Modal.confirm({
      title: '¿Desea continuar?',
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          <p>
            Para reemplazar las credenciales de identidad duplicadas, primero debés revocar
            manualmente las anteriores.
          </p>
          <p>
            En caso de continuar,{' '}
            <strong>
              los cambios en las Credenciales de Identidad duplicadas serán descartados
            </strong>
            .
          </p>
        </div>
      ),
      onOk() {
        handleUpload(true, true);
      }
    });
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
  };

  const onRevoke = () => handleUpload();

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

  const isDuplicatedIdentity = err => {
    return (
      err.errorType === DUPLICATED_CREDENTIAL &&
      err.category?.includes(CREDENTIAL_CATEGORIES.identity)
    );
  };

  const hasOnlyDuplicatedIdentityCredentials = () => {
    const { errorRows } = uploadResponse;
    return errorRows.length && errorRows.every(isDuplicatedIdentity);
  };

  const hasResponseErrors = uploadResponse && uploadResponse.totalErrorsRows > 0;

  const renderCreateButton = () => {
    if (!uploadResponse) return;
    let action;
    if (!hasResponseErrors || hasOnlyDuplicatedIdentityCredentials()) {
      action = !hasResponseErrors ? handleUpload : handleUploadSkipping;
      return (
        <ButtonPrimary
          text="Crear credenciales"
          theme="ThemePrimary"
          onClick={() => action(true)}
          disabled={!showContainer}
        />
      );
    }
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
              <UploadedInfo
                uploadResponse={uploadResponse}
                onRevoke={onRevoke}
                revokeOnlyThisCredential
              />

              <MessageLoader loading={uploading} message={'Subiendo archivo...'} />

              {validation && renderValidation()}

              <div className="buttonSection">
                {renderCreateButton()}

                {!uploading && !uploadResponse && (
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
                      onClick={() => handleUpload()}
                      disabled={!showContainer}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
