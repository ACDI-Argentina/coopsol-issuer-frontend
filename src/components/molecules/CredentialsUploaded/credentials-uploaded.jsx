import React from 'react';
import './_style.scss';
import ButtonPrimary from '../../atoms/ButtonPrimary/button-primary';
import ImportStatus from '../../atoms/ImportStatus/import-status';

// const { endpoint } = api();

const CredentialsUploaded = ({ history, theme }) => {
  const goToCredentials = () => {
    history.push('/credentials');
  };
  return (
    <div className="left-side">
      <h3>Ya están creadas las credenciales</h3>
      <p>El proceso de creación fue realizado correctamente.</p>

      <ImportStatus text="Archivo de encuestas" theme="check" />
      <ImportStatus text="Conexión con Bondarea" theme="pending" />
      <div className="buttonSection">
        <ButtonPrimary
          text="Ir al listado de credenciales"
          theme="ThemePrimary"
          onClick={goToCredentials}
        />
      </div>
    </div>
  );
};

export default CredentialsUploaded;
