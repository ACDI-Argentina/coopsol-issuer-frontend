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
  getDidColumns
} from '../../../utils/table-definitions';

import {
  defaultFilters,
  didCredentialsFilter
} from '../../../utils/tables/table-filters-definitions';

const { TabPane } = Tabs;

const { getCredentials, getCredentialTypes, getRevocationReasons } = api();

const TabTable = () => {
  const credentialCall = useApi();

  const [credentialTypes, setCredentialTypes] = useState([]);

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
    credentialCall(getRevocationReasons, null, onSuccessGetReasons, onError, setUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onError = (error, status) => {
    console.log('No se pudieron obtener los tipos de filtro, intente nuevamente.', status);
  };

  const activeCredentialsFilter = defaultFilters(credentialTypes);
  const pendingDidFilter = didCredentialsFilter(credentialTypes);
  const revokedCredentialsFilter = defaultFilters(credentialTypes); //TODO: Implement

  return (
    <div className="TabTableContent">
      <Tabs defaultActiveKey={appState.defaultActiveTabKey}>
        <TabPane
          tab={
            <TabTooltip
              title={'Credenciales pendientes'}
              tooltip={'A espera de generación del DID'}
            />
          }
          key="3"
        >
          <CredentialTable
            columns={getDidColumns}
            dataSource={getCredentials}
            filters={pendingDidFilter}
            defaultFilters={{ status: "PENDING" }}
          />
        </TabPane>
        <TabPane
          tab={<TabTooltip title={'Credenciales en uso'} tooltip={'Credenciales vigentes'} />}
          key={'1'}
        >
          <CredentialTable
            columns={getCredentialsColumns}
            dataSource={getCredentials}
            filters={activeCredentialsFilter}
            defaultFilters={{ status: "ACTIVE" }} 
          />
        </TabPane>

        <TabPane
          tab={<TabTooltip title={'Credenciales revocadas'} tooltip={'Credenciales revocadas'} />}
          key="2"
        >
          <CredentialTable
            columns={getRevokedCredentialsColumns}
            dataSource={getCredentials}
            filters={revokedCredentialsFilter}
            defaultFilters={{ status: "REVOKED" }}
          />
        </TabPane>

      </Tabs>
    </div>
  );
};

export default TabTable;
