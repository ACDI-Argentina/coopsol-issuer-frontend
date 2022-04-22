import React, { useState } from 'react';
import './_style.scss';
import { Select } from 'antd';
import TitlePage from '../../atoms/TitlePage/title-page';
import FileUploader from '../../molecules/FileUploader/file-uploader';
import { CREATED_CREDENTIALS } from '../../../utils/constants';
import { CREDENTIALS_TYPES } from '../../../utils/credential-definitions';
import CredentialForm from '../../molecules/CredentialForm/credentials-form';
import SubjectAutoComplete from '../../molecules/SubjectAutoComplete/SubjectAutoComplete';
import styled from 'styled-components';


const { Option } = Select;


const Wrapper = styled.div`
  background-image: url("/img/create-credential.svg");
  background-repeat: no-repeat;
  background-position: bottom 15px right 15px;
  background-size: 250px;

  display: flex;
  min-height: 100vh;
  flex-wrap: wrap;
`;

const Left = styled.div`
  flex: 1;
`
  
  const FormContainer = styled.div`
  box-sizing: border-box;
  flex: 1;
  display: flex;
  justify-content: center;
  align-content: center;
  
  margin-top: 30px;
  margin-bottom: 30px;
  @media (min-width: 744px) {
    margin-top: 85px; 
  }
  @media (min-width: 560px) {
    padding: 0px 1.4rem 30px 1.4rem;
  }
  min-width: 50%;
`

const LabelContainer =  styled.div`
  margin-bottom:  0.4rem;
`



const AddCredentials = ({ history }) => {
  const [source, setSource] = useState(CREDENTIALS_TYPES[0]);

  const handleSourceChange = (v, option) => {
    setSource(CREDENTIALS_TYPES[option.key]);
  };

  return (
    <Wrapper>
      <Left>

        <TitlePage
          text="Generación de Credenciales"
          description="Completá los siguientes pasos para poder generar una credencial."
        />

        <div className='container'>
          <LabelContainer>Seleccione el tipo de credencial que desea emitir</LabelContainer>

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

        <div className='container'>
          <LabelContainer>Buscar el sujeto de la credencial</LabelContainer>
          <SubjectAutoComplete
            onSubjectSelect={subject => {
              console.log(subject);
            }}
          />
        </div>


      </Left>

      <FormContainer>
          <CredentialForm
            type={source}
          /* on submit.. */
          />
      </FormContainer>
    </Wrapper>
  );
};

export default AddCredentials;
