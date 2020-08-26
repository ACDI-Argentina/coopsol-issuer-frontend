import React, { useEffect, useState, useContext } from 'react';
import './_style.scss';
import { providerColumns } from '../../../utils/tables/providers-definitions';
import apiCalls from '../../../services/api-calls/all';
import TitlePage from '../../atoms/TitlePage/title-page';
import CredentialTable from '../../molecules/CredentialTable/credential-table';
import { defaultProviderFilters } from '../../../utils/tables/table-filters-definitions';
import ProviderActions from '../../molecules/ProviderActions/provider-actions';
import { showErrorMessage } from '../../../utils/alertMessages';
import { useApi } from '../../../services/useApi';
import { UserContext } from '../../../services/providers/user-context';

const onError = (error, status) => {
  showErrorMessage('No se pudieron obtener los tipos de filtro, intente nuevamente.', error);
};

const Providers = () => {
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
      <TitlePage text="Listado de Prestadores" content={<ProviderActions />} />
      <div className="providersContent">
        <CredentialTable
          columns={providerColumns}
          dataSource={getProviders}
          filters={filters}
          defaultFilters={{ page: 0 }}
          noExpand
        />
      </div>
    </div>
  );
};

export default Providers;
