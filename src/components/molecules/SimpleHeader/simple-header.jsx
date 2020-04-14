import React from 'react';
import './_style.scss';
import '../../../css/app.scss';
import { Button } from 'antd';
import history from '../../Router/history';

const SimpleHeader = () => {
  const onBack = () => {
    history.goBack();
  };

  return (
    <div className="SimpleHeader">
      <img src="/img/back.svg" alt=""/>
      <Button onClick={onBack}>Volver</Button>
    </div>
  );
};

export default SimpleHeader;
