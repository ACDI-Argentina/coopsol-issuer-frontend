import React, { useEffect, useState } from 'react';
import ButtonPrimary from '../../atoms/ButtonPrimary/button-primary';
import { useRedirect } from '../../Router/redirect';
import NewTemplateModal from '../Templates/modals/NewTemplateModal';


const ProviderActions = () => {
  const [showModal, setShowModal] = useState();
  const { redirect, setUrlToRedirect } = useRedirect();
  const closeModal = () => { setShowModal(false); }
  return (
    <>
      {redirect()}
      <ButtonPrimary
        onClick={() => setShowModal(true)}
        text="+ Nuevo Template"
        theme="primary"
      />

      <NewTemplateModal
        showModal={showModal}
        closeModal={closeModal}
      />
      
    </>
  );
};

export default ProviderActions;
