import React, { useState, useEffect } from 'react';
import './_style.scss';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const SelectBox = ({ inputs, onChange, initialValue }) => {
  const [text, setText] = useState('Seleccionar');

  const handleClick = event => {
    const pickedValue = inputs.reduce((r, x) => (x.id === Number(event.key) ? x : r), null);
    setText(pickedValue.name);
    onChange(pickedValue);
  };

  useEffect(() => {
    if (initialValue) {
      setText(initialValue);
    }
  }, [initialValue]);

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
  inputs: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number, value: PropTypes.string }))
    .isRequired,
  onChange: PropTypes.func.isRequired
};

export default SelectBox;
