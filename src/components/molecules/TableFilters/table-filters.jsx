import React from 'react';
import './_style.scss';
import { Table, Menu, Dropdown, Button, Input, DatePicker } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { DEFAULT_DATE_FORMAT } from '../../../utils/constants';
const { Column, ColumnGroup } = Table;

const TableFilters = ({ onApplyFilter, colWidths }) => {
  const filters = {
    credentialType: 'Tipo de credencial',
    name: 'Nombre y Apellido',
    dniBeneficiary: 'DNI',
    idDidiCredential: 'DID',
    dateOfIssue: 'Generada',
    dateOfExpiry: 'Caduca',
    creditState: 'Estado'
  };

  const [activeFilters, setActiveFilters] = useState({});

  const onInputChange = ev => {
    setActiveFilters({ ...activeFilters, [ev.target.id]: ev.target.value });
  };

  const onDateChange = (date, key) => {
    console.log(date, key);
  };

  const onDropdownChange = value => {
    console.log(value.key);
  };

  const renderInput = key => {
    return (
      <Input
        onChange={onInputChange}
        id={key}
        placeholder={filters[key]}
        suffix={<UserOutlined />}
      />
    );
  };

  const renderDate = key => {
    return <DatePicker onChange={date => onDateChange(date, key)} placeholder={filters[key]} />;
  };

  const renderDropdown = key => {
    const menu = (
      <Menu onClick={onDropdownChange}>
        <Menu.Item key="type1">1st menu item</Menu.Item>
        <Menu.Item key="type2">2nd menu item</Menu.Item>
        <Menu.Item key="type3">3rd item</Menu.Item>
      </Menu>
    );

    return (
      <Dropdown overlay={menu}>
        <Button>
          {filters[key]} <DownOutlined />
        </Button>
      </Dropdown>
    );
  };

  return (
    <div className="TableFilters">
      {renderDropdown('credentialType')}
      {renderInput('name')}
      {renderInput('dniBeneficiary')}
      {renderInput('idDidiCredential')}
      {renderDate('dateOfIssue')}
      {renderDate('dateOfExpiry')}
      {renderDropdown('creditState')}
    </div>
  );
};

export default TableFilters;
