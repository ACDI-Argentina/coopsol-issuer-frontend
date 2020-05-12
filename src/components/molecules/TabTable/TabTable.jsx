import React, { useEffect } from 'react';
import './_style.scss';
import { Tabs, message } from 'antd';
import { useState } from 'react';
import { useApi } from '../../../services/useApi';
import api from '../../../services/api-calls/all';
import CredentialTable from '../CredentialTable/credential-table';
import TabTooltip from '../../atoms/TabTooltip/tab-tooltip';

import {
  getCredentialsColumns,
  getRevokedCredentialsColumns,
  getPendingColumns,
  getDidColumns
} from '../../../utils/table-definitions';
import {
  CREDENTIAL_PENDING_DIDI,
  CREDENTIAL_PENDING_BONDAREA,
  CREDENTIAL_REVOKE,
  CREDENTIAL_ACTIVE
} from '../../../utils/constants';
import {
  defaultFilters,
  pendingCredentialsFilter,
  didCredentialsFilter
} from '../../../utils/tables/table-filters-definitions';
const { TabPane } = Tabs;

const { getCredentials, getCredentialTypes, getCredentialStates } = api();

const TabTable = () => {
  const credentialCall = useApi();

  const [credentialTypes, setCredentialTypes] = useState([]);
  const [credentialStates, setCredentialStates] = useState({});

  useEffect(() => {
    credentialCall(getCredentialTypes, null, setCredentialTypes, onError);
    credentialCall(getCredentialStates, null, setCredentialStates, onError);
  }, []);

  const onError = () => {
    message.error('No se pudieron obtener los tipos de filtro, intente nuevamente.');
  };

  const activeCredentialsFilter = defaultFilters(credentialTypes);
  const pendingDidFilter = didCredentialsFilter(credentialTypes);
  return (
    <div className="TabTableContent">
      <Tabs>
        <TabPane
          tab={<TabTooltip title={'Credenciales en uso'} tooltip={'Credenciales vigentes'} />}
          key={'1'}
        >
          <CredentialTable
            columns={getCredentialsColumns}
            dataSource={getCredentials}
            filters={activeCredentialsFilter}
            defaultFilters={{ credentialState: credentialStates[CREDENTIAL_ACTIVE] }}
          />
        </TabPane>

        <TabPane
          tab={<TabTooltip title={'Credenciales revocadas'} tooltip={'Credenciales caducadas'} />}
          key="2"
        >
          <CredentialTable
            columns={getRevokedCredentialsColumns}
            dataSource={getCredentials}
            filters={activeCredentialsFilter}
            defaultFilters={{ credentialState: credentialStates[CREDENTIAL_REVOKE] }}
          />
        </TabPane>
        <TabPane
          tab={
            <TabTooltip
              title={'Credenciales pendientes'}
              tooltip={'A espera de generación del DID'}
            />
          }
          key="4"
        >
          <CredentialTable
            columns={getDidColumns}
            dataSource={getCredentials}
            filters={pendingDidFilter}
            defaultFilters={{ credentialStates: credentialStates[CREDENTIAL_PENDING_DIDI] }}
          />
        </TabPane>
        <TabPane
          tab={
            <TabTooltip
              title={'Pendientes BOCS'}
              tooltip={'A espera de aprobación crediticia desde sitema BONDAREA BOCS'}
            />
          }
          key="5"
        >
          <CredentialTable
            columns={getPendingColumns}
            dataSource={getCredentials}
            filters={pendingCredentialsFilter}
            defaultFilters={{ credentialStates: credentialStates[CREDENTIAL_PENDING_BONDAREA] }}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TabTable;
