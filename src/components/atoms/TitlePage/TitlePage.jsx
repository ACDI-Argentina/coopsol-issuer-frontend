import React from 'react';
import './_style.scss';
import ButtonPrimary from '../ButtonPrimary/button-primary';

const TitlePage = () => {
  return (
    <div className="TitlePage">
      <div className="title">
        <h1>Credenciales</h1>
        <ButtonPrimary text="+ Crear nueva credencial" />
      </div>
      <p className="subtitle">
        Acá podés crear credenciales, precredenciales, ver el listados de las que se encuentran
        generadas y las que están pendientes.
      </p>
    </div>
  );
};

export default TitlePage;
