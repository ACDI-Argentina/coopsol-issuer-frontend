import React from 'react';
import PropTypes from 'prop-types';
import './_style.scss';

const ButtonPrimary = ({ text, theme, onClick, iconLeft, iconRight, disabled, type, htmlType }) => {
  const classname = `ButtonPrimary ${theme}`;
  /* eslint-disable react/button-has-type */
  return (
    <button
      type={type}
      htmltype={htmlType}
      className={classname}
      onClick={onClick}
      disabled={disabled}
    >
      <p>
        {iconLeft} {text} {iconRight}
      </p>
    </button>
  );
  /* eslint-enable react/button-has-type */
};

ButtonPrimary.propTypes = {
  disabled: PropTypes.bool,
  htmlType: PropTypes.string,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  theme: PropTypes.string,
  type: PropTypes.string
};

ButtonPrimary.defaultProps = {
  disabled: undefined,
  iconLeft: undefined,
  iconRight: undefined,
  type: 'button',
  htmlType: undefined,
  onClick: () => {}
};

export default ButtonPrimary;
