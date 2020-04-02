import React from 'react';
import './_styles.scss';

const Loader = ({ loading }) => {
  return loading ? <div class="loader">Loading...</div> : null;
};

export default Loader;
