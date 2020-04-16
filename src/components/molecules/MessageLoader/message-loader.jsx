import React from 'react';
import './_styles.scss';
import Loader from '../../atoms/Loader/loader';

const MessageLoader = ({ loading, message }) => {
  return loading ? (
    <div className="MessageLoader">
      <div className="loader-container">
        <Loader loading={loading} />
        <div className="message">{message}</div>
      </div>
    </div>
  ) : null;
};

export default MessageLoader;
