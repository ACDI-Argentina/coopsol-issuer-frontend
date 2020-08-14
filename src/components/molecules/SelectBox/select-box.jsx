import React, { useState } from 'react';
import './_style.scss';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { isNull } from 'util';

// It should receive a list of id value objects
// ex. [{id:1, value:"salud"}, {id:2, value:"oportunidad"}]
const SelectBox = ({ inputs, onChange }) => {
  const [text, setText] = useState('Seleccionar');

  const handleClick = event => {
    console.log("key: ", event.key);
    console.log(inputs);
    const pickedValue = inputs.reduce((r, x) => (x.id == event.key ? x : r), null);
    console.log(pickedValue);
    setText(pickedValue.name);
    onChange(pickedValue);
  };

  const menu = (
    <Menu onClick={handleClick}>
      {inputs && inputs.map(input => <Menu.Item key={input.id}>{input.name}</Menu.Item>)}
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

SelectBox.propTypes = {
  inputs: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired
};

export default SelectBox;
