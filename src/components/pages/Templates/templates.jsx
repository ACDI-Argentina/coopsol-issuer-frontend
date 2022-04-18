/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import './_style.scss';
import { templatesColumns } from '../../../utils/tables/templates-definitions';
import apiCalls from '../../../services/api-calls/all';
import TitlePage from '../../atoms/TitlePage/title-page';
import CredentialTable from '../../molecules/CredentialTable/credential-table';
import { defaultProviderFilters } from '../../../utils/tables/table-filters-definitions';
import ProviderActions from '../../molecules/ProviderActions/provider-actions';
import TemplateActions from '../../molecules/TemplateActions/template-actions';
import { showErrorMessage } from '../../../utils/alertMessages';
import { useApi } from '../../../services/useApi';
import { UserContext } from '../../../services/providers/user-context';

const onError = (error, status) => {
  showErrorMessage('No se pudieron obtener los tipos de filtro, intente nuevamente.', error);
};

const Templates = () => {
  const { getProviders, getProviderCategories } = apiCalls();
  const filtersCall = useApi();
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({});
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    filtersCall(getProviderCategories, null, setCategories, onError, setUser);
  }, []);

  const formatCategories = () => {
    if (categories) {
      const formattedCategories = [];
      categories.forEach(element => {
        formattedCategories.push({ id: element.id, description: element.name });
      });
      setFilters(defaultProviderFilters(formattedCategories));
    }
  };

  useEffect(() => {
    formatCategories();
  }, [categories]);

  return (
    <div className="providerMain">
      <TitlePage 
      text="Tipos de credenciales" 
      description="Creación de modelos de credenciales que luego se utilizarán al crear y emitir una credencial."
      content={<TemplateActions />} 
      />
      <div className="templatesContent">
        <CredentialTable
          columns={templatesColumns}
          dataSource={getProviders}
          filters={filters}
          defaultFilters={{ page: 0 }}
          noExpand
        />
      </div>
    </div>
  );
};

export default Templates;
