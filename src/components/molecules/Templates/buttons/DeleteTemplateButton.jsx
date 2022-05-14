import React, { useState } from 'react';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import TemplateDeletionModal from '../modals/TemplateDeletionModal';

const DeleteTemplateButton = ({ template }) => {

  const [showModal, setShowModal] = useState(); //not here 
  const closeModal = () => setShowModal(false); //not here 

  return (
    <>
      <Button
        title="Eliminar"
        type='link'
        style={{margin: "0px 12px", padding: "0px 10px", border:"0px", backgroundColor:"#f9f9f9"}}
        onClick={() => setShowModal(true)}
      >
        <DeleteOutlined />
      </Button>

      <TemplateDeletionModal
        id={template._id}
        name={template.name}
        showModal={showModal}
        closeModal={closeModal}
      />
    </>
  )
}
export default DeleteTemplateButton;