import React from 'react';
import './_style.scss';
import { Table, Menu, Dropdown, Button, Input, DatePicker } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
const { Column, ColumnGroup } = Table;

const TableFilters = ({ onApplyFilter, colWidths }) => {
  const filters = {
    credentialType: 'Tipo',
    name: 'Nombre y Apellido',
    dniBeneficiary: 'DNI',
    idDidiCredential: 'DID',
    dateOfIssue: 'Generada',
    dateOfExpiry: 'Caduca',
    creditState: 'Estado'
  };

  const renderInput = key => {
    return <Input placeholder={filters[key]} suffix={<UserOutlined />} />;
  };

  const renderDate = key => {
    return <DatePicker placeholder={filters[key]} />;
  };

  const renderDropdown = key => {
    const menu = (
      <Menu onClick={() => {}}>
        <Menu.Item key="1">1st menu item</Menu.Item>
        <Menu.Item key="2">2nd menu item</Menu.Item>
        <Menu.Item key="3">3rd item</Menu.Item>
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
