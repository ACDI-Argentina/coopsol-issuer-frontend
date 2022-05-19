import React, { useEffect, useState } from 'react';
import './_style.scss';
import { Select } from 'antd';
import TitlePage from '../../atoms/TitlePage/title-page';
import CredentialForm from '../../molecules/CredentialForm/credentials-form';
import SubjectAutoComplete from '../../molecules/SubjectAutoComplete/SubjectAutoComplete';
import styled from 'styled-components';
import DidiBackend from '../../../services/api-calls/DidiBackend';


const { Option } = Select;


const Wrapper = styled.div`
  background-image: url("/img/create-credential.svg");
  background-repeat: no-repeat;
  background-position: bottom 15px right 15px;
  background-size: 250px;

  display: flex;
  min-height: 100vh;
  justify-content: center;
`;
  
  
  const Content = styled.div`
  display: flex;
  max-width: 1500px;
  width: 100%;
  flex-wrap: wrap;
`

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

const LabelContainer = styled.div`
  margin-bottom:  0.4rem;
`



const AddCredentials = ({ }) => {

  const [template, setTemplate] = useState();
  const [subject, setSubject] = useState();
  const [templates, setTemplates] = useState();

  /* Template context, con los datos cargados */
  useEffect(() => {
    (async function () {
      const templates = await DidiBackend().templates.find();
      console.log(templates)
      setTemplates(templates)
      const template = await DidiBackend().templates.get(templates[0]._id);
      setTemplate(template);
    })();
  }, [])


  return (
    <Wrapper>
      <Content>
        <Left>
          <TitlePage
            text="Generación de Credenciales"
            description="Completá los siguientes pasos para poder generar una credencial."
          />

          <div className='container'>
            <LabelContainer>Seleccione el tipo de credencial que desea emitir</LabelContainer>

            <Select
              className="credentialTypesSelect"
              value={template?.name}
              onChange={async (_id) => {
                const template = await DidiBackend().templates.get(_id);
                setTemplate(template);
                console.log(template)
              }}
            >
              {templates?.map((template) => (
                <Option key={template._id} value={template._id} >
                  {template.name}
                </Option>
              ))}
            </Select>
          </div>

          <div className='container'>
            <LabelContainer>Buscar el sujeto de la credencial</LabelContainer>
            <SubjectAutoComplete
              onSubjectSelect={setSubject}
            />
          </div>
        </Left>


        {template && (
          <FormContainer>
            <CredentialForm
              template={template}
              subject={subject}
            />
          </FormContainer>

        )}
      </Content>
    </Wrapper>
  );
};

export default AddCredentials;
