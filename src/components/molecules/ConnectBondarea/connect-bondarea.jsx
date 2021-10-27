import React from 'react';
import { Modal } from 'antd';
import { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import ButtonPrimary from '../../atoms/ButtonPrimary/button-primary';

const ConnectBondarea = ({ credential, onRevoked }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  const onConnect = e => {
    e.preventDefault();
    setVisible(true);
    connect();
  };

  const connect = () => {
    setLoading(true);
    // credentialCall(revokeCredentials, { id: credential.id, reason: 'Test' }, onSuccess, onError);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const handleCancel = e => {
    setVisible(false);
  };

  const retry = () => {
    connect();
  };

  const viewCredentials = () => {
    window.location.reload();
  };

  const renderConnecting = () => {
    return (
      <div>
        <div className="title">
          <h1>Conectando con Bondarea...</h1>
        </div>
        <div className="body">
          <p>Estamos buscando datos nuevamente, aguarde un momento por favor...</p>
        </div>
      </div>
    );
  };

  const renderSuccess = () => {
    return (
      <div>
        <div className="title">
          <h1>Conexión exitosa...</h1>
        </div>
        <div className="body">
          <p>La conexión se realizó existosamente!</p>
          <p>La credencial se agregó correcectamente</p>
        </div>
        <div className="footer">
          <div className="buttons">
            <ButtonPrimary onClick={viewCredentials} text="Ver credenciales" theme="primary" />
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
    }
    return renderError();
  };

  return (
    <div className="ConnectBondarea">
      <a className="ant-dropdown-link" href="/" onClick={onConnect}>
        <DownOutlined /> Conectar Bondarea
      </a>
      <Modal
        width="400px"
        className="ConnectBondarea modal-buttons"
        maskClosable={false}
        visible={visible}
        closable={false}
        onCancel={handleCancel}
      >
        <ButtonPrimary
          onClick={() => {}}
          text="Forzar sincronización con Bondarea"
          theme="primary"
        />
        {renderModalStatus()}
      </Modal>
    </div>
  );
};

export default ConnectBondarea;
