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
  const [providerCategories, setProviderCategories] = useState([]);
  const [providerCategory, setProviderCategory] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchProviderCategories = async () => {
    try {
      const response = await getProviderCategories();
      setProviderCategories(response);
    } catch (error) {
      const errorMessage = processedErrorMessage(error);
      message.error(errorMessage);
    }
  };

  const handleSubmit = async provider => {
    try {
      if (!provider) return;
      if (Object.keys(providerCategory).length === 0) {
        message.warning('Necesitas seleccionar una categoria');
        return;
      }
      provider.categoryId = providerCategory.id;
      await createProvider(provider);
    } catch (error) {
      const errorMessage = processedErrorMessage(error);
      message.error(errorMessage);
    }
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
          Categoria: <SelectBox inputs={providerCategories} onChange={setProviderCategory} />
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
