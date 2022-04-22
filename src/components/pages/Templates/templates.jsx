/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import './_style.scss';
import { templatesColumns } from '../../../utils/tables/templates-definitions';
import apiCalls from '../../../services/api-calls/all';
import TitlePage from '../../atoms/TitlePage/title-page';
import TemplateTable from '../../molecules/TemplateTable/template-table';
import { defaultProviderFilters } from '../../../utils/tables/table-filters-definitions';
import TemplateActions from '../../molecules/TemplateActions/template-actions';
import { showErrorMessage } from '../../../utils/alertMessages';
import { useApi } from '../../../services/useApi';
import { UserContext } from '../../../services/providers/user-context';

const onError = (error, status) => {
  showErrorMessage('No se pudieron obtener los tipos de filtro, intente nuevamente.', error);
};

const Templates = () => {
  const { getTemplates } = apiCalls();
  const filtersCall = useApi();
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({});
  const { setUser } = useContext(UserContext);


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
        <TemplateTable
          columns={templatesColumns}
          dataSource={getTemplates}
          filters={filters}
          defaultFilters={{ page: 0 }}
        />
      </div>
    </div>
  );
};

export default Templates;
