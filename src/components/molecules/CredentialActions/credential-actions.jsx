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

  const { selection, emitCredentials, deleteCredentials, deleting } = useCredentials();

  const addCredential = () => {
    history.push(ADD_CREDENTIALS);
  };

  const credentialsType = selection[0]?.status;
  console.log(credentialsType) //PENDING, ACTIVE, REVOKED


  return (
    <ActionsContainer>


      {/*  Hay que ver a que tab, o en que estado estan las seleccionadas*/}
      {selection?.length > 0 && (
        <>
          {credentialsType === "PENDING" && (
            <>
              <ButtonPrimary
                onClick={deleteCredentials}
                text={deleting ? `Eliminando seleccionados...` : `- Eliminar seleccionados (${selection.length})`}
                theme="error"
                disabled={deleting}
              />
              <ButtonPrimary
                onClick={emitCredentials}
                text={`+ Emitir seleccionados (${selection.length})`}
                theme="primary"
              />
            </>
          )}
          {credentialsType === "ACTIVE" && (
             <ButtonPrimary
             onClick={deleteCredentials}
             text={deleting ? `Revocando seleccionados...` : `Revocar seleccionados (${selection.length})`}
             theme="error"
             disabled={deleting}
           />
          )}
        </>
      )}
      <ButtonPrimary onClick={addCredential} text="+ Crear nueva credencial" theme="primary" />
    </ActionsContainer>
  );
};

export default CredentialActions;
