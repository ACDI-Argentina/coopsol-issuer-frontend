/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import './_style.scss';
import TableFilters from '../TableFilters/table-filters';
import CredentialDetail from '../CredentialDetail/credential-detail';
import { Table } from 'antd';
import { useApi } from '../../../services/useApi';

import { showErrorMessage } from '../../../utils/alertMessages';
import { useCredentials } from '../../../context/CredentialsContext';

const CredentialTable = ({ dataSource, columns, defaultFilters, filters, noExpand }) => {
  const [pagination, setPagination] = useState({ page: 0 });
  const [loading, setLoading] = useState(false);
  const { setSelection } = useCredentials() || {};
  const [credentials, setCredentials] = useState();

  const [activeFilters, setActiveFilters] = useState(defaultFilters ? defaultFilters : {});
  const [paged, setPaged] = useState(0);
  const [tableColumns, setTableColumns] = useState();
  
  const getCredentialData = useApi();

  const handleTableChange = pagination => {
    setPagination(pagination);
    setPaged(pagination.current - 1);
  };



  const fetchCredentials = async (page = 0) => {    
    try {
      const apiFilter = {};
      
      if (activeFilters?.status === "PENDING") {
        apiFilter.emmited = false;
      } else if (activeFilters?.status === "ACTIVE") {
        apiFilter.emmited = true;
      } else if (activeFilters?.status === "REVOKED") {
        apiFilter.revoked = true;
      }
      
      setLoading(true);
      const result = await dataSource(apiFilter);
      onSuccess(result)
    } catch (err) {
      console.log(err);
      onError(err);
    }
  };

  useEffect(() => {
    const tableColumns = columns(fetchCredentials);
    setTableColumns(tableColumns);
  }, [])


  const onSearch = () => {
    setPagination({ ...pagination, current: 1 });
    setPaged(0);
    fetchCredentials();
  };


  useEffect(() => {
    if (shouldPerformRequest(activeFilters)) {
      fetchCredentials(paged);
    }
  }, [paged, activeFilters]);

  useEffect(() => {
    let newFilters = defaultFilters ? defaultFilters : {};
    setActiveFilters(newFilters);
  }, Object.values(defaultFilters));

  const shouldPerformRequest = newFilters => {
    let keys = Object.keys(newFilters);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (newFilters[key] === undefined) return false;
    }

    return keys.length > 0;
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

  const onError = (error, status) => {
    showErrorMessage('No se pudieron obtener las credenciales, intente nuevamente.', status);
    setLoading(false);
  };


  const onSelectionChange = (selectedRowKeys, selectedRows) => {
    setSelection(selectedRows)
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  };

  console.log(credentials)

  return (
    <div>
      <TableFilters
        onApplyFilter={onApplyFilter}
        filters={filters}
        defaultFilters={activeFilters}
        onSearch={onSearch}
      />
      <Table
        rowKey={'_id'}
        columns={tableColumns}
        dataSource={credentials}
        scroll={{ x: 1300 }}
        loading={loading}
        onChange={handleTableChange}
        pagination={pagination}
        rowSelection={{
          type: "checkbox",
          onChange: onSelectionChange
        }}
      /*    expandable={
           !noExpand && {
             expandedRowRender: record => <CredentialDetail fields={record} />
           }
         } */
      />
    </div>
  );
};

export default CredentialTable;
