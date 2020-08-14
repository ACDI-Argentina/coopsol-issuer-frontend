import React from 'react';
import ButtonPrimary from '../../atoms/ButtonPrimary/button-primary';
import { useRedirect } from '../../Router/redirect';
import { PROVIDERS_URL } from '../../../utils/constants';

const ProviderActions = () => {
  const { redirect, setUrlToRedirect } = useRedirect();

  return (
    <>
      <ButtonPrimary
        onClick={() => setUrlToRedirect(PROVIDERS_URL)}
        text="+ Nuevo Prestador"
        theme="primary"
      />
    </>
  );
};

export default ProviderActions;
