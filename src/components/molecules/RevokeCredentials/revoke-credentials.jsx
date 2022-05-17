/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import './_style.scss';
import { Menu, Dropdown, Modal, message } from 'antd';
import { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import ButtonPrimary from '../../atoms/ButtonPrimary/button-primary';
import Loader from '../../atoms/Loader/loader';
import Lottie from 'react-lottie';
import animationData from '../../../assets/3046-me-at-office.json';
import { AppContext } from '../../../services/providers/app-context';
import { DUPLICATED_CREDENTIAL } from '../../../utils/constants';
import { parseDate } from '../../../utils/dateHelpers';
import DidiBackend from '../../../services/api-calls/DidiBackend';
import { useCredentials } from '../../../context/CredentialsContext';


const RevokeCredentials = ({
  status,
  credential,
  reasonId,
}) => {
  const [visible, setVisible] = useState(false);
  const [selectedReason, setSelectedReason] = useState(null);
  const [loading, setLoading] = useState(false);
  const { appState } = useContext(AppContext);
  const { loadCredentials } = useCredentials();
   

  const handleOk = async e => {
    setLoading(true);

    try{
      await DidiBackend().credentials.revoke(credential._id, selectedReason.value);
      setLoading(false);
      onSuccess();
    } catch(err){
      setLoading(false);
      console.log(err);
      return onError(err);
    }
  };

  const onSuccess = () => {
    setVisible(false);
    message.success("La credencial se ha revocado exitosamente");
    loadCredentials({ status });
    loadCredentials({status: "REVOKED"})
  };

  const onError = (error, status) => {
    message.error('No se pudieron revocar las credenciales, intente nuevamente.', status);
  };

  const handleCancel = e => {
    console.log(e);
    setVisible(false);
  };

  const onItemClick = reason => {
    setSelectedReason(reason);
    setVisible(true);
  };

  //console.log(`RevokationReasons:`,appState.revocationReasons)


  const menu = (
    <Menu>
      {appState.revocationReasons.length ? (
        appState.revocationReasons.map(({ id, label, value }) => (
          <Menu.Item key={id} onClick={() => onItemClick({id, label, value})}>
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

  return (
    <div className="RevokeCredentials">
      {reasonId && credential.excelErrorType === DUPLICATED_CREDENTIAL && (
        <a href="#" className="ant-dropdown-link" onClick={_ => onItemClick(reasonId)}>
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
        footer={null}
      >
        <Lottie options={defaultOptions} height={250} width={250} />
        <div className="title">
          <h1>Revocar credencial</h1>
        </div>
        <div className="body">
          <p>¿Confirma revocar la siguiente credencial? :</p>
          <ul>
            <li>
              Titular: <span className="bold-text">{credential.firstName} {credential.lastName}</span>
            </li>
            <li>
              Tipo: <span className="bold-text"> {credential.name}</span>
            </li>
            <li>
              Creación: <span className="bold-text"> {parseDate(credential.createdOn)}</span>{' '}
            </li>
          </ul>
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
