import React from 'react';
import { Modal } from 'antd';
import { useState } from 'react';
import './_style.scss';
import { useApi } from '../../../services/useApi';
import ButtonPrimary from '../../atoms/ButtonPrimary/button-primary';

const SyncModal = ({ syncCall, name }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const sync = useApi();

  const onClick = e => {
    e.preventDefault();
    setVisible(true);
  };

  const handleCancel = e => {
    setVisible(false);
  };

  const onClose = () => {
    setSuccess(false);
    setError(false);
  };

  const onSync = () => {
    setLoading(true);
    sync(syncCall, {}, onSuccess, onError);
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
          <h1>Sincronizando con {name}...</h1>
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
          <h1>Sincronizar con {name}</h1>
        </div>
        <div className="body">
          <p>¿Desea sincronizar con {name}?</p>
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
          <p>No se pudo conectar exitosamente con {name}.</p>
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
      <ButtonPrimary onClick={onClick} text={`Sincronizar ${name}`} theme="primary SyncModal" />
      <Modal
        width="400px"
        className="SyncModal modal-buttons"
        maskClosable={false}
        afterClose={onClose}
        visible={visible}
        closable={false}
        onCancel={handleCancel}
      >
        {renderModalStatus()}
      </Modal>
    </React.Fragment>
  );
};

export default SyncModal;
