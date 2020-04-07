import React from 'react';
import './_style.scss';
import ButtonPrimary from '../ButtonPrimary/button-primary';
import { ADD_CREDENTIALS } from '../../../utils/constants';

const TitlePage = ({ history }) => {
  const addCredential = () => {
    history.push(ADD_CREDENTIALS);
  };

  return (
    <div className="TitlePage">
      <div className="title">
        <h1>Credenciales</h1>
        <ButtonPrimary onClick={addCredential} text="+ Crear nueva credencial" />
      </div>
      <p className="subtitle">
        Acá podés crear credenciales, precredenciales, ver el listados de las que se encuentran
        generadas y las que están pendientes.
      </p>
    </div>
  );
};

export default TitlePage;
