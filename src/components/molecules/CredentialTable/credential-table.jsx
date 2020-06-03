import React, { useState, useEffect } from 'react';
import './_style.scss';
import TableFilters from '../TableFilters/table-filters';
import { Table, message } from 'antd';
import { useApi } from '../../../services/useApi';

const CredentialTable = ({ dataSource, columns, defaultFilters, filters }) => {
  const [pagination, setPagination] = useState({
    page: 0,
    defaultPageSize: 10
  });
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState([]);
  const [activeFilters, setActiveFilters] = useState(defaultFilters ? defaultFilters : {});

  const getCredentialData = useApi();

  const handleTableChange = pagination => {
    setPagination({
      ...pagination,
      page: pagination.current
    });
  };

  const fetchCredentials = () => {
    setLoading(true);
    getCredentialData(dataSource, { page: pagination.page, ...activeFilters }, onSuccess, onError);
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

  const shouldPerformRequest = newFilters => {
    let keys = Object.keys(newFilters);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (!newFilters[key]) return false;
    }

    return true;
  };

  const onApplyFilter = filter => {
    defaultFilters ? 
      setActiveFilters({...filter, ...defaultFilters}) :
      setActiveFilters(filter);
  };

  const onSuccess = data => {
    setCredentials(data);
    setPagination({
      ...pagination,
      total: data.length
    });
    setLoading(false);
  };

  const onError = () => {
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
        loading={loading}
        onChange={handleTableChange}
        pagination={pagination}
      />
    </div>
  );
};

export default CredentialTable;
