import React, { useEffect, useState, useContext } from 'react';
import './_style.scss';
import { providerColumns } from '../../../utils/table-definitions';
import apiCalls from '../../../services/api-calls/all';
import TitlePage from '../../atoms/TitlePage/title-page';
import CredentialTable from '../../molecules/CredentialTable/credential-table';
import { defaultProviderFilters } from '../../../utils/tables/table-filters-definitions';
import ProviderActions from '../../molecules/ProviderActions/provider-actions';
import { showErrorMessage } from '../../../utils/alertMessages';
import { useApi } from '../../../services/useApi';
import { UserContext } from '../../../services/providers/user-context';

// const formatContent = content => {
//   if (content) {
//     content.forEach(element => {
//       element.categoryName = element.providerCategory.name;
//       if (element.active) {
//         element.activeLabel = 'Yes';
//       } else {
//         element.activeLabel = 'No';
//       }
//     });
//   }
//   return content;
// };

const onError = (error, status) => {
  showErrorMessage('No se pudieron obtener los tipos de filtro, intente nuevamente.', error);
};

const Providers = () => {
  const { getProviders, getCategories } = apiCalls();
  const filtersCall = useApi();
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({});
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    filtersCall(getCategories, null, setCategories, onError, setUser);
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
        />
      </div>
    </div>
  );
};

export default Providers;
