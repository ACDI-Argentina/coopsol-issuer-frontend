/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import './_style.scss';
import TableFilters from '../TableFilters/table-filters';
import { Table } from 'antd';
import { useCredentials } from '../../../context/CredentialsContext';
import { applyFilters } from '../../../utils/filter';

const CredentialTable = ({ credentials, columns, defaultFilters, filters, rowsSelectionEnabled = true, ...props }) => {
  const [filtered, setFiltered] = useState(credentials);
  const [pagination, setPagination] = useState({ page: 0 });
  const { setSelection, selectedRowKeys, setSelectedRowKeys } = useCredentials() || {};

  const [activeFilters, setActiveFilters] = useState(defaultFilters ? defaultFilters : {});
  const [paged, setPaged] = useState(0);


  const { loadCredentials, loadingCredentials } = useCredentials();

  const handleTableChange = pagination => {
    setPagination(pagination);
    setPaged(pagination.current - 1);
  };

  const onSearch = () => {
    setPagination({ ...pagination, current: 1 });
    setPaged(0);
    loadCredentials({ paged, ...activeFilters });
  };


  useEffect(() => {
    (async function () {
      if (shouldPerformRequest(activeFilters)) {
        await loadCredentials({ paged, ...activeFilters });
      }
    })()
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


  const onSelectionChange = (selectedRowKeys, selectedRows) => {
    setSelection(selectedRows)
    setSelectedRowKeys(selectedRowKeys);
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  };

  const rowSelection = rowsSelectionEnabled ? {
    type: "checkbox",
    selectedRowKeys,
    onChange: onSelectionChange
  } : undefined

  useEffect(() => {
    try {
      const { paged, status, ...currentFilters } = activeFilters;
      const filtered = applyFilters(credentials, currentFilters)
      setFiltered(filtered);
    } catch (err) {
      console.log(err)
    }

  },[credentials, activeFilters])

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
        columns={columns}
        dataSource={filtered}
        scroll={{ x: 1300 }}
        loading={loadingCredentials}
        onChange={handleTableChange}
        pagination={pagination}
        rowSelection={rowSelection}
        {...props}
      />
    </div>
  );
};

export default CredentialTable;
