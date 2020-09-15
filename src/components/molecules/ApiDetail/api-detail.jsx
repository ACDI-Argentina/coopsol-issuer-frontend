import React, { useState } from 'react';
import './_style.scss';
import { Descriptions } from 'antd';
import getFilteredFields from '../../../utils/identity-definitions';

const ApiDetail = ({ fields }) => {
  const filteredFields = getFilteredFields(fields);
  return (
    <div className="CredentialDetail">
      <Descriptions size="small" layout="vertical">
        {
          filteredFields.map(({label, value}, key) => <Descriptions.Item key={key} label={label}>{value}</Descriptions.Item>)
        }
      </Descriptions>
    </div>
  );
};

export default ApiDetail;
