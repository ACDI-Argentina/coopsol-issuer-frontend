import React from 'react';
import { UnorderedListOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

const TabTooltip = ({ tooltip, title }) => {
  return (
    <Tooltip title={tooltip}>
      <span>
        <UnorderedListOutlined />
        {title}
      </span>
    </Tooltip>
  );
};

export default TabTooltip;
