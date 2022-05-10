import React from 'react';
import ButtonPrimary from '../../atoms/ButtonPrimary/button-primary';
import { useRedirect } from '../../Router/redirect';
import { CREATE_PROVIDER_URL } from '../../../utils/constants';

const ProviderActions = ({setEditingProducer}) => {
  const { redirect, setUrlToRedirect } = useRedirect();

  return (
    <>
      {redirect()}
      <ButtonPrimary
        onClick={() => setEditingProducer({})}
        text="+ Nuevo Productor"
        theme="primary"
      />
    </>
  );
};

export default ProviderActions;
