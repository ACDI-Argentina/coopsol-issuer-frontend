import React, { useEffect } from 'react';
import './_style.scss';
import { Menu, Dropdown, Modal, message } from 'antd';
import { useState } from 'react';
import { useApi } from '../../../services/useApi';
import api from '../../../services/api-calls/all';
import { DownOutlined } from '@ant-design/icons';
import ButtonPrimary from '../../atoms/ButtonPrimary/button-primary';

const { revokeCredentials } = api();

const RevokeCredentials = () => {
  const [visible, setVisible] = useState(false);
  const [selectedRevokeType, setSelectedRevokeType] = useState(null);

  const credentialCall = useApi();

  const handleOk = e => {
    setVisible(false);
    credentialCall(revokeCredentials, { id: selectedRevokeType }, onSuccess, onError);
  };

  const onSuccess = () => {
    setVisible(false);
  };

  const onError = () => {
    message.error('No se pudieron revocar las credenciales, intente nuevamente.');
  };

  const handleCancel = e => {
    console.log(e);
    setVisible(false);
  };

  const onItemClick = id => {
    setSelectedRevokeType(id);
    setVisible(true);
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={() => onItemClick('mora')}>Mora</Menu.Item>
      <Menu.Item onClick={() => onItemClick('creditEnd')}>Fin del credito</Menu.Item>
      <Menu.Item onClick={() => onItemClick('death')}>Fallecimiento</Menu.Item>
      <Menu.Item onClick={() => onItemClick('leave')}>Desvinculación</Menu.Item>
    </Menu>
  );

  return (
    <div className="RevokeCredentials">
      <Dropdown overlay={menu} className="RevokeCredentials">
        <a className="ant-dropdown-link" href="" onClick={e => e.preventDefault()}>
          Revocar credencial <DownOutlined />
        </a>
      </Dropdown>
      <Modal width="400px" className="RevokeCredentials" visible={visible} onCancel={handleCancel}>
        <div className="title">
          <h1>Revocar credencial</h1>
        </div>
        <div className="body">¿Seguro que quiere revocar esta credencial?</div>

        <div className="footer">
          <ButtonPrimary onClick={handleOk} text="Cancelar" />
          <ButtonPrimary onClick={handleCancel} text="Confirmar" />
        </div>
      </Modal>
    </div>
  );
};

export default RevokeCredentials;
