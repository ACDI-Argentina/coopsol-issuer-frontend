import React, { useState, useRef, useEffect } from 'react';
import { Modal, Select, Input, Button, message } from 'antd';
import Lottie from 'react-lottie';
import apiCalls from '../../../services/api-calls/all';
import animationData from '../../../assets/3046-me-at-office.json';
import './_style.scss';
import TextAreaComments from '../../atoms/TextArea/text-area';
import { processedErrorMessage } from '../../../services/api-calls/helpers';
import { REASONS } from '../../../utils/tables/identities-definitions';
const { Option } = Select;

const imageOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const IdentityActions = ({ onAction, identity }) => {
  const [approveModalVisible, setApproveModalVisible] = useState(false);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [dni, setDni] = useState(identity.dni);
  const [rejectionObservations, setRejectionObservations] = useState(null);
  const [inEdition, setInEdition] = useState(false);
  const [rejectReason, setRejectReason] = useState(null);
  const { rejectIdentityRequest, approveIdentityRequest } = apiCalls();
  let editInput = useRef(null);

  const { id, name, lastName } = identity;

  const rejectRequest = () => {
    setRejectModalVisible(true);
  };

  const approveRequest = () => {
    setApproveModalVisible(true);
  };

  const approveConfirm = async () => {
    try {
      await approveIdentityRequest({ id, dni });
      message.success('Solicitud de validación de identidad aprobada.');
      onAction();
    } catch (e) {
      const errorMessage = processedErrorMessage(e);
      message.error(errorMessage);
    }
    setApproveModalVisible(false);
    setInEdition(false);
  };

  const rejectConfirm = async () => {
    try {
      await rejectIdentityRequest({ id, rejectReason, rejectionObservations });
      message.success('Solicitud de validación de identidad rechazada.');
      onAction();
    } catch (e) {
      const errorMessage = processedErrorMessage(e);
      message.error(errorMessage);
    }
    setRejectModalVisible(false);
  };

  const rejectCancel = () => {
    setRejectReason(null);
    setRejectModalVisible(false);
  };

  const handleReasonChange = value => {
    setRejectReason(value);
  };

  const approveCancel = () => {
    setInEdition(false);
    setApproveModalVisible(false);
  };

  const handleChangeDni = e => {
    setDni(e.target.value);
  };

  useEffect(() => {
    inEdition && editInput.current.focus();
  }, [inEdition]);

  return (
    <>
      <div className="identity-actions">
        <Button onClick={rejectRequest} danger>
          Rechazar
        </Button>
        <Button onClick={approveRequest} type="primary">
          Validar
        </Button>
      </div>

      <Modal width="400px" visible={approveModalVisible} onCancel={approveCancel}>
        <img src="/img/credential-success.svg" alt="approve identity" height={220} />
        <div className="title">
          <h1>Validar Identidad</h1>
        </div>
        <div className="body">
          <p>
            ¿Confirma que desea validar la identidad de {name} {lastName}, DNI{' '}
            <span>
              {inEdition ? (
                <Input
                  size="small"
                  placeholder="DNI"
                  style={{ width: 'inherit' }}
                  ref={editInput}
                  onChange={handleChangeDni}
                  minLength={7}
                  maxLength={9}
                  defaultValue={dni}
                />
              ) : (
                `${dni}`
              )}
            </span>
            ?
          </p>
        </div>
        <div className="footer">
          <p className="buttons">
            <Button onClick={approveCancel} size="large" block style={{ marginRight: 20 }}>
              Cancelar
            </Button>
            <Button onClick={approveConfirm} type="primary" size="large" block>
              {inEdition ? 'Editar y Validar' : 'Validar'}
            </Button>
          </p>
          <a href="#" onClick={() => setInEdition(true)} disabled={inEdition}>
            Editar datos de la solicitud
          </a>
        </div>
      </Modal>

      <Modal width="400px" visible={rejectModalVisible} onCancel={rejectCancel}>
        <Lottie options={imageOptions} height={200} width={200} />
        <div className="title">
          <h1>Rechazar Validación de Identidad</h1>
        </div>
        <div className="body">
          <div className="my-2">
            Por favor, indique los motivos por los cuales desea rechazar esta solicitud de
            validación de identidad.
          </div>
          <div className="my-2">
            <Select
              value={rejectReason}
              style={{ width: '100%' }}
              onChange={handleReasonChange}
              placeholder="Seleccione el motivo del rechazo *"
            >
              {REASONS.map((item, index) => (
                <Option value={item.value} key={index}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            Observaciones (opcional)
            <TextAreaComments onChange={e => setRejectionObservations(e.target.value)} />
          </div>
        </div>
        <div className="footer">
          <div className="buttons">
            <Button onClick={rejectCancel} block size="large" style={{ marginRight: 20 }}>
              Cancelar
            </Button>
            <Button
              onClick={rejectConfirm}
              danger
              disabled={!rejectReason}
              block
              size="large"
              type="primary"
            >
              Rechazar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default IdentityActions;
