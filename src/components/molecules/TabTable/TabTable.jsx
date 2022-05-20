import React, { useContext, useEffect } from 'react';
import './_style.scss';
import { Tabs } from 'antd';
import CredentialTable from '../CredentialTable/credential-table';
import TabTooltip from '../../atoms/TabTooltip/tab-tooltip';
import { AppContext } from '../../../services/providers/app-context';


import {
  getActiveCredentialsColumns,
  getRevokedCredentialsColumns,
  getPendingCredentialColumns
} from '../../../utils/table-definitions';

import {
  getPendingCredentialsFilter,
  getActiveCredentialsFilter,
  getRevokedCredentialsFilter,
} from '../../../utils/tables/table-filters-definitions';
import { useCredentials } from '../../../context/CredentialsContext';

import CredentialDetail from "../../molecules/CredentialDetail/credential-detail";
import useTemplates from '../../../hooks/useTemplates';

const { TabPane } = Tabs;

const TabTable = () => {
  const { credentials, clearSelection } = useCredentials();
  const { appState } = useContext(AppContext);
  
  const onError = (error) => {
    console.log('No se pudieron obtener los tipos de filtro, intente nuevamente.', error);
  };


  //Cargar credential types
  const { templates } = useTemplates(onError);
  const credentialTypes = templates.map(template => template.name)

  const pendingDidFilter = getPendingCredentialsFilter(credentialTypes);
  const activeCredentialsFilter = getActiveCredentialsFilter(credentialTypes);
  const revokedCredentialsFilter = getRevokedCredentialsFilter(credentialTypes);

  //Estos filtros van a depender del status de la credencial que se este visualizando



  return (
    <div className="TabTableContent">
      <Tabs
        defaultActiveKey={appState.defaultActiveTabKey}
        onChange={activeKey => {
          clearSelection()
        }}
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
