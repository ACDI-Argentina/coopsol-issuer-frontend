import React, { useContext, useState } from 'react';
import './_style.scss';
import TitlePage from '../../atoms/TitlePage/title-page';
import api from '../../../services/api-calls/all';
import CredentialTable from '../../molecules/CredentialTable/credential-table';
import { getActivitiesColumns } from '../../../utils/table-definitions';
import { defaultActivityFilters } from '../../../utils/tables/table-filters-definitions';
import { useApi } from '../../../services/useApi';
import { UserContext } from '../../../services/providers/user-context';
import { showErrorMessage } from '../../../utils/alertMessages';
import { useEffect } from 'react';

const { getActivityLog, getLogTypes, getLogLevels } = api();

const onError = (error, status) => {
  showErrorMessage('No se pudieron obtener los tipos de filtro, intente nuevamente.', status);
};

const Activities = () => {
  const { setUser } = useContext(UserContext);

  const filtersCall = useApi();

  const [logTypes, setLogTypes] = useState([]);
  const [logLevels, setLogLevels] = useState([]);

  useEffect(() => {
    filtersCall(getLogTypes, null, setLogTypes, onError, setUser);
    filtersCall(getLogLevels, null, setLogLevels, onError, setUser);
  }, []);

  const filters = defaultActivityFilters(logTypes, logLevels);

  return (
    <div className="Activities">
      <TitlePage
        text="Listado de actividades"
        description="Acá podés ver un listado con las actividades de los usuarios."
      />
      <div className="ActivitiesContent">
        <h4>
          <img src="img/table-list.svg" /> Listado de actividades
        </h4>
        <CredentialTable
          columns={() => getActivitiesColumns}
          dataSource={getActivityLog}
          filters={filters}
          defaultFilters={{ page: 0 }}
          noExpand
        />
      </div>
    </div>
  );
};

export default Activities;
