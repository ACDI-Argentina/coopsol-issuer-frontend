import React from 'react';
import ButtonPrimary from '../../atoms/ButtonPrimary/button-primary';
import { useRedirect } from '../../Router/redirect';
import { CREATE_TEMPLATE_URL } from '../../../utils/constants';

const ProviderActions = () => {
  const { redirect, setUrlToRedirect } = useRedirect();

  return (
    <>
      {redirect()}
      <ButtonPrimary
        onClick={() => setUrlToRedirect(CREATE_TEMPLATE_URL)}
        text="+ Nuevo Template"
        theme="primary"
      />
    </>
  );
};

export default ProviderActions;
