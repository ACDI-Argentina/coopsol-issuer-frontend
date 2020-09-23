import React, { useState } from 'react';
import { Modal, Button, message } from 'antd';
import './_style.scss';
import apiCalls from '../../../services/api-calls/all';

const IdentityRejectActions = ({ onAction, identity }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { regretIdentityRequest } = apiCalls();

  const revertRequest = () => {
    setModalVisible(true);
  };

  const handleConfirm = async () => {
    try {
      await regretIdentityRequest(identity.id);
      message.success('Solicitud revertida correctamente.');
      onAction();
    } catch (e) {
      message.error('Ocurrió un error al procesar la solicitud.');
    }
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      <div className="identity-actions">
        <a href="#" onClick={revertRequest}>
          Revertir Rechazo
        </a>
      </div>

      <Modal width="400px" visible={modalVisible} onCancel={handleCancel}>
        <img src="/img/moderator.svg" alt="approve identity" height={220} />
        <div className="title">
          <h1>Revertir Rechazo</h1>
        </div>
        <div className="body">
          <p>
            Estás por revertir el rechazo de esta solicitud de validación de identidad. Al
            confirmar, volverás a ver esta solicitud pendiente de validación.
          </p>
        </div>
        <div className="footer">
          <div className="buttons">
            <Button onClick={handleCancel} block size="large" style={{ marginRight: 20 }}>
              Cancelar
            </Button>
            <Button onClick={handleConfirm} block type="primary" size="large">
              Confirmar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default IdentityRejectActions;
