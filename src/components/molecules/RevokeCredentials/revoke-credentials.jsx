import React, { useContext } from 'react';
import './_style.scss';
import { Menu, Dropdown, Modal } from 'antd';
import { useState } from 'react';
import { useApi } from '../../../services/useApi';
import api from '../../../services/api-calls/all';
import { DownOutlined } from '@ant-design/icons';
import ButtonPrimary from '../../atoms/ButtonPrimary/button-primary';
import Loader from '../../atoms/Loader/loader';
import Lottie from 'react-lottie';
import animationData from '../../../assets/3046-me-at-office.json';
import TextAreaComments from '../../atoms/TextArea/text-area';
import { AppContext } from '../../../services/providers/app-context';
import { UserContext } from '../../../services/providers/user-context';
import { showErrorMessage } from '../../../utils/alertMessages';
import { CREDIT_HOLDER_RELATIONSHIP } from '../../../utils/constants';
import { DUPLICATED_CREDENTIAL } from '../../../utils/constants';

const { revokeCredentials } = api();

const RevokeCredentials = ({
  credential,
  onRevoked,
  reasonId,
  revokeOnlyThisCredential = false
}) => {
  const [visible, setVisible] = useState(false);
  const [selectedReason, setSelectedReason] = useState(null);
  const [loading, setLoading] = useState(false);
  const credentialCall = useApi();
  const { appState } = useContext(AppContext);
  const { setUser } = useContext(UserContext);

  const handleOk = e => {
    setLoading(true);
    const params = {
      id: credential.id,
      reason: selectedReason,
      revokeOnlyThisCredential
    };
    credentialCall(revokeCredentials, params, onSuccess, onError, setUser);
  };

  const onSuccess = () => {
    setLoading(false);
    setVisible(false);
    onRevoked();
  };

  const onError = (error, status) => {
    showErrorMessage('No se pudieron revocar las credenciales, intente nuevamente.', status);
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
      {appState.revocationReasons.length ? (
        appState.revocationReasons.map(({ id, label }) => (
          <Menu.Item key={id} onClick={() => onItemClick(id)}>
            {' '}
            {label}{' '}
          </Menu.Item>
        ))
      ) : (
        <Menu.Item> Cargando razones posibles </Menu.Item>
      )}
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

  const showWarning = () => {
    return (
      credential.relationWithCreditHolder === CREDIT_HOLDER_RELATIONSHIP && (
        <p className="warning">
          Al revocar ésta credencial titular también se revocarán todas las credenciales asociadas
        </p>
      )
    );
  };

  return (
    <div className="RevokeCredentials">
      {reasonId && credential.excelErrorType == DUPLICATED_CREDENTIAL && (
        <a className="ant-dropdown-link" onClick={_ => onItemClick(reasonId)}>
          Revocar
        </a>
      )}

      {!reasonId && (
        <Dropdown overlay={menu} className="RevokeCredentials">
          <a className="ant-dropdown-link" href="/" onClick={e => e.preventDefault()}>
            Revocar <DownOutlined />
          </a>
        </Dropdown>
      )}
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
          <p>¿Confirma revocar la siguiente credencial? :</p>
          <ul>
            <li>
              Titular: <span className="bold-text">{credential.name}</span>
            </li>
            <li>
              DNI: <span className="bold-text"> {credential.dniBeneficiary}</span>{' '}
            </li>
            <li>
              Tipo: <span className="bold-text"> {credential.credentialType}</span>
            </li>
          </ul>
          {showWarning()}
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
