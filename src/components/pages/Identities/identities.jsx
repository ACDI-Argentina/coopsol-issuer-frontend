import React from 'react';
import './_style.scss';
import TitlePage from '../../atoms/TitlePage/title-page';
import { Tabs } from 'antd';
import ApiTable from '../../molecules/ApiTable/api-table';
import {
  pendingColumns,
  approvedColumns,
  rejectColumns,
  requestStates,
  collapseLabels
} from '../../../utils/tables/identities-definitions.jsx';
import { filters } from '../../../utils/tables/identities-definitions';
const { TabPane } = Tabs;
const { progress, failure, success } = requestStates;


const Identities = () => {
  return (
    <div className="identities">
      <TitlePage
        text="Validación de Identidad"
        description="Acá podés ver un listado con las solicitudes de validación de identidad de los usuarios de la app ai·di."
      />
      <div className="TabTableContent">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Solicitudes Pendientes" key="1">
            <ApiTable
              path="/identityValidationRequests"
              columns={pendingColumns}
              filters={filters}
              defaultFilters={{ requestState: progress }}
              noExpand
            />
          </TabPane>
          <TabPane tab="Solicitudes Aprobadas" key="2">
            <ApiTable
              path="/identityValidationRequests"
              columns={approvedColumns}
              filters={filters}
              defaultFilters={{ requestState: success }}
              noExpand
            />
          </TabPane>
          <TabPane tab="Solicitudes Rechazadas" key="3">
            <ApiTable
              path="/identityValidationRequests"
              columns={rejectColumns}
              filters={filters}
              defaultFilters={{ requestState: failure }}
              filteredFields={collapseLabels}
            />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Identities;
