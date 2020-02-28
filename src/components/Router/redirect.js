/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { createQueryString } from '../../services/api-calls/helpers';

export const useRedirect = () => {
  const [urlToRedirect, setUrlToRedirect] = useState();

  const redirect = (queryParameters = {}) => {
    const processedQueryParameters = `?${createQueryString(queryParameters)}`;
    if (urlToRedirect) {
      return (
        <Redirect
          to={{
            pathname: urlToRedirect,
            search: processedQueryParameters
          }}
        />
      );
    }
  };

  return { redirect, setUrlToRedirect };
};

export default useRedirect;
