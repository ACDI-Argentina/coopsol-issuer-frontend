import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import './_style.scss';
import ButtonPrimary from '../../atoms/ButtonPrimary/button-primary';

import { AppContext } from '../../../services/providers/app-context';
import { useHistory } from 'react-router-dom';
import DynamicInput from '../DynamicInput/DynamicInput';
import { CREDENTIAL_FIELDS } from '../../../utils/credential-definitions';


const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`

const Container = styled.div`
  flex: 1;
  max-width: 790px;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0px;
`

const FormContainer = styled.div`
  margin-bottom: 2rem;
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
    <Wrapper>
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

      <ButtonPrimary text="Guardar" theme="ThemePrimary" onClick={goBack} />
      </Container>
    </Wrapper>
  );
};

export default CredentialForm;


