import React from 'react';
import './_style.scss';
import { Descriptions } from 'antd';

const TemplateDetail = ({ template }) => {

  return (
    <div className="CredentialDetail">
      <Descriptions size="small" layout="vertical">
        {template?.fields.map((field, key) => {
          return (
            <Descriptions.Item key={field._id} label={field.name}>
              Tipo: {field.dataType}
            </Descriptions.Item>
          )
        })}
      </Descriptions>
    </div>
  );
};

export default TemplateDetail;
