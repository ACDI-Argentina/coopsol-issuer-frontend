import React, { useState } from 'react';
import './_style.scss';
import { Descriptions } from 'antd';

const ApiDetail = ({ fields, filteredFields}) => {

const getfilteredFields = (fields, filteredFields) => {
  let result = [];
  for (const prop in fields) {
    const value = fields[prop];
    if (value !== null && filteredFields.hasOwnProperty(prop)) {
      result.push({
        value,
        label: filteredFields[prop]
      });
    }
  }
  return result;
};

  return (
    <div className="CredentialDetail">
      <Descriptions size="small" layout="vertical">
        {
          getfilteredFields(fields, filteredFields).map(({label, value}, key) => <Descriptions.Item key={key} label={label}>{value}</Descriptions.Item>)
        }
      </Descriptions>
    </div>
  );
};

export default ApiDetail;
