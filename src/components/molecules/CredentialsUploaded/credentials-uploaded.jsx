import React, { useContext } from 'react';
import './_style.scss';
import ButtonPrimary from '../../atoms/ButtonPrimary/button-primary';
import ImportStatus from '../../atoms/ImportStatus/import-status';
import { AppContext } from '../../../services/providers/app-context';

const CredentialsUploaded = ({ history }) => {
  const { setAppState } = useContext(AppContext);

  const goToCredentials = defaultActiveTabKey => {
    setAppState({ defaultActiveTabKey });
    history.push('/credentials');
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="left-side">
      <h3>Las Credenciales fueron creadas de manera exitosa.</h3>
      <p>El proceso de creación fue realizado correctamente.</p>

      <ImportStatus text="Archivo de encuestas" theme="check" />
      <div className="buttonSection">
        <ButtonPrimary
          text="Ir al listado de credenciales"
          theme="ThemePrimary"
          onClick={() => goToCredentials('4')}
        />
        <ButtonPrimary text="Seguir cargando" theme="ThemePrimary" onClick={goBack} />
      </div>
    </div>
  );
};

export default CredentialsUploaded;
