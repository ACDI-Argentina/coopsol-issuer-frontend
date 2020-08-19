import React, { useState } from 'react';
import { Modal, Anchor, Button } from 'antd';
import ButtonPrimary from '../../atoms/ButtonPrimary/button-primary';
import './_style.scss';
const { Link } = Anchor;

const IdentityRejectActions = ({ onAction, identity }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const revertRequest = () => {
    setModalVisible(true);
    // onAction();
  };

  const handleConfirm = () => {
    console.log('approve identity request');
    // onAction();
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      <div className="identity-actions">
        <span className="text-error mr-2">
          <img src="/img/ban.svg" alt="check" width="12" className="mr-1" />
          Validación rechazada
        </span>
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
