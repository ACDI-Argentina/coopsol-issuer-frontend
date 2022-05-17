/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import './_style.scss';
import { templatesColumns } from '../../../utils/tables/templates-definitions';

import TitlePage from '../../atoms/TitlePage/title-page';
import TemplateTable from '../../molecules/TemplateTable/template-table';
import TemplateActions from '../../molecules/TemplateActions/template-actions';


import TemplatesProvider, { useTemplates } from '../../../context/TemplatesContext';

const TemplatesConsumer = () => {
  const { loadTemplates, templates, loading } = useTemplates();

  useEffect(() => {
    loadTemplates();
  }, [])

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
          defaultFilters={{ page: 0 }}
        />
      </div>
    </div>
  )
}

const Templates = () => {

  return (
    <TemplatesProvider>
      <TemplatesConsumer/>
    </TemplatesProvider>
  );
};

export default Templates;
