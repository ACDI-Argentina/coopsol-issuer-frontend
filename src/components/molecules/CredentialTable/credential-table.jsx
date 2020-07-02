import React, { useState, useEffect, useContext } from 'react';
import './_style.scss';
import TableFilters from '../TableFilters/table-filters';
import CredentialDetail from '../CredentialDetail/credential-detail';
import { Table, message } from 'antd';
import { useApi } from '../../../services/useApi';
import { UserContext } from '../../../services/providers/user-context';

const CredentialTable = ({ dataSource, columns, defaultFilters, filters }) => {
  const [pagination, setPagination] = useState({
    page: 0
  });
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState([]);
  const [activeFilters, setActiveFilters] = useState(defaultFilters ? defaultFilters : {});
  const { setUser } = useContext(UserContext);

  const getCredentialData = useApi();

  const handleTableChange = pagination => {
    setPagination({
      ...pagination,
      page: pagination.current - 1
    });
  };

  const fetchCredentials = () => {
    setLoading(true);
    getCredentialData(
      dataSource,
      { page: pagination.page, ...activeFilters },
      onSuccess,
      onError,
      setUser
    );
  };

  const tableColumns = columns(fetchCredentials);

  const onSearch = () => {
    fetchCredentials();
  };

  useEffect(() => {
    if (shouldPerformRequest(activeFilters)) {
      fetchCredentials();
    }
  }, [activeFilters]);

  useEffect(() => {
    let newFilters = defaultFilters ? defaultFilters : {};
    setActiveFilters(newFilters);
  }, [defaultFilters]);

  useEffect(() => {
    fetchCredentials();
  }, [pagination.page]);

  const shouldPerformRequest = newFilters => {
    let keys = Object.keys(newFilters);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (!newFilters[key]) return false;
    }

    return true;
  };

  const onApplyFilter = filter => {
    defaultFilters ? setActiveFilters({ ...filter, ...defaultFilters }) : setActiveFilters(filter);
  };

  const onSuccess = data => {
    const { content, totalElements, size } = data;

    setCredentials(content);
    setPagination({
      ...pagination,
      total: totalElements,
      pageSize: size
    });
    setLoading(false);
  };

  const onError = error => {
    message.error('No se pudieron obtener las credenciales, intente nuevamente.');
    setLoading(false);
  };

  return (
    <div>
      <TableFilters
        onApplyFilter={onApplyFilter}
        filters={filters}
        defaultFilters={activeFilters}
        onSearch={onSearch}
      />
      <Table
        rowKey={'id'}
        columns={tableColumns}
        dataSource={credentials}
        scroll={{ x: 1300 }}
        loading={loading}
        onChange={handleTableChange}
        pagination={pagination}
        expandable={{
          expandedRowRender: record => <CredentialDetail fields={record} />
        }}
      />
    </div>
  );
};

export default CredentialTable;
