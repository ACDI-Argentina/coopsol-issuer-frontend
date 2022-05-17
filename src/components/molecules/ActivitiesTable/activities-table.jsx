/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import './_style.scss';
import TableFilters from '../TableFilters/table-filters';
import { Table } from 'antd';

import { useActivities } from '../../../context/ActivitiesContext';

const ActivitiesTable = ({ columns }) => {
  const { loading, activities, loadActivities } = useActivities();

  useEffect(() => {
    loadActivities();
  }, [])

  return (
    <div>
      <Table
        rowKey={'_id'}
        columns={columns}
        dataSource={activities}
        scroll={{ x: 1300 }}
        loading={loading}

      />
    </div>
  );
};

export default ActivitiesTable;
