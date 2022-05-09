import React from 'react';
import styled from 'styled-components';
import { useCredentials } from '../../../context/CredentialsContext';
import api from '../../../services/api-calls/all';
import { ADD_CREDENTIALS } from '../../../utils/constants';
import ButtonPrimary from '../../atoms/ButtonPrimary/button-primary';

const ActionsContainer = styled.div`
  display: flex;
  button {
    margin: 0px 5px;
  } 
`;


const CredentialActions = ({ history }) => {

  const { selection, emitCredentials, deleteCredentials } = useCredentials();

  const addCredential = () => {
    history.push(ADD_CREDENTIALS);
  };

  return (
    <ActionsContainer>

      {selection?.length > 0 && (
        <>
          <ButtonPrimary onClick={deleteCredentials} text={`- Eliminar seleccionados (${selection.length})`} theme="error" />
          <ButtonPrimary onClick={emitCredentials} text={`+ Emitir seleccionados (${selection.length})`} theme="primary" />
        </>
      )}
      <ButtonPrimary onClick={addCredential} text="+ Crear nueva credencial" theme="primary" />
    </ActionsContainer>
  );
};

export default CredentialActions;
