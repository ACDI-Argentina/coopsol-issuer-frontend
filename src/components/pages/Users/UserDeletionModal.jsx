import React, { useEffect, useState } from 'react';
import { Typography, Button, Input, message, Modal } from 'antd';

import CoopsolBackend from 'services/api-calls/CoopsolBackend';

const UserDeletionModal = ({ id, email, showModal, closeModal, onSuccess }) => {
  //const { loadUsers } = useUsers();

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
        try {
          await CoopsolBackend().users().delete(id);
          message.success("User eliminado exitosamente");
          closeModal();
          typeof onSuccess === "function" && onSuccess();
        } catch (err) {
          console.log(err);
          message.error("Ha ocurrido un error al intentar eliminar el user")
          closeModal();
        }
      }}
      onCancel={closeModal}
    >
      <Typography>
        {`Está seguro que desea eliminar el usuario ${email} ?`}
      </Typography>
    </Modal>
  )
}
export default UserDeletionModal;