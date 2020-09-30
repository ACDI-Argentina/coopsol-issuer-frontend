import React, { useEffect, useState, useContext } from 'react';
import TableFilters from '../TableFilters/table-filters';
import { Table, message } from 'antd';
import api from '../../../services/api-calls/all';
import { useApi } from '../../../services/useApi';
import { UserContext } from '../../../services/providers/user-context';
import ApiDetail from '../ApiDetail/api-detail';
const { getAny } = api();
const call = useApi();

const ApiTable = ({ data, path, columns, filters, defaultFilters, dataField = 'content', filteredFields, noExpand }) => {
  const [loading, setLoading] = useState(false);
  const [localData, setLocalData] = useState(data);
  const [activeFilters, setActiveFilters] = useState(defaultFilters);
  const [pagination, setPagination] = useState({ page: 0 });
  const [paged, setPaged] = useState(0);
  const { setUser } = useContext(UserContext);

  const makeGet = ( page = 0) => { //makeGet = fetchCredentials
    setLoading(true);
    const url = path;
    const params = { page, ...activeFilters };
    call(getAny, { url, params }, handleSuccess, handleError, setUser);
  };

  const localColumns = columns(makeGet);

  const handleTableChange = pagination => {
    setPagination(pagination);
    setPaged(pagination.current - 1);
 };

  const handleSuccess = res => {
    const { totalElements, size } = res;
    setLocalData(res[dataField]);
    setPagination({
      ...pagination,
      total: totalElements,
      pageSize: size
    });
    setLoading(false);
  };

  const onSearch = () => {
    setPagination({ ...pagination, current: 1 });
    setPaged(0);
    makeGet();
  };

  const handleError = res => {
    message.error('Ocurrió un error al obtener las solicitudes.');
    setLoading(false);
  };

  const onApplyFilter = filter => {
    setActiveFilters({ ...filter });
  };

  useEffect(() => {
    makeGet(paged);
  }, [paged]);

  return (
    <>
      <TableFilters
        onApplyFilter={onApplyFilter}
        filters={filters}
        defaultFilters={activeFilters}
        onSearch={onSearch}
      />
      <Table
        rowKey={'id'}
        columns={localColumns}
        dataSource={localData}
        scroll={{ x: 'auto' }}
        loading={loading}
        onChange={handleTableChange}
        pagination={pagination}
        expandable={
          !noExpand && {
            expandedRowRender: record => <ApiDetail fields={record} filteredFields={filteredFields} />
          }
        }
      />
    </>
  );
};

export default ApiTable;
