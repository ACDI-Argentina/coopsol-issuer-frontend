import React from 'react';
import './_style.scss';
import TableFilters from '../TableFilters/table-filters';
import { Table } from 'antd';

const CredentialTable = ({ dataSource, columns, loading, onChange, pagination, onApplyFilter }) => {
  return (
    <div>
      <TableFilters onApplyFilter={onApplyFilter} />
      <Table
        rowKey={'id'}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        onChange={onChange}
        pagination={pagination}
      />
    </div>
  );
};

export default CredentialTable;
