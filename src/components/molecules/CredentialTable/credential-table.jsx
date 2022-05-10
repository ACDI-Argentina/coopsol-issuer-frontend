/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import './_style.scss';
import TableFilters from '../TableFilters/table-filters';
import CredentialDetail from '../CredentialDetail/credential-detail';
import { Table } from 'antd';
import { useApi } from '../../../services/useApi';
import { UserContext } from '../../../services/providers/user-context';
import { showErrorMessage } from '../../../utils/alertMessages';
import { useCredentials } from '../../../context/CredentialsContext';

const CredentialTable = ({ dataSource, columns, defaultFilters, filters, noExpand }) => {
  const [pagination, setPagination] = useState({
    page: 0
  });
  const [loading, setLoading] = useState(false);

  
  const { credentials, setCredentials, setSelection } = useCredentials() || {};


  const [activeFilters, setActiveFilters] = useState(defaultFilters ? defaultFilters : {});
  const [paged, setPaged] = useState(0);
  const { setUser } = useContext(UserContext);

  const getCredentialData = useApi();

  const handleTableChange = pagination => {
    setPagination(pagination);
    setPaged(pagination.current - 1);
  };


  const fetchCredentials = (page = 0) => {
    setLoading(true);
    getCredentialData(
      dataSource,
      { ...activeFilters, page },
      onSuccess,
      onError,
      setUser
    );
  };

  const tableColumns = columns(fetchCredentials);

  const onSearch = () => {
    setPagination({ ...pagination, current: 1 });
    setPaged(0);
    fetchCredentials();
  };


  useEffect(() => {
    if (shouldPerformRequest(activeFilters)) {
      fetchCredentials(paged);
    }
  }, [paged, defaultFilters]);

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

    /* Apply filters! */
    const filteredCredentials = content.filter(cred => {
      if (defaultFilters?.status) {
        return cred.status === defaultFilters?.status;
      }
      return true;
    });

    setCredentials(filteredCredentials); 

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



  return (
    <div>
      <TableFilters
        onApplyFilter={onApplyFilter}
        filters={filters}
        defaultFilters={activeFilters}
        onSearch={onSearch}
      />
      <Table
        rowKey={'key'}
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
