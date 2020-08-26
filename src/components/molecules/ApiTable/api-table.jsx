import React, { useEffect, useState } from 'react';
import TableFilters from '../TableFilters/table-filters';
import { Table } from 'antd';
import api from '../../../services/api-calls/all';
import { useApi } from '../../../services/useApi';

const { getAny } = api();
const call = useApi();

const ApiTable = ({ data, path, columns, filters }) => {
  const [loading, setLoading] = useState(false);
  const [localData, setLocalData] = useState(data);
  const [activeFilters, setActiveFilters] = useState({});
  const [pagination, setPagination] = useState({
    page: 0
  });

  const makeGet = () => {
    setLoading(true);
    const url = path;
    const params = { page: 0 };
    call(getAny, { url, params }, handleSuccess, handleSuccess);
  };
  const localColumns = columns(makeGet);

  const handleTableChange = pagination => {
    setPagination({
      ...pagination,
      page: pagination.current - 1
    });
  };

  const handleSuccess = res => {
    console.log(res);
    setLocalData(res);
    setLoading(false);
  };

  const onApplyFilter = filter => {
    setActiveFilters({ ...activeFilters, ...filter });
  };

  // useEffect(() => {
  //   makeGet();
  // }, []);

  return (
    <>
      <TableFilters
        onApplyFilter={onApplyFilter}
        filters={filters}
        defaultFilters={activeFilters}
        onSearch={makeGet}
      />
      <Table
        rowKey={'id'}
        columns={localColumns}
        dataSource={localData}
        scroll={{ x: 950 }}
        loading={loading}
        onChange={handleTableChange}
        pagination={pagination}
      />
    </>
  );
};

export default ApiTable;
