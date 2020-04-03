import React from 'react';
import './_styles.scss';

const Loader = ({ loading }) => {
  return loading ? <div className="loader">Loading...</div> : null;
};

export default Loader;
