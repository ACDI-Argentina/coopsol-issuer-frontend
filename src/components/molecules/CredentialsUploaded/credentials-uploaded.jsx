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
    <div className="left-side-success-upload">
      <ImportStatus text="Archivo cargado con éxito!" theme="check" />
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
