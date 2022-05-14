/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import './_style.scss';
import { templatesColumns } from '../../../utils/tables/templates-definitions';

import TitlePage from '../../atoms/TitlePage/title-page';
import TemplateTable from '../../molecules/TemplateTable/template-table';
import { defaultProviderFilters } from '../../../utils/tables/table-filters-definitions';
import TemplateActions from '../../molecules/TemplateActions/template-actions';

import DidiBackend from '../../../services/api-calls/DidiBackend';

const Templates = () => {
  
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [templates, setTemplates] = useState([]);

  
  useEffect(() => {
    (async function(){
      try{
        setLoading(true);
        const templates = await DidiBackend().templates.find();
        setTemplates(templates)
        setLoading(false);

      } catch(err){
        setLoading(false);
        console.log(err);
      }

    })()
  },[])

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
          loading={loading}
          columns={templatesColumns}
          templates={templates}
          filters={filters}
          defaultFilters={{ page: 0 }}
        />
      </div>
    </div>
  );
};

export default Templates;
