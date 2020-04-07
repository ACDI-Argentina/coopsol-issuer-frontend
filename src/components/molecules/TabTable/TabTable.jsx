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
  defaultFilters,
  getRevokedCredentialsColumns
} from '../../../utils/table-definitions';
import {
  CREDENTIAL_STATE_ACTIVE,
  CREDENTIAL_STATE_PENDING,
  CREDENTIAL_STATE_REVOKED
} from '../../../utils/constants';
const { TabPane } = Tabs;

const { getCredentials, getCredentialTypes, getCredentialStates } = api();

const TabTable = () => {
  const credentialCall = useApi();

  const [credentialTypes, setCredentialTypes] = useState([]);
  const [credentialStates, setCredentialStates] = useState([]);

  useEffect(() => {
    credentialCall(getCredentialTypes, null, onTypesSuccess, onError);
    credentialCall(getCredentialStates, null, onStatesSuccess, onError);
  }, []);

  const onTypesSuccess = data => {
    setCredentialTypes(data);
  };

  const onStatesSuccess = data => {
    setCredentialStates(data);
  };

  const onError = () => {
    message.error('No se pudieron obtener los tipos de filtro, intente nuevamente.');
  };

  const activeCredentialsFilter = defaultFilters(credentialTypes, credentialStates);

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
            defaultFilters={{ credentialState: CREDENTIAL_STATE_ACTIVE }}
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
            defaultFilters={{
              credentialState: [CREDENTIAL_STATE_PENDING, CREDENTIAL_STATE_REVOKED].join(',')
            }}
          />
        </TabPane>
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
            columns={getCredentialsColumns}
            dataSource={getCredentials}
            filters={{}}
            defaultFilters={{
              credentialState: 'none'
            }}
          />
        </TabPane>
        <TabPane
          tab={
            <TabTooltip
              title={'Pendientes BOCS'}
              tooltip={'A espera de aprobación crediticia desde sitema BONDAREA BOCS'}
            />
          }
          key="4"
        >
          <CredentialTable
            columns={getCredentialsColumns}
            dataSource={getCredentials}
            filters={{}}
            defaultFilters={{
              credentialState: 'none'
            }}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TabTable;
