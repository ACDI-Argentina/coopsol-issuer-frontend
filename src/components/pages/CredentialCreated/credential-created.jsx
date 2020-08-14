import React from 'react';
import '../AddCredentials/_style.scss';
import TitlePage from '../../atoms/TitlePage/title-page';
import { useState } from 'react';
import CredentialCreation from '../../molecules/CredentialCreation/credential-creation';
import CredentialsUploaded from '../../molecules/CredentialsUploaded/credentials-uploaded';

const CredentialCreated = ({ history }) => {
  const [showConnectedScreen, setShowConnectedScreen] = useState(false);

  const onConnected = () => {
    setShowConnectedScreen(true);
  };

  return (
    <div className="AddCredentials">
      <TitlePage text="Generación de Credenciales" />
      <div className="SurveyImportContainer">
        <div className="SurveyImport">
          {showConnectedScreen ? (
            <div className="SuccessCreation">
              <CredentialsUploaded history={history} />
              <img className="right-img" src="/img/credential-success.svg" alt="" />
            </div>
          ) : (
            <div className="UploadContent">
              <div className="left-side">
                <h3>Importar datos de encuesta socioeconómica</h3>
                <p>Para poder generar una nueva credencial suba el archivo de encuestas.</p>
                <CredentialCreation onConnected={onConnected} />
              </div>
              <img className="right-img" src="/img/create-credential.svg" alt="createCredential" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CredentialCreated;
