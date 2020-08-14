import React, { useState, useEffect } from 'react';
import './_style.scss';
import TitlePage from '../../atoms/TitlePage/title-page';
import { Tabs } from 'antd';
import mock from './mock';
import ApiTable from '../../molecules/ApiTable/api-table';
import { identityPendingColumns } from '../../../utils/table-definitions';
import { defaultIdentityFilters } from '../../../utils/tables/table-filters-definitions';
const { TabPane } = Tabs;

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
              //   endpoint="/identityRequests"
              //   dataField="content"
              //   when endpoint is ready, data props's must be removed
              data={mock.pending}
              columns={identityPendingColumns}
              filters={defaultIdentityFilters}
            />
          </TabPane>
          <TabPane tab="Solicitudes Rechazadas" key="2">
            {/* <ApiTable data={mock.reject} endpoint="/some/endpoint"  /> */}
          </TabPane>
          <TabPane tab="Solicitudes Aprobadas" key="3">
            {/* <ApiTable data={mock.approved} endpoint="/some/endpoint" /> */}
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Identities;
