import React, { useState, useRef } from 'react';
import { Modal, Select, Input, Button } from 'antd';
import Lottie from 'react-lottie';
import animationData from '../../../assets/3046-me-at-office.json';
import './_style.scss';
import TextAreaComments from '../../atoms/TextArea/text-area';
import { useEffect } from 'react';
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
  const [localDni, setLocalDni] = useState(identity.dni);
  const [inEdition, setInEdition] = useState(false);
  const [rejectReason, setRejectReason] = useState(null);
  let editInput = useRef(null);

  const { name, lastname } = identity;
  const REASONS = ['Datos inconsistentes', 'No es Beneficiario de Semillas'];

  const rejectRequest = () => {
    setRejectModalVisible(true);
    // onAction();
  };

  const approveRequest = () => {
    setApproveModalVisible(true);
    // onAction();
  };

  const approveConfirm = () => {
    setApproveModalVisible(false);
    setInEdition(false);
    console.log('approve identity request');
    // onAction();
  };

  const rejectConfirm = () => {
    console.log('approve identity request');
    // onAction();
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
            ¿Confirma que desea validar la identidad de {name} {lastname}, DNI
            <span>
              {inEdition ? (
                <Input
                  size="small"
                  placeholder="DNI"
                  style={{ width: 'inherit' }}
                  ref={editInput}
                  onChange={e => setLocalDni(e.target.value)}
                  minLength={7}
                  maxLength={8}
                  defaultValue={localDni}
                />
              ) : (
                ` ${localDni}`
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
          <p>
            Por favor, indique los motivos por los cuales desea rechazar esta solicitud de
            validación de identidad.
          </p>
          <p>
            <Select
              value={rejectReason}
              style={{ width: '100%' }}
              onChange={handleReasonChange}
              placeholder="Seleccione el motivo del rechazo *"
            >
              {REASONS.map((value, index) => (
                <Option value={value} key={index}>
                  {value}
                </Option>
              ))}
            </Select>
          </p>
          <p>
            Obersvaciones (opcional)
            <TextAreaComments />
          </p>
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
