import React from 'react';
import './_style.scss';
import TitlePage from '../../atoms/TitlePage/title-page';
import FileUploader from '../../molecules/FileUploader/file-uploader';
import { CREATED_CREDENTIALS } from '../../../utils/constants';

const AddCredentials = ({ history }) => {
  const onUploaded = fileId => {
    history.push(CREATED_CREDENTIALS);
  };

  return (
    <div className="AddCredentials">
      <TitlePage
        text="Generación de Credenciales"
        description="Completá los siguientes pasos para poder generar una credencial."
      />
      <div className="SurveyImportContainer">
        <div className="SurveyImport">
          <div className="UploadContent">
            <div className="left-side">
              <h3>Importar datos de encuesta socioeconómica</h3>
              <p>Para poder generar una nueva credencial suba el archivo de encuestas.</p>
              <FileUploader onUploaded={onUploaded} history={history} />
            </div>
            <img className="right-img" src="/img/create-credential.svg" alt="createCredential" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCredentials;
