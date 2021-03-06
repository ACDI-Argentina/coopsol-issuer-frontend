import React, { useEffect, useState } from 'react';
import { Typography, Button, Input, message, Modal } from 'antd';
import styled from 'styled-components';
import DidiBackend from '../../../../services/didi/DidiBackend';
import { useTemplates } from '../../../../context/TemplatesContext';
const { Text } = Typography;

const TemplateDeletionModal = ({ id, name, showModal, closeModal }) => {
  const { loadTemplates } = useTemplates();

  return (
    <Modal
      title={"Borrar Modelo"}
      visible={showModal}
      centered={false}
      destroyOnClose={true}
      bodyStyle={{
        alignItems: "flex-start"
      }}

      onOk={async () => {
        const result = await new DidiBackend().templates().delete(id);

        if (result.status === "success") {
          message.success("Template eliminado exitosamente");
          closeModal();
          loadTemplates();
        } else {
          message.error("Ha ocurrido un error al intentar eliminar el template")
          closeModal();
        }
        console.log(result)
      }}
      onCancel={closeModal}
    >
      <Typography>
        {`Está seguro que desea eliminar el modelo ${name} ?`}
      </Typography>
    </Modal>
  )
}
export default TemplateDeletionModal;