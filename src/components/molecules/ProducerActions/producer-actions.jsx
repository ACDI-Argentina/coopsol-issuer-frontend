import React from 'react';
import ButtonPrimary from '../../atoms/ButtonPrimary/button-primary';
import { useRedirect } from '../../Router/redirect';
import { CREATE_PROVIDER_URL } from '../../../utils/constants';

const ProviderActions = () => {
  const { redirect, setUrlToRedirect } = useRedirect();

  return (
    <>
      {redirect()}
      <ButtonPrimary
        onClick={() => {}/* implement */}
        text="+ Nuevo Productor"
        theme="primary"
      />
    </>
  );
};

export default ProviderActions;
