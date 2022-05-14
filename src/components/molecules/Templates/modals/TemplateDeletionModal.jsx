import React, { useEffect, useState } from 'react';
import { Typography, Button, Input, message, Modal } from 'antd';
import styled from 'styled-components';
import DidiBackend from '../../../../services/api-calls/DidiBackend';
const { Text } = Typography;

const TemplateDeletionModal = ({ id, name, showModal, closeModal }) => {
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
        const result = await DidiBackend().templates.delete(id);

        if (result.status === "success") {
          message.success("Template eliminado exitosamente");
          closeModal();
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