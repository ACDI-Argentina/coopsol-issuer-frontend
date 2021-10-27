import React from 'react';

const DeclineRequest = () => {

  const onDecline = e => {
    e.preventDefault();
  };

  return (
    <div className="DeclineRequest">
      <a className="ant-dropdown-link" href="/" onClick={onDecline}>
        Rechazar solicitud
      </a>
    </div>
  );
};

export default DeclineRequest;
