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
  getActiveCredentialsColumns,
  getRevokedCredentialsColumns,
  getPendingCredentialColumns
} from '../../../utils/table-definitions';

import {
  defaultFilters,
  didCredentialsFilter
} from '../../../utils/tables/table-filters-definitions';
import { useCredentials } from '../../../context/CredentialsContext';

import CredentialDetail from "../../molecules/CredentialDetail/credential-detail";

const { TabPane } = Tabs;
const { getCredentialTypes} = api();

const TabTable = () => {
  const { credentials, clearSelection } = useCredentials();
  const credentialCall = useApi();

  const [credentialTypes, setCredentialTypes] = useState([]);

  const { appState } = useContext(AppContext);
  const { setUser } = useContext(UserContext);


  useEffect(() => {
    credentialCall(getCredentialTypes, null, setCredentialTypes, onError, setUser);

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
      <Tabs
        defaultActiveKey={appState.defaultActiveTabKey}
        onChange={activeKey => clearSelection()}
      >
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
            credentials={credentials.PENDING}
            columns={getPendingCredentialColumns()}
            filters={pendingDidFilter}
            defaultFilters={{ status: "PENDING" }}
            expandable={{
              expandedRowRender: credential => <CredentialDetail credential={credential} />
            }}
          />
        </TabPane>
        <TabPane
          tab={<TabTooltip title={'Credenciales en uso'} tooltip={'Credenciales vigentes'} />}
          key={'1'}
        >
          <CredentialTable
            credentials={credentials.ACTIVE}
            columns={getActiveCredentialsColumns()}
            filters={activeCredentialsFilter}
            defaultFilters={{ status: "ACTIVE" }}
            expandable={{
              expandedRowRender: credential => <CredentialDetail credential={credential} />
            }}
          />
        </TabPane>

        <TabPane
          tab={<TabTooltip title={'Credenciales revocadas'} tooltip={'Credenciales revocadas'} />}
          key="2"
        >
          <CredentialTable
            credentials={credentials.REVOKED}
            columns={getRevokedCredentialsColumns()}
            filters={revokedCredentialsFilter}
            defaultFilters={{ status: "REVOKED" }}
            rowsSelectionEnabled={false}
            expandable={{
              expandedRowRender: credential => <CredentialDetail credential={credential} />
            }}
          />
        </TabPane>

      </Tabs>
    </div>
  );
};

export default TabTable;
