import React from 'react';
import api from '../../../services/api-calls/all';
import { ADD_CREDENTIALS } from '../../../utils/constants';
import ButtonPrimary from '../../atoms/ButtonPrimary/button-primary';
import SyncModal from '../SyncModal/sync-modal';

const { forceSyncBondarea, syncDidi } = api();

const CredentialActions = ({ history }) => {
  const addCredential = () => {
    history.push(ADD_CREDENTIALS);
  };

  return (
    <>
      <SyncModal syncCall={syncDidi} name="DIDI" />
      <SyncModal syncCall={forceSyncBondarea} name="Bondarea" />
      <ButtonPrimary onClick={addCredential} text="+ Crear nueva credencial" theme="primary" />
    </>
  );
};

export default CredentialActions;
