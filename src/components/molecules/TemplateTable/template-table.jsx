/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './_style.scss';

import { Table } from 'antd';

const TemplateTable = ({ loading, templates, columns, defaultFilters }) => {
  const [pagination, setPagination] = useState({
    page: 0
  });
  
  const [activeFilters, setActiveFilters] = useState(defaultFilters ? defaultFilters : {});
  const [paged, setPaged] = useState(0);
  
  const handleTableChange = pagination => {
    setPagination(pagination);
    setPaged(pagination.current - 1);
  };


  const fetchCredentials = (page = 0) => {

  };

  const tableColumns = columns(fetchCredentials);

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


  return (

    <Table
      rowKey={'_id'}
      columns={tableColumns}
      dataSource={templates}
      scroll={{ x: 1300 }}
      loading={loading}
      onChange={handleTableChange}
      pagination={pagination}

    />

  );
};

export default TemplateTable;
