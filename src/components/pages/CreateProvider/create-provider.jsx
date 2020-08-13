import React, { useState, useEffect } from 'react';
import { message, Spin } from 'antd';
import { PROVIDERS_URL } from '../../../utils/constants';
import apiCalls from '../../../services/api-calls/all';
import { useRedirect } from '../../Router/redirect';
import { providerInputs } from '../../../utils/form_inputs/inputs-create-provider';
import { processedErrorMessage } from '../../../services/api-calls/helpers';
import './_style.scss';
import AntForm from '../../molecules/ant-form';
import Sider from 'antd/lib/layout/Sider';
import SelectBox from '../../molecules/SelectBox/select-box';

const CreateProvider = () => {
  const { createProvider, getProviderCategories } = apiCalls();
  const { redirect, setUrlToRedirect } = useRedirect();
  const [providerCategories, setProviderCategories] = useState({});
  const [providerCategory, setProviderCategory] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchProviderCategories = async () => {
    try {
      const response = await getProviderCategories();
      console.log(response);
    } catch (error) {
      const errorMessage = processedErrorMessage(error);
      message.error(errorMessage);
    }
  };

  const handleSubmit = () => {
    console.log('submit');
  };

  const handleChange = () => {
    console.log('change');
  };

  useEffect(() => {
    fetchProviderCategories();
  }, []);

  return (
    <div className="mainSection">
      {redirect()}
      <div className="loadingComponent">{loading && <Spin tip="Loading.." />}</div>
      <div className="backAndUser">
        <button onClick={() => setUrlToRedirect(PROVIDERS_URL)}> > Back</button>
      </div>
      <div className="userDetails">
        <div className="formStyle">
          <SelectBox></SelectBox>
          <AntForm
            inputs={providerInputs}
            handleSubmit={handleSubmit}
            submitText="Create Provider"
            submitTheme="ThemePrimary"
            submitButtonClass="buttonSection"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateProvider;
