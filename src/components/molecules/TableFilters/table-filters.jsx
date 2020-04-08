import React from 'react';
import './_style.scss';
import { Menu, Dropdown, Button, Input, DatePicker } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { DEFAULT_DATE_FORMAT } from '../../../utils/constants';
import ButtonPrimary from '../../atoms/ButtonPrimary/button-primary';

const TableFilters = ({ onApplyFilter }) => {
  const filters = {
    credentialType: 'Tipo',
    name: 'Nombre y Apellido',
    dniBeneficiary: 'DNI',
    idDidiCredential: 'DID',
    dateOfIssue: 'Generada',
    dateOfExpiry: 'Caduca',
    creditState: 'Estado'
  };

  const [activeFilters, setActiveFilters] = useState({});

  const onInputChange = ev => {
    let key = ev.target.id;
    let newFilter = { ...activeFilters, [key]: ev.target.value };

    clearEmptyFilter(key, newFilter);
    filter(newFilter);
  };

  const clearEmptyFilter = (key, obj) => {
    if (!obj[key]) {
      delete obj[key];
    }
  };

  const onDateChange = (date, key) => {
    let newFilter = { ...activeFilters };

    if (!date) {
      delete newFilter[key];
    } else {
      newFilter[key] = date.format(DEFAULT_DATE_FORMAT);
    }

    filter(newFilter);
  };

  const onDropdownChange = value => {
    let key = value.item.props.id;
    let newFilter = { ...activeFilters, [key]: value.key };
    clearEmptyFilter(key, newFilter);
    filter(newFilter);
  };

  const filter = filter => {
    setActiveFilters(filter);
    onApplyFilter(filter);
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
    return (
      <DatePicker
        locale="es"
        format={DEFAULT_DATE_FORMAT}
        onChange={date => onDateChange(date, key)}
        placeholder={filters[key]}
      />
    );
  };

  const renderDropdown = key => {
    const menu = (
      <Menu onClick={onDropdownChange}>
        <Menu.Item id={key} key="type1">
          1st menu item
        </Menu.Item>
        <Menu.Item id={key} key="type2">
          2nd menu item
        </Menu.Item>
        <Menu.Item id={key} key="type3">
          3rd item
        </Menu.Item>
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
      <ButtonPrimary text="Buscar" theme="primary"/>
    </div>
  );
};

export default TableFilters;
