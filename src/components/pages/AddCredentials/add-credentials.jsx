import React, { useState } from 'react';
import './_style.scss';
import { Select } from 'antd';
import TitlePage from '../../atoms/TitlePage/title-page';
import FileUploader from '../../molecules/FileUploader/file-uploader';
import { CREATED_CREDENTIALS } from '../../../utils/constants';
import { CREDENTIALS_TYPES } from '../../../utils/credential-definitions';
import CredentialForm from '../../molecules/CredentialForm/credentials-form';
import SubjectAutoComplete from '../../molecules/SubjectAutoComplete/SubjectAutoComplete';


const { Option } = Select;

const AddCredentials = ({ history }) => {
  const [source, setSource] = useState(CREDENTIALS_TYPES[0]);

  const handleSourceChange = (v, option) => {
    setSource(CREDENTIALS_TYPES[option.key]);
  };

  return (
    <div className="AddCredentials">
      <div className="UploadContent">
        <div>
          <TitlePage
            text="Generación de Credenciales"
            description="Completá los siguientes pasos para poder generar una credencial."
          />

          <div className='container'>
            <div>Buscar el sujeto de la credencial</div>
            <SubjectAutoComplete 
              onSubjectSelect={subject => {
                console.log(subject);
              }}
             />
          </div>
          <div className='container'>
            <div>Seleccione el tipo de credencial que desea emitir</div>

            <Select
              className="credentialTypesSelect"
              value={source.name}
              onChange={handleSourceChange}
            >
              {CREDENTIALS_TYPES.map((item, index) => (
                <Option value={item.name} key={index}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </div>



        </div>
        <img className="right-img" src="/img/create-credential.svg" alt="createCredential" />
      </div>

      <div className="SurveyImportContainer">
        <div className="SurveyImport">
          <div className="UploadContent">
            <div className="upload-controls">
              <CredentialForm
                type={source}
              /* on submit.. */
              />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCredentials;
