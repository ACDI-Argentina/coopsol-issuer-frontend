import React from 'react';
import { Modal } from 'antd';
import { useState } from 'react';
import './_style.scss';
import { useApi } from '../../../services/useApi';
import api from '../../../services/api-calls/all';
import ButtonPrimary from '../../atoms/ButtonPrimary/button-primary';

const { forceSyncBondarea } = api();

const SyncBondareaModal = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const syncBondarea = useApi();

  const onClick = e => {
    e.preventDefault();
    setVisible(true);
  };

  const handleCancel = e => {
    setVisible(false);
  };

  const onSync = () => {
    setLoading(true);
    syncBondarea(forceSyncBondarea, {}, onSuccess, onError);
  };

  const retry = () => {
    onSync();
  };

  const onSuccess = () => {
    setLoading(false);
    setSuccess(true);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  const renderConnecting = () => {
    return (
      <div>
        <div className="title">
          <h1>Sincronizando con Bondarea...</h1>
        </div>
        <div className="body">
          <p>Aguarde un momento por favor...</p>
        </div>
      </div>
    );
  };

  const renderSuccess = () => {
    return (
      <div>
        <div className="title">
          <h1>Sincronización exitosa...</h1>
        </div>
        <div className="body">
          <p>La sincronización se realizó existosamente!</p>
        </div>
        <div className="footer">
          <div className="buttons">
            <ButtonPrimary onClick={handleCancel} text="Terminar" theme="primary" />
          </div>
        </div>
      </div>
    );
  };
  const renderModal = () => {
    return (
      <div>
        <div className="title">
          <h1>Sincronizar con Bondarea</h1>
        </div>
        <div className="body">
          <p>¿Desea forzar la sincronización con Bondarea?</p>
        </div>
        <div className="footer">
          <div className="buttons">
            <ButtonPrimary onClick={handleCancel} text="Cancelar" theme="cancel" />
            <ButtonPrimary onClick={onSync} text="Aceptar" theme="primary" />
          </div>
        </div>
      </div>
    );
  };

  const renderError = () => {
    return (
      <div>
        <div className="title">
          <h1>Conexión erronea</h1>
        </div>
        <div className="body">
          <p>No se pudo conectar exitosamente con los créditos Bondarea.</p>
        </div>
        <div className="footer">
          <div className="buttons">
            <ButtonPrimary onClick={handleCancel} text="Cancelar" theme="cancel" />
            <ButtonPrimary onClick={retry} text="Reintentar" theme="primary" />
          </div>
        </div>
      </div>
    );
  };

  const renderModalStatus = () => {
    if (loading) {
      return renderConnecting();
    } else if (success) {
      return renderSuccess();
    } else if (error) {
      return renderError();
    }
    return renderModal();
  };

  return (
    <React.Fragment>
      <ButtonPrimary
        onClick={onClick}
        text="Forzar sincronización con Bondarea"
        theme="primary SyncBondarea"
      />
      <Modal
        width="400px"
        className="SyncBondarea modal-buttons"
        maskClosable={false}
        visible={visible}
        closable={false}
        onCancel={handleCancel}
      >
        {renderModalStatus()}
      </Modal>
    </React.Fragment>
  );
};

export default SyncBondareaModal;
