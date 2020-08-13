import React, { useState } from 'react';
import './_style.scss';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

// It should
const SelectBox = inputs => {
  const [text, setText] = useState('Seleccionar');

  const handleClick = e => {
    const handledElement = e.key;
    console.log('click ', e);
  };

  const menu = (
    <Menu onClick={handleClick}>
      <Menu.Item key="1">Option 1</Menu.Item>
      <Menu.Item key="2">Option 2</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <Button>
        {text} <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default SelectBox;
