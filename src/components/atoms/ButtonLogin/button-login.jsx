import React from 'react';
import './_style.scss';

const ButtonLogin = ({ text, theme, onClick, iconLeft, iconRight, disabled, type, htmlType }) => {
  return (
    <div className="ButtonLogin">
      <p>{text}</p>
      <button type={type} htmltype={htmlType} onClick={onClick} disabled={disabled}>
        <img src="/img/arrow-right.svg" alt="" />
      </button>
    </div>
  );
  /* eslint-enable react/button-has-type */
};

export default ButtonLogin;
