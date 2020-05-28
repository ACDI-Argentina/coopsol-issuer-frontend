import React, { useContext, useEffect } from 'react';
import './_style.scss';
import { Tabs, message } from 'antd';
import { useState } from 'react';
import { useApi } from '../../../services/useApi';
import api from '../../../services/api-calls/all';
import CredentialTable from '../CredentialTable/credential-table';
import TabTooltip from '../../atoms/TabTooltip/tab-tooltip';
import { AppContext } from '../../../services/providers/app-context';

import {
  getCredentialsColumns,
  getRevokedCredentialsColumns,
  getPendingColumns,
  getDidColumns
} from '../../../utils/table-definitions';
import {
  CREDENTIAL_PENDING_DIDI,
  CREDENTIAL_REVOKE,
  CREDENTIAL_ACTIVE
} from '../../../utils/constants';
import {
  defaultFilters,
  didCredentialsFilter
} from '../../../utils/tables/table-filters-definitions';
const { TabPane } = Tabs;

const { getCredentials, getCredentialTypes, getCredentialStates, getRevocationReasons } = api();

const TabTable = () => {
  const credentialCall = useApi();

  const [credentialTypes, setCredentialTypes] = useState([]);
  const [credentialStates, setCredentialStates] = useState({});
  const [revocationReasons, setRevocationReasons] = useState({});

  const onSuccessGetReasons = (reasons) => {
    let parsedReasons = Object.keys(reasons).map(id => { 
      return { id, label: reasons[id] }
    })
    setRevocationReasons(parsedReasons);
  }

  const { appState } = useContext(AppContext);

  useEffect(() => {
    credentialCall(getCredentialTypes, null, setCredentialTypes, onError);
    credentialCall(getCredentialStates, null, setCredentialStates, onError);
    credentialCall(getRevocationReasons, null, onSuccessGetReasons, onError);
  }, []);

  const onError = () => {
    message.error('No se pudieron obtener los tipos de filtro, intente nuevamente.');
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
            defaultFilters={{ credentialState: credentialStates[CREDENTIAL_ACTIVE] }}
            revocationReasons={revocationReasons}
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
            revocationReasons={revocationReasons}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TabTable;
