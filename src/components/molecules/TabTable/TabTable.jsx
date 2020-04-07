import React, { useEffect } from 'react';
import './_style.scss';
import { Tabs } from 'antd';
import { useState } from 'react';
import { useApi } from '../../../services/useApi';
import api from '../../../services/api-calls/all';
import CredentialTable from '../CredentialTable/credential-table';
import TabTooltip from '../../atoms/TabTooltip/tab-tooltip';
import moment from 'moment';
import { DEFAULT_DATE_FORMAT } from '../../../utils/constants';
const { TabPane } = Tabs;

const { getCredentials } = api();

const TabTable = () => {
  const [pagination, setPagination] = useState({
    page: 0
  });
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState([]);
  const [filters, setFilters] = useState({});

  const credentialsColumns = [
    {
      title: 'Tipo de credencial',
      dataIndex: 'credentialType',
      key: 'credentialType'
    },
    { title: 'Nombre y Apellido', dataIndex: 'name', key: 'name' },
    { title: 'DNI', dataIndex: 'dniBeneficiary', key: 'dniBeneficiary' },
    { title: 'DID', dataIndex: 'idDidiCredential', key: 'idDidiCredential' },
    {
      title: 'Generada',
      dataIndex: 'dateOfIssue',
      key: 'dateOfIssue',
      render: value => <div>{moment(value).format(DEFAULT_DATE_FORMAT)}</div>
    },
    {
      title: 'Caduca',
      dataIndex: 'dateOfExpiry',
      key: 'dateOfExpiry',
      render: value => <div>{moment(value).format(DEFAULT_DATE_FORMAT)}</div>
    },
    { title: 'Estado', dataIndex: 'creditState', key: 'creditState' },
    { title: 'Ult. actualización', dataIndex: 'lastUpdate', key: 'lastUpdate' },
    {
      title: 'Acciones',
      dataIndex: '',
      key: 'action',
      render: () => <a href="">Revocar credencial</a>
    }
  ];

  const getCredentialData = useApi();

  const fetchCredentials = () => {
    setLoading(true);
    console.log('Fetching', { page: pagination.page, ...filters });

    getCredentialData(getCredentials, { page: pagination.page, ...filters }, onSuccess, onError);
  };

  useEffect(() => {
    fetchCredentials();
  }, [pagination.page, filters]);

  const onApplyFilter = filter => {
    setFilters(filter);
  };

  const onSuccess = data => {
    setPagination({
      total: 50,
      page: pagination.page
    });
    setLoading(false);
    setCredentials(data);
  };

  const onError = () => {
    setLoading(false);
  };

  const handleTableChange = pagination => {
    let page = pagination.current;

    setLoading(true);
    setPagination({
      total: 50,
      page: page
    });
  };

  return (
    <div className="TabTableContent">
      <Tabs>
        <TabPane
          tab={<TabTooltip tooltip={'Credenciales en uso'} title={'Credenciales vigentes'} />}
          key={'1'}
        >
          <CredentialTable
            onApplyFilter={onApplyFilter}
            onChange={handleTableChange}
            columns={credentialsColumns}
            dataSource={credentials}
            loading={loading}
            pagination={pagination}
          />
        </TabPane>

        <TabPane
          tab={<TabTooltip tooltip={'Credenciales revocadas'} title={'Credenciales caducadas'} />}
          key="2"
        >
          Tab 2
        </TabPane>
        <TabPane
          tab={
            <TabTooltip
              tooltip={'Credenciales pendientes'}
              title={'A espera de generación del DID'}
            />
          }
          key="3"
        >
          Tab 2
        </TabPane>
        <TabPane
          tab={
            <TabTooltip
              tooltip={'Pendientes BOCS'}
              title={'A espera de aprobación crediticia desde sitema BONDAREA BOCS'}
            />
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
