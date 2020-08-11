import React, { useState } from 'react';
import './_style.scss';
import { Select } from 'antd';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import FileUploader from '../../molecules/FileUploader/file-uploader';
import { CREATED_CREDENTIALS } from '../../../utils/constants';
import { CREDENTIALS_SOURCES } from '../../../utils/credential-definitions';

const { Option } = Select;

const AddCredentials = ({ history }) => {

  const [source, setSource] = useState(CREDENTIALS_SOURCES[0]);

  const onUploaded = fileId => {
    history.push(CREATED_CREDENTIALS);
  };

  const handleSourceChange = (v, option) => {
    setSource(CREDENTIALS_SOURCES[option.key]);
  };

  return (
    <div className="AddCredentials">
      <TitlePage
        text="Generación de Credenciales"
        description="Completá los siguientes pasos para poder generar una credencial."
      />
      <div className="SurveyImportContainer">
        <div className="my-3">
          <div>
            Seleccione el tipo de encuesta que desea cargar:
          </div>
          <Select value={source.name} style={{ width: 260 }} onChange={handleSourceChange}>
            { CREDENTIALS_SOURCES.map((item, index) => <Option value={item.name} key={index}>{item.label}</Option>) }
          </Select>
        </div>
        <div className="SurveyImport">
          <div className="UploadContent">
            <div className="left-side">
              <h3>{`Importar datos de ${source.label}`}</h3>
              <p>Para poder generar una nueva credencial suba el archivo de encuestas.</p>
              <FileUploader 
                onUploaded={onUploaded} 
                history={history} 
                source={source} 
                onChangeSource={(option) => handleSourceChange(null, option)} 
              />
            </div>
            <img className="right-img" src="/img/create-credential.svg" alt="createCredential" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCredentials;
