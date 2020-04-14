import React from 'react';
import './_style.scss';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import api from '../../../services/api-calls/all';
import FileUploader from '../../molecules/FileUploader/file-uploader';
import { useState } from 'react';
import CredentialCreation from '../../molecules/CredentialCreation/credential-creation';
import CredentialsUploaded from '../../molecules/CredentialsUploaded/credentials-uploaded';

// const { endpoint } = api();

const AddCredentials = ({ history }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showConnectedScreen, setShowConnectedScreen] = useState(false);

  const onUploaded = fileId => {
    setUploadedFile(fileId);
  };
  const onConnected = () => {
    setShowConnectedScreen(true);
  };

  return (
    <div className="AddCredentials">
      <TitlePage
        title="Generación de Credenciales"
        description="Completá los siguientes pasos para poder generar una precredencial."
      />
      <div className="SurveyImportContainer">
        <div className="SurveyImport">
          {showConnectedScreen ? (
            <div className="SuccessCreation">
              <CredentialsUploaded history={history} />
              <img className="right-img" src="/img/credential-success.svg" alt="" />
            </div>
          ) : (
            <div className="UploadContent">
              <div>
                <h3>Importar datos de encuesta socioeconómica</h3>
                <p>Para poder generar una nueva credencial suba el archivo de encuestas.</p>
                {!uploadedFile ? (
                  <FileUploader onUploaded={onUploaded} history={history} />
                ) : (
                  <CredentialCreation uploadedFile={uploadedFile} onConnected={onConnected} />
                )}
              </div>
              <img className="right-img" src="/img/create-credential.svg" alt="createCredential" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCredentials;
