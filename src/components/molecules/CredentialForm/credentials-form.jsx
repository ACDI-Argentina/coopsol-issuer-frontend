import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import './_style.scss';
import ButtonPrimary from '../../atoms/ButtonPrimary/button-primary';

import { AppContext } from '../../../services/providers/app-context';
import { useHistory } from 'react-router-dom';
import DynamicInput from '../DynamicInput/DynamicInput';
import { CREDENTIAL_FIELDS } from '../../../utils/credential-definitions';

const Container = styled.div`
  flex: 1;
  max-width: 550px; /* Add media query */
  box-sizing: border-box;
  padding: 35px 25px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background-color: rgba(255,255,255,0.75);
  align-self: center;
  border-radius: 12px;
  
`

const FormContainer = styled.div`
  margin-bottom: 2rem;
`
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0px;
`

const FormButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0px 10px;
  `


const CredentialForm = ({ type }) => {
  const history = useHistory();
  const [fields, setFields] = useState([]);
  const { setAppState } = useContext(AppContext);


  /* TODO: Buscar los campos del template desde el back, pero para renderizar por ahora nos sirve */
  useEffect(() => {
    setFields(CREDENTIAL_FIELDS[type.name]);
  }, [type])


  const goToCredentials = defaultActiveTabKey => {
    setAppState({ defaultActiveTabKey });
    history.push('/credentials');
  };

  const goBack = () => {
    history.goBack();
  };

  return (

    <Container>
      <FormContainer>
        {fields?.map((field, idx) => (
          <InputContainer key={idx}>
            {field.type !== "Boolean" && field.label}
            <DynamicInput field={field} />
          </InputContainer>
        )
        )}
      </FormContainer>

      <FormButtons>
        <ButtonPrimary text="Guardar" theme="ThemePrimary" onClick={goBack} />
      </FormButtons>
    </Container>

  );
};

export default CredentialForm;


