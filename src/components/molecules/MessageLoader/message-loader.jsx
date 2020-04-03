import React from 'react';
import './_styles.scss';
import Loader from '../../atoms/Loader/loader';

const MessageLoader = ({ loading, message }) => {
  return loading ? (
    <div className="MessageLoader">
      <Loader loading={loading} />
      <div className="message">{message}</div>
    </div>
  ) : null;
};

export default MessageLoader;
