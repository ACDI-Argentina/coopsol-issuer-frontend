import React from 'react';
import './_style.scss';
import { Menu, Dropdown, Modal, message } from 'antd';
import { useState } from 'react';
import { useApi } from '../../../services/useApi';
import api from '../../../services/api-calls/all';
import { DownOutlined } from '@ant-design/icons';
import ButtonPrimary from '../../atoms/ButtonPrimary/button-primary';
import Loader from '../../atoms/Loader/loader';
import Lottie from 'react-lottie';
import animationData from '../../../assets/3046-me-at-office.json';
import TextAreaComments from '../../atoms/TextArea/text-area';

const { revokeCredentials } = api();

const RevokeCredentials = ({ credential, onRevoked }) => {
  const [visible, setVisible] = useState(false);
  const [selectedReason, setSelectedReason] = useState(null);
  const [loading, setLoading] = useState(false);

  const credentialCall = useApi();

  const handleOk = e => {
    setLoading(true);
    credentialCall(revokeCredentials, { id: credential.id, reason: 'Test' }, onSuccess, onError);
  };

  const onSuccess = () => {
    setLoading(false);
    setVisible(false);
    onRevoked();
  };

  const onError = () => {
    message.error('No se pudieron revocar las credenciales, intente nuevamente.');
  };

  const handleCancel = e => {
    console.log(e);
    setVisible(false);
  };

  const onItemClick = id => {
    setSelectedReason(id);
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
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="RevokeCredentials">
      <Dropdown overlay={menu} className="RevokeCredentials">
        <a className="ant-dropdown-link" href="/" onClick={e => e.preventDefault()}>
          Revocar <DownOutlined />
        </a>
      </Dropdown>
      <Modal
        width="400px"
        className="RevokeCredentials modal-buttons"
        visible={visible}
        onCancel={handleCancel}
      >
        <Lottie options={defaultOptions} height={250} width={250} />
        <div className="title">
          <h1>Revocar credencial</h1>
        </div>
        <div className="body">
          <p>
            Por favor, indique los motivos por los cuales
            <br />
            desea revocar esta credencial.
          </p>
          <label htmlFor="">Motivos de revocación</label>
          <TextAreaComments text="Motivos de revocación" />
        </div>
        <div className="footer">
          <div className="buttons">
            <ButtonPrimary onClick={handleCancel} text="Cancelar" theme="cancel" />
            <ButtonPrimary onClick={handleOk} text="Confirmar" theme="primary" />
          </div>

          <Loader loading={loading} />
        </div>
      </Modal>
    </div>
  );
};

export default RevokeCredentials;
