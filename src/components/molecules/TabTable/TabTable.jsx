import React from 'react';
import './_style.scss';
import { UnorderedListOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
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

  const onApplyFilter = filter => {
    console.log(filter);
  };

  return (
    <div className="TabTableContent">
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={
            <Tooltip title="Credenciales en uso">
              <span>
                <UnorderedListOutlined />
                Credenciales vigentes
              </span>
            </Tooltip>
          }
          key="1"
        >
          <TableFilters onApplyFilter={onApplyFilter} />
          <Table columns={credentialsColumns} dataSource={credentialsData} pagination={false} />
        </TabPane>
        <TabPane
          tab={
            <Tooltip title="Credenciales caducadas">
              <span>
                <UnorderedListOutlined />
                Credenciales revocadas
              </span>
            </Tooltip>
          }
          key="2"
        >
          Tab 2
        </TabPane>
        <TabPane
          tab={
            <Tooltip title="A espera de generación del DID">
            <span>
              <UnorderedListOutlined />
              Credenciales pendientes
            </span>
            </Tooltip>
          }
          key="3"
        >
          Tab 2
        </TabPane>
        <TabPane
          tab={
            <Tooltip title="A espera de aprobación crediticia desde sitema BONDAREA BOCS">
            <span>
              <UnorderedListOutlined />
              Pendientes BOCS
            </span>
            </Tooltip>
          }
          key="4"
        >
          Tab 2
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TabTable;
