import React, { useState, useEffect } from 'react';
import { message, Spin, Row, Col, Checkbox } from 'antd';
import { PROVIDERS_URL } from '../../../utils/constants';
import apiCalls from '../../../services/api-calls/all';
import { useRedirect } from '../../Router/redirect';
import { providerInputs } from '../../../utils/form_inputs/inputs-create-provider';
import { processedErrorMessage, isSuccess } from '../../../services/api-calls/helpers';
import './_style.scss';
import AntForm from '../../molecules/ant-form';
import { useParams } from 'react-router-dom';
import SelectBox from '../../molecules/SelectBox/select-box';

const CreateProvider = () => {
  const { createProvider, getProviderCategories, editProvider, getProviderById } = apiCalls();
  const { redirect, setUrlToRedirect } = useRedirect();
  const [providerCategories, setProviderCategories] = useState([]);
  const [values, setValues] = useState(null);
  const [providerCategory, setProviderCategory] = useState({});
  const [providerActive, setProviderActive] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const isEdition = !!id;

  const fetchProviderCategories = async () => {
    try {
      const response = await getProviderCategories();
      setProviderCategories(response);
    } catch (error) {
      const errorMessage = processedErrorMessage(error);
      message.error(errorMessage);
    }
  };

  const makeCreate = async provider => {
    return await createProvider(provider);
  };

  const makeEdit = async provider => {
    return await editProvider({ ...provider, id });
  };

  const handleSubmit = async provider => {
    try {
      if (!provider) return;
      if (Object.keys(providerCategory).length === 0) {
        message.warning('Necesitas seleccionar una categoria');
        return;
      }
      provider.active = providerActive;
      provider.description = provider.description ?? '';
      provider.categoryId = providerCategory.id;
      const response = isEdition ? await makeEdit(provider) : await makeCreate(provider);
      if (isSuccess(response)) {
        const successMessage = `Prestador ${isEdition ? 'actualizado' : 'creado'}.`;
        message.success(successMessage);
        setUrlToRedirect(PROVIDERS_URL);
      }
    } catch (error) {
      const errorMessage = processedErrorMessage(error);
      message.error(errorMessage);
    }
  };

  const checkActive = e => {
    setProviderActive(e.target.checked);
  }

  useEffect(() => {
    fetchProviderCategories();
  }, []);

  useEffect(() => {
    async function getData() {
      const data = await getProviderById({ id });
      setValues(data);
      setProviderCategory(data.providerCategoryDto);
      setProviderActive(data.active);
      setLoading(false);
    }
    if (isEdition) {
      getData();
    } else {
      setLoading(false);
    }
  }, [id]);

  return (
    <div className="mainSection">
      {redirect()}
      <div className="backAndUser">
        <button onClick={() => setUrlToRedirect(PROVIDERS_URL)}> > Back</button>
      </div>
      <div className="userDetails">
        {!loading ? (
          <div className="formStyle">
            <Row gutter={8} align="middle" style={{ marginBottom: 20 }}>
              <Col span={4} style={{ textAlign: 'right' }}>
                Categoria:
              </Col>
              <Col span={8}>
                {providerCategories && (
                  <SelectBox
                    inputs={providerCategories}
                    onChange={setProviderCategory}
                    initialValue={providerCategory && providerCategory.name}
                  />
                )}
              </Col>
            </Row>
            <Row gutter={8} align="middle" style={{ marginBottom: 20 }}>
            <Col span={4} style={{ textAlign: 'right' }}>
                Activo:
              </Col>
              <Col span={8}>
                <Checkbox 
                checked={providerActive}
                onChange={checkActive}
                />
              </Col>
            </Row>
            <div>
              <AntForm
                inputs={providerInputs}
                handleSubmit={handleSubmit}
                submitText={id ? 'Editar Prestador' : 'Crear Prestador'}
                submitTheme="ThemePrimary"
                submitButtonClass="buttonSection"
                initialValues={values}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 8 }}
              />
            </div>
          </div>
        ) : (
          <Row gutter={8} align="middle" justify="center">
            <Col span={4} style={{ marginTop: 80 }}>
              <Spin />
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

export default CreateProvider;
