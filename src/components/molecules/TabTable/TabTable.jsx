import React, { useContext, useEffect } from 'react';
import './_style.scss';
import { Tabs } from 'antd';
import { useState } from 'react';
import { useApi } from '../../../services/useApi';
import api from '../../../services/api-calls/all';
import CredentialTable from '../CredentialTable/credential-table';
import TabTooltip from '../../atoms/TabTooltip/tab-tooltip';
import { AppContext } from '../../../services/providers/app-context';
import { UserContext } from '../../../services/providers/user-context';

import {
  getCredentialsColumns,
  getRevokedCredentialsColumns,
  getPendingColumns,
  getDidColumns
} from '../../../utils/table-definitions';
import {
  CREDENTIAL_PENDING_DIDI,
  CREDENTIAL_REVOKE,
  CREDENTIAL_ACTIVE,
  HOLDER_ACTIVE_KINSMAN_PENDING
} from '../../../utils/constants';
import {
  defaultFilters,
  didCredentialsFilter
} from '../../../utils/tables/table-filters-definitions';
import { showErrorMessage } from '../../../utils/alertMessages';
const { TabPane } = Tabs;

const { getCredentials, getCredentialTypes, getCredentialStates, getRevocationReasons } = api();

const TabTable = () => {
  const credentialCall = useApi();

  const [credentialTypes, setCredentialTypes] = useState([]);
  const [credentialStates, setCredentialStates] = useState({});

  const { appState, setAppState } = useContext(AppContext);
  const { setUser } = useContext(UserContext);

  const onSuccessGetReasons = reasons => {
    let revocationReasons = Object.keys(reasons).map(id => {
      return { id, label: reasons[id] };
    });
    setAppState({ revocationReasons });
  };

  useEffect(() => {
    credentialCall(getCredentialTypes, null, setCredentialTypes, onError, setUser);
    credentialCall(getCredentialStates, null, setCredentialStates, onError, setUser);
    credentialCall(getRevocationReasons, null, onSuccessGetReasons, onError, setUser);
  }, []);

  const onError = (error, status) => {
    showErrorMessage('No se pudieron obtener los tipos de filtro, intente nuevamente.', status);
  };

  const activeCredentialsFilter = defaultFilters(credentialTypes);
  const pendingDidFilter = didCredentialsFilter(credentialTypes);

  return (
    <div className="TabTableContent">
      <Tabs defaultActiveKey={appState.defaultActiveTabKey}>
        <TabPane
          tab={<TabTooltip title={'Credenciales en uso'} tooltip={'Credenciales vigentes'} />}
          key={'1'}
        >
          <CredentialTable
            columns={getCredentialsColumns}
            dataSource={getCredentials}
            filters={activeCredentialsFilter}
            defaultFilters={{ credentialState: credentialStates[CREDENTIAL_ACTIVE] + ',' + credentialStates[HOLDER_ACTIVE_KINSMAN_PENDING]}}
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
            defaultFilters={{ credentialState: credentialStates[CREDENTIAL_PENDING_DIDI] }}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TabTable;
