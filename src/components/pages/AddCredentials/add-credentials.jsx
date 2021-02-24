import React, { useState } from 'react';
import './_style.scss';
import { Select } from 'antd';
import TitlePage from '../../atoms/TitlePage/title-page';
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
      <div className="UploadContent">
        <div>
          <TitlePage
            text="Generación de Credenciales"
            description="Completá los siguientes pasos para poder generar una credencial."
          />
          <div className="FileTypeSelection">
            <div className="UploadContent">
              <div className="left-side">
                <div>Seleccione el archivo que desea cargar:</div>
                <Select value={source.name} onChange={handleSourceChange}>
                  {CREDENTIALS_SOURCES.map((item, index) => (
                    <Option value={item.name} key={index}>
                      {item.label}
                    </Option>
                  ))}
                </Select>
                <div className="fileImportTypeTitle">
                  <h3>{`Importar datos de ${source.label}`}</h3>
                  <p>Para poder generar credenciales.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img className="right-img" src="/img/create-credential.svg" alt="createCredential" />
      </div>
      <div className="SurveyImportContainer">
        <div className="SurveyImport">
          <div className="UploadContent">
            <div className="upload-controls">
              <FileUploader
                onUploaded={onUploaded}
                history={history}
                source={source}
                onChangeSource={option => handleSourceChange(null, option)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCredentials;
