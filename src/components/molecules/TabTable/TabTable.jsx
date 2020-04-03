import React from 'react';
import './_style.scss';
import { UnorderedListOutlined } from '@ant-design/icons';
import { Tabs, Table } from 'antd';
import TableFilters from '../TableFilters/table-filters';
import { useState } from 'react';
import { useEffect } from 'react';

const { TabPane } = Tabs;

const TabTable = ({ credentialsData }) => {
  const [credentialsColumns, setCredentialColumns] = useState([
    {
      title: 'Tipo de credencial',
      dataIndex: 'credentialType',
      key: 'credentialType'
    },
    { title: 'Nombre y Apellido', dataIndex: 'name', key: 'name' },
    { title: 'DNI', dataIndex: 'dniBeneficiary', key: 'dniBeneficiary' },
    { title: 'DID', dataIndex: 'idDidiCredential', key: 'idDidiCredential' },
    { title: 'Generada', dataIndex: 'dateOfIssue', key: 'dateOfIssue' },
    { title: 'Caduca', dataIndex: 'dateOfExpiry', key: 'dateOfExpiry' },
    { title: 'Estado', dataIndex: 'creditState', key: 'creditState' },
    { title: 'Ult. actualización', dataIndex: 'lastUpdate', key: 'lastUpdate' },
    {
      title: 'Acciones',
      dataIndex: '',
      key: 'action',
      render: () => <a>Revocar credencial</a>
    }
  ]);

  console.log('data', credentialsData);

  const onApplyFilter = () => {};

  return (
    <div className="TabTableContent">
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={
            <span>
              <UnorderedListOutlined />
              Credenciales vigentes
            </span>
          }
          key="1"
        >
          <TableFilters onApplyFilter={onApplyFilter} />
          <Table columns={credentialsColumns} dataSource={credentialsData} pagination={false} />
        </TabPane>
        <TabPane
          tab={
            <span>
              <UnorderedListOutlined />
              Credenciales provisorias
            </span>
          }
          key="2"
        >
          Tab 2
        </TabPane>
        <TabPane
          tab={
            <span>
              <UnorderedListOutlined />
              Pendientes de aprobación crediticia
            </span>
          }
          key="3"
        >
          Tab 2
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TabTable;
