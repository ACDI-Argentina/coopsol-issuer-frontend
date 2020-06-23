import React from 'react';
import './_style.scss';
import ButtonPrimary from '../ButtonPrimary/button-primary';
import { ADD_CREDENTIALS } from '../../../utils/constants';
import SyncBondareaModal from '../../molecules/SyncBondarea/sync-bondarea';

const TitlePage = ({ history, text, description }) => {
  const addCredential = () => {
    history.push(ADD_CREDENTIALS);
  };

  return (
    <div className="TitlePage">
      <div className="title">
        <h1>{text}</h1>
        <div>
          <SyncBondareaModal />
          <ButtonPrimary onClick={addCredential} text="+ Crear nueva credencial" theme="primary" />
        </div>
      </div>
      <p className="subtitle">{description}</p>
    </div>
  );
};

export default TitlePage;
