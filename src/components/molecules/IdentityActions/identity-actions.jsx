import React from 'react';
import './_style.scss';
import ButtonPrimary from '../../atoms/ButtonPrimary/button-primary';

const IdentityActions = ({ onAction }) => {
  const handleReject = () => {
    console.log('should reject');
    // onAction();
  };

  const handleApprove = () => {
    console.log('should reject');
    // onAction();
  };

  return (
    <div className="identity-actions">
      <ButtonPrimary onClick={handleReject} text="Rechazar" theme="small error" />
      <ButtonPrimary onClick={handleApprove} text="Validar" theme="small primary" />
    </div>
  );
};

export default IdentityActions;
