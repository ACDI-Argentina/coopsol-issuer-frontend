import React from 'react';
import PropTypes from 'prop-types';
import './_style.scss';

const ImportStatus = ({ theme, text }) => {
  const classname = `import-status ${theme}`;
  return (
    <div className={classname}>
      <label>
        <img src="/img/file.svg" alt="" />
        {text}
      </label>
      <img src="/img/file-check.svg" alt="" />
    </div>
  );
};

export default ImportStatus;

ImportStatus.propTypes = {
  theme: PropTypes.string.isRequired
};
