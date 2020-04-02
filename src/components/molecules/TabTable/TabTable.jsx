import React from 'react';
import './_style.scss';
import { Tabs, Table } from 'antd';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const TabTable = ({ credentialsData }) => {
  const credentialsColumns = [
    { title: 'Tipo de credencial', dataIndex: 'credentialType', key: 'credentialType' },
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
      key: 'x',
      render: () => <a>Revocar credencial</a>
    }
  ];

  return (
    <div className="TabTableContent">
      <Tabs defaultActiveKey="2">
        <TabPane
          tab={
            <span>
              <AppleOutlined />
              Credenciales vigentes
            </span>
          }
          key="1"
        >
          <Table columns={credentialsColumns} dataSource={credentialsData} />
        </TabPane>
        <TabPane
          tab={
            <span>
              <AndroidOutlined />
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
              <AndroidOutlined />
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
